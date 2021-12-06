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

  const isFocused = useIsFocused();
  
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
        if(doc.data().category == 'workout' && doc.data().status == 'unfinished') {
          dates.push(doc.data());
        }
      })
      setWrktlist(dates);
      console.log(dates);
      for(let i=0;i<dates.length;i++) {
        markeddates[dates[i].date] = {
          'selected': true,
          'color': "#4CB6B6"
        }
      }
      setMarkedDates(markeddates);
    })
    setLoading(false);
  }

  return (
    <ImageBackground
      style={styles.view}
      source={require("../assets/bg7.png")}
      resizeMode="cover"
    >
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 40,
        }}
      >
        <BackButton onPress={() => navigation.goBack()} />
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
        {wrktlist.filter((wrkt) => ((wrkt.date == compdate) && (wrkt.category == 'workout') && (wrkt.status == 'unfinished'))).map((label, index) => (
          <WorkoutButton wrkt={label.exercise} color="#000000" onPress={() => {
            if(label.type == 'normal'){
              navigation.navigate('ForTimeScreen1', { user: user });
            }
          }}/>
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
    backgroundColor: "#FFFFFF",
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
    elevation: 5,
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
