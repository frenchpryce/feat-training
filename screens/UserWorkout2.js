import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { BackButton, WorkoutButton } from "../components/LongButton";
import { Calendar } from "react-native-calendars";
import { WrktModal } from "../components/Modals";
import firebase from "../database";
import Loading from "../components/Loading";
import { useIsFocused } from "@react-navigation/native";

let date = "2021-07-20";
let templist = [];
let days = [];
let selectedDay = {};

export default function UserWorkout2({ navigation, route }) {
  const user = route.params.user;
  const [wrktlist, setWrktlist] = useState([]);
  const [longday, isLongday] = useState(false);
  const [popped, isPopped] = useState(false);
  const [thisday, setThisday] = useState({});
  const [manyday, setManyday] = useState({});
  const [compdate, setCompdate] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dateField, setDateField] = useState();
  const [choose, isChoosing] = useState(false);
  const isFocused = useIsFocused();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    wait(3000).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    if (isFocused) {
      getData();
      setRefreshing(false);
    }
  }, [date, isFocused, refreshing]);

  const getData = () => {
    templist = [];
    firebase
      .firestore()
      .collection("Users")
      .doc(user)
      .collection("wrktmeal")
      .get()
      .then((col) => {
        col.forEach((doc) => {
          if(doc.data().category == "workout"){
            templist.push({
              date: doc.data().date,
              category: doc.data().category,
              type: doc.data().type,
              status: doc.data().status,
              id: doc.id,
            });
          }
        });
        setWrktlist(templist);
        console.log(wrktlist);
        setLoading(false);
      });
  };

  const deleteData = (id) => {
    Alert.alert("Delete Meal", "Are you sure to delete this workout?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          firebase
            .firestore()
            .collection("Users")
            .doc(user)
            .collection("wrktmeal")
            .doc(id)
            .delete()
            .then(() => {
              setRefreshing(true);
              console.log("deleted");
            });
        },
      },
    ]);
  };

  const setNormalWorkout = () => {
    for (let i = 0; i < days.length; i++) {
      days[i] = days[i].key;
    }
    console.log(days);
    navigation.navigate("NormalWrkt", { user: user, date: days });
  };

  const setMetconWorkout = () => {
    for (let i = 0; i < days.length; i++) {
      days[i] = days[i].key;
    }
    console.log(days);
    navigation.navigate("MetconTypes", { user: user, date: days });
  };

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
        <BackButton
          onPress={() =>
            navigation.navigate("Menu", { user: user, type: "trainer" })
          }
        />
      </View>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
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
                date = day.dateString;
                setDateField(day.dateString);
                isPopped(false);
                isLongday(false);
                days = [];
                selectedDay = {};
                selectedDay = {
                  [day.dateString]: {
                    selected: true,
                    color: "#9EC3BF",
                    key: day.dateString,
                  },
                };
                days.push({
                  key: day.dateString,
                });
                days.forEach((data) => setCompdate(data.key));
                setThisday(selectedDay);
              }}
              onDayLongPress={(longday) => {
                selectedDay = {};
                if (popped == false) {
                  days.pop();
                  isPopped(true);
                  isLongday(true);
                }
                if (longday) {
                  days.push({
                    key: longday.dateString,
                    selected: true,
                    color: "#9EC3BF",
                  });
                  for (let i = 0; i < days.length; i++) {
                    selectedDay[days[i].key] = {
                      selected: days[i].selected,
                      color: days[i].color,
                      key: days[i].key,
                    };
                  }
                  setManyday(selectedDay);
                }
              }}
              markedDates={longday == true ? manyday : thisday}
              markingType="period"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              isChoosing(true);
            }}
          >
            <Text style={styles.text}>+ Add a workout</Text>
          </TouchableOpacity>
          <Text style={styles.date}>{dateField}</Text>
          <ScrollView
            style={{ width: "100%" }}
            renderToHardwareTextureAndroid
            shouldRasterizeIOS
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {wrktlist
              .filter(
                (wrkt) => wrkt.date == compdate && wrkt.category == "workout"
              )
              .map((label, index) => (
                <View key={index}>
                <WorkoutButton
                  mykey={index.toString()}
                  wrkt={label.type}
                  color="#000000"
                  onLongPress={() => deleteData(label.id)}
                />
                </View>
              ))}
          </ScrollView>
          <WrktModal
            visible={choose}
            onRequestClose={() => {
              isChoosing(false);
            }}
            title1="Normal"
            title2="METCON"
            bgcolor1="#32877D"
            bgcolor2="#2F2E41"
            onPress1={() => {
              isChoosing(false);
              setNormalWorkout();
            }}
            onPress2={() => {
              isChoosing(false);
              setMetconWorkout();
            }}
            marginTop={10}
            warning="Choose a Workout"
          />
        </View>
      )}
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
    color: "#37877D",
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
