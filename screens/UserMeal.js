import React, { useState} from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
} from "react-native";
import { BackButton, WorkoutButton } from "../components/LongButton";
import { Calendar } from "react-native-calendars";

let date = '2021-07-20';
let templist = [];
let days = [];
let selectedDay = {};

export default function UserMeal({ navigation }) {

  const [longday, isLongday] = useState(false);
  const [popped, isPopped] = useState(false);
  const [thisday, setThisday] = useState({});
  const [manyday, setManyday] = useState({});
  const [compdate, setCompdate] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dateField, setDateField] = useState();
  const [choose, isChoosing] = useState(false);

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
                date = day.dateString;
              setDateField(day.dateString);
              isPopped(false);
              isLongday(false);
              days = [];
              selectedDay = {};
              selectedDay = {
                [day.dateString]: {
                  selected: true, color: "#9EC3BF", key: day.dateString
                }
              }
              days.push({
                key: day.dateString
              })
              days.forEach((data) => setCompdate(data.key));
              setThisday(selectedDay);
            }}
            markedDates={ longday == true ? manyday : thisday }
            markingType="period"
          />
        </View>
        <Text style={styles.text}>
          Click a date to see a list of meals below
        </Text>
        <Text style={styles.date}>{dateField}</Text>
        <ScrollView style={{ width: "100%" }}>
          <WorkoutButton
            wrkt="Breakfast"
            color="#000000"
            onPress={() => {
              navigation.navigate("MealScreen");
            }}
          />
          <WorkoutButton wrkt="Lunch" color="#000000" />
          <WorkoutButton wrkt="Dinner" color="#000000" />
        </ScrollView>
      </View>
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
