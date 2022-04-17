import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { BackButton, WorkoutButton } from "../components/LongButton";
import { Calendar } from "react-native-calendars";
import Loading from "../components/Loading";
import firebase from '../database';
import { useIsFocused } from '@react-navigation/native';

export default function UserWorkout({ navigation, route }) {

  let dates = [];
  let markeddates = {};
  let onday = [];

  const user = route.params.user;
  const [compdate, setCompdate] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [wrktlist, setWrktlist] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dateField, setDateField] = useState();

  const isFocused = useIsFocused();
  const month = new Date().getMonth();
  const date = new Date().getDate();
  const year = new Date().getFullYear();

  const getSubData = () => {
    firebase
      .firestore()
      .collection("Users")
      .doc(user)
      .get()
      .then((snap) => {
        let date1 = new Date(year, month, date);
        console.log(date1);
        let now = new Date(snap.data().startdate);
        console.log(now);
        let diffInTime = now.getTime() - date1.getTime();
        let diffInDays = diffInTime / (1000* 3600 * 24);

        console.log(diffInDays);
        if(diffInDays <= -31){
          Alert.alert(
            "Verfication Failed",
            "Please confirm with your coach that you are verified.",
            [
              {
                text: "Back to Login",
                onPress: () => {
                  navigation.navigate("MainScreen");
                }
              },
            ]
          );
        }
      })
  }
  
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    getData();
    wait(3000).then(() => setRefreshing(false));
  },[refreshing])

  useEffect(() => {
    if(isFocused) {
      getSubData();
      setRefreshing(false);
      getData();
    }
  },[isFocused]);

  const getData = () => {
    firebase.firestore()
    .collection('Users')
    .doc(user)
    .collection('wrktmeal')
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        if(doc.data().category == 'workout') {
          dates.push(doc.data());
        }
      })
      setWrktlist(dates);
      for(let i=0;i<dates.length;i++) {
        markeddates[dates[i].date] = {
          'selected': true,
          'color': "#4CB6B6"
        }
      }
      setMarkedDates(markeddates);
      console.log(markedDates);
    })
    setLoading(false);
  }

  return (
    <ImageBackground
      style={styles.view}
      source={require("../assets/bg7.png")}
      resizeMode="contain"
    >
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 40,
        }}
      >
        <BackButton onPress={() => navigation.navigate('Menu', { user: user })} />
      </View>
      { loading ? <Loading /> : 
      <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
        <Text style={styles.heading}>Workouts</Text>
        <View style={styles.calendarView}>
          <Calendar
            theme={{
              arrowColor: "black",
              dayTextColor: "black",
              todayTextColor: "#32877D",
              selectedDayBackgroundColor: "#32877D",
              selectedDayTextColor: "#FFFFFF",
              textDayHeaderFontFamily: "Poppins_300Light",
              textDayFontFamily: "Poppins_300Light",
              textMonthFontFamily: "Poppins_300Light",
            }}
            onDayPress={(day) => {
              setDateField(day.dateString);
              onday = [];
              onday.push({
                key: day.dateString
              });
              onday.forEach((data) => setCompdate(data.key));
            }}
            markedDates={markedDates}
            markingType="period"
          />
        </View>
        <Text style={styles.date}>{dateField}</Text>
        <Text style={styles.text}>
          Click a date to see a list of workouts below
        </Text>
        <ScrollView style={{ width: "100%" }}
          renderToHardwareTextureAndroid
          shouldRasterizeIOS
          refreshControl={
            <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
            />
          }
        >
        {wrktlist.filter((wrkt) => ((wrkt.date == compdate) && (wrkt.category == 'workout'))).map((label, index) => (
          <View key={index}>
          <WorkoutButton wrkt={label.type} color="#000000" onPress={() => {
            switch(label.type) {
              case 'normal': 
                navigation.navigate('NormalScreen', { user: user, id: label.id });
                break;
              case 'superset': 
              navigation.navigate('NormalScreen', { user: user, id: label.id });
              break;
              case 'amrap': 
                navigation.navigate('Amrap', { user: user, id: label.id });
                break;
              case 'for time 1': 
                navigation.navigate('ForTimeScreen1', { user: user, id: label.id });
                break;
              case 'for time 2':
                navigation.navigate('ForTimeScreen2', { user: user, id: label.id });
                break;
              case 'for time 3':
                navigation.navigate('ForTimeScreen3', { user: user, id: label.id });
                break;
              case 'for time 4':
                navigation.navigate('ForTimeScreen4', { user: user, id: label.id });
                break;
              case 'emom 1':
                navigation.navigate('EmomScreen1', { user: user, id: label.id });
                break;
              case 'emom 2':
                navigation.navigate('EmomScreen2', { user: user, id: label.id });
                break;
              case 'emom 3':
                navigation.navigate('EmomScreen3', { user: user, id: label.id });
                break;
              case 'emom 4':
                navigation.navigate('EmomScreen4', { user: user, id: label.id });
                break;
              case 'emom 5':
                navigation.navigate('EmomScreen5', { user: user, id: label.id });
                break;
              case 'emom 6':
                navigation.navigate('EmomScreen6', { user: user, id: label.id });
                break;
              case 'emom 7':
                navigation.navigate('EmomScreen7', { user: user, id: label.id });
                break;
              default:
                break;
            }
          }}/>
          </View>
        ))}
        </ScrollView>
      </ScrollView>
      }
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF00",
    paddingLeft: 40,
    paddingRight: 40,
  },
  scrollContainer: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
  },
  heading: {
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
  },
  calendarView: {
    height: "auto",
    width: "100%",
    elevation: 1,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: "OpenSans_300Light",
    width: 225,
    textAlign: "center",
    borderBottomColor: "#37877D",
    borderBottomWidth: 1,
    paddingBottom: 20,
    marginBottom: 15,
  },
  date: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
    textAlign: "center",
    width: 225,
    marginBottom: 20,
    color: "#37877D",
  },
});
