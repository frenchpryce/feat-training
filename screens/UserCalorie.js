import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  LogBox,
  Modal,
  TextInput,
  ScrollView,
  ImageBackground,
} from "react-native";
import { CalModal } from "../components/Modals";
import { BackButton } from "../components/LongButton";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function UserCalorie({ navigation }) {
  const [calVis, isCalVis] = useState(false);
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
        let now = new Date(snap.data().startdate);
        let diffInTime = now.getTime() - date1.getTime();
        let diffInDays = diffInTime / (1000 * 3600 * 24);
        if (diffInDays <= -31) {
          Alert.alert(
            "Verfication Failed",
            "Please confirm with your coach that you are verified.",
            [
              {
                text: "Back to Login",
                onPress: () => {
                  navigation.navigate("MainScreen");
                },
              },
            ]
          );
        }
      });
  };

  useEffect(() => {
    getSubData();
  },[])

  return (
    <ImageBackground
      style={styles.view}
      source={require("../assets/bg4.png")}
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
        <Text style={styles.heading}>My Calories</Text>
        <View>
          <TouchableOpacity
            onPress={() => {
              isCalVis(true);
            }}
          >
            <AnimatedCircularProgress
              size={250}
              width={25}
              rotation={360}
              lineCap="round"
              fill={80}
              tintColor="#28F0D8"
              padding={20}
              backgroundColor="#DCFDFB"
            >
              {(fill) => (
                <Text
                  style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}
                >
                  <Text style={{ fontWeight: "bold" }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Daily
                  </Text>
                  {"\n"}
                  {"\n"}
                  {/* {dcaldata.dcalintake}kcal/{dcaldata.dcalamount}kcal */}
                </Text>
              )}
            </AnimatedCircularProgress>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              isCalVis(true);
            }}
          >
            <AnimatedCircularProgress
              size={250}
              width={25}
              rotation={360}
              lineCap="round"
              fill={80}
              tintColor="#28F0D8"
              padding={20}
              backgroundColor="#DCFDFB"
            >
              {(fill) => (
                <Text
                  style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}
                >
                  <Text style={{ fontWeight: "bold" }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Weekly
                  </Text>
                  {"\n"}
                  {"\n"}
                  {/* {dcaldata.dcalintake}kcal/{dcaldata.dcalamount}kcal */}
                </Text>
              )}
            </AnimatedCircularProgress>
          </TouchableOpacity>
        </View>
      </View>
      <CalModal
        visible={calVis}
        onRequestClose={() => {
          isCalVis(false);
        }}
        onPress={() => {
          isCalVis(false);
        }}
      />
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
    paddingTop: 50,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  heading: {
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
  },
});
