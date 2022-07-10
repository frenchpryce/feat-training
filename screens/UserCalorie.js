import React, { useState, useEffect, useCallback } from "react";
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
  RefreshControl,
  Alert,
} from "react-native";
import { CalModal } from "../components/Modals";
import { BackButton } from "../components/LongButton";
import firebase from "../database";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Loading from "../components/Loading";

export default function UserCalorie({ navigation, route }) {
  LogBox.ignoreAllLogs(true);

  const user = route.params.user;
  const [calVis, isCalVis] = useState(false);
  const month = new Date().getMonth();
  const date = new Date().getDate();
  const year = new Date().getFullYear();
  const [dailycal, setDailycal] = useState({});
  const [weeklycal, setWeeklycal] = useState({});
  const [dcaltotal, setdCaltotal] = useState();
  const [wcaltotal, setwCaltotal] = useState();
  
  const [cal, setCal] = useState();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);

  let value, value2, dailycaltotal;

  useEffect(() => {
    setRefresh(false);
    getSubData();
    getData();
  },[refresh])

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    getSubData();
    setLoading(false);
    setLoading2(false);
    wait(3000).then(() => setRefreshing(false));
  }, [refreshing]);

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
        let expday = Math.round(diffInDays+30);
        if (diffInDays <= -31) {
          Alert.alert(
            "Free Trial Expired",
            "Thank you for Choosing FEAT training, your 30 days trial has ended. To continue enjoying all of our FEAT programs,",
            [
              {
                text: "Click Here",
                onPress: () => {
                  navigation.navigate("Subscription", { user: user });
                },
              },
            ]
          );
        }
        
        if(diffInDays <= -24){
          Alert.alert(
            "Free Trial about to expire: " + expday + " days",
            "Your Free Trial is about to expire, contact your coach to enjoy more of our FEAT Programs. We are excited to continue guiding you in your FEATness Journey.",
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
      });
  };

  const getData = () => {
    let data = {};
    let data2 = {};
    firebase
      .firestore()
      .collection("Calories")
      .doc(user)
      .collection("daily")
      .doc(user)
      .get()
      .then((snap) => {
          data = snap.data();
          console.log(data);
          setdCaltotal(Math.round((data.dcalintake / data.dcalamount) * 100))
        setDailycal(data);
        setLoading(false);
        console.log(dcaltotal);
      })
      .catch((error) => {

      })

    firebase
      .firestore()
      .collection("Calories")
      .doc(user)
      .collection("weekly")
      .doc(user)
      .get()
      .then((snap) => {
          data2 = snap.data();
          console.log(data2);
          setwCaltotal(Math.round((data2.wcalintake / data2.wcalamount) * 100));
        setWeeklycal(data2);
        setLoading2(false);
        console.log(wcaltotal);
      })
      .catch((error) => {

      })
    }

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
      <ScrollView 
        style={styles.container}
        renderToHardwareTextureAndroid
        shouldRasterizeIOS
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{alignItems: 'center'}}
        >
        <Text style={styles.heading}>My Calories</Text>
        <View style={styles.container2}>
        { loading ? <Loading /> : 
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
              fill={dcaltotal}
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
                  {dailycal.dcalintake}kcal/{dailycal.dcalamount}kcal
                </Text>
              )}
            </AnimatedCircularProgress>
          </TouchableOpacity>
        }
        { loading2 ? <ActivityIndicator /> : 
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
              fill={wcaltotal}
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
                  {weeklycal.wcalintake}kcal/{weeklycal.wcalamount}kcal
                </Text>
              )}
            </AnimatedCircularProgress>
          </TouchableOpacity>
        } 
        </View>
      </ScrollView>
      <CalModal
        visible={calVis}
        onChangeText={(text) => { 
            setCal(text);
        }}
        onRequestClose={() => {
          isCalVis(false);
        }}
        onPress={() => {
          value = dailycal.dcalintake + Number(cal);
          value2 = weeklycal.wcalintake + Number(cal);

          firebase
              .firestore()
              .collection("Calories")
              .doc(user)
              .collection("daily")
              .doc(user)
              .update({
                dcalintake: value,
              });

            firebase
              .firestore()
              .collection("Calories")
              .doc(user)
              .collection("weekly")
              .doc(user)
              .update({
                wcalintake: value2,
              });
          isCalVis(false);
          setRefresh(true);
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
    backgroundColor: "transparent",
    paddingTop: 50
  },
  container2: {
    flex: 1,
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
