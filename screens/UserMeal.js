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

export default function UserMeal({ navigation, route }) {

  let dates = [];
  let markeddates = {};
  let onday = [];

  const user = route.params.user;
  const [compdate, setCompdate] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [meallist, setMeallist] = useState([]);
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

        let expday = Math.round(diffInDays+30);
        if(diffInDays <= -31){
          Alert.alert(
            "Free Trial Expired",
            "Thank you for Choosing FEAT training, your 30 days trial has ended. To continue enjoying all of our FEAT programs,",
            [
              {
                text: "Click Here",
                onPress: () => {
                  navigation.navigate("Subscription", { user: user });
                }
              },
            ]
          );
        }

        if(diffInDays <= -24){
          Alert.alert(
            "Free Trial about to expire: " + expday,
            "Your Free Trial is about to expire, subscribe to enjoy more of our FEAT Programs. We are excited to continue guiding you in your FEATness Journey.",
            [
              {
                text: "Click Here",
                onPress: () => {
                  navigation.navigate("Subscription", { user: user });
                }
              },
              {
                text: "Back",
                style: "cancel"
              }
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
        if(doc.data().category == 'meals') {
          dates.push(doc.data());
        }
      })
      setMeallist(dates);
      console.log(dates);
      for(let i=0;i<dates.length;i++) {
        markeddates[dates[i].date.key] = {
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
      resizeMode="cover"
    >
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 40,
        }}
      >
        <BackButton onPress={() => navigation.navigate("Menu", {user: user})} />
      </View>
      { loading ? <Loading /> : 
      <View style={styles.container}>
        <Text style={styles.heading}>Meals</Text>
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
        <Text style={styles.text}>
          Click a date to see a list of meals below
        </Text>
        <Text style={styles.date}>{dateField}</Text>
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
          {meallist.filter((meal) => ((meal.date.key == compdate) && (meal.category == 'meals'))).map((label, index) => (
          <View key={index}>
          <WorkoutButton
            wrkt={label.meal.name}
            color="#000000"
            onPress={() => {
              navigation.navigate("MealScreen", { user: user, id: label.id });
            }}
          />
          </View>
          ))}
        </ScrollView>
      </View>
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
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: "flex-start",
    alignItems: "center",
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
