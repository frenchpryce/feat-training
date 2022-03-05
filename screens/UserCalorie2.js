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
  ImageBackground
} from "react-native";
import { BackButton } from "../components/LongButton";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Loading from '../components/Loading';
import firebase from '../database';
import { CalModal } from "../components/Modals";

export default function UserCalorie2({navigation, route}) {

  const user = route.params.user;
  const [dcaltotal, setdCaltotal] = useState();
  const [wcaltotal, setwCaltotal] = useState();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [dcaldata, setdCaldata] = useState({});
  const [wcaldata, setwCaldata] = useState({});
  const [modalvis, setModalvis] = useState(false);
  const [newcal, isNewcal] = useState(false);
  const [dcalamount, setdCalamount] = useState();
  const [wcalamount, setwCalamount] = useState();
  const [refresh, setRefresh] = useState(false);
  const [calVis, isCalVis] = useState(false);

  useEffect(() => {
    setRefresh(false);
    getdata();
  }, [refresh]);

  const getdata = () => {
    let data = {};
    let data2 = {};
    firebase
      .firestore()
      .collection("Calories")
      .doc(user)
      .collection("daily")
      .get()
      .then((snap) => {
        try{
          snap.forEach((doc) => {
            data = doc.data();
            setdCaltotal(Math.round((data.dcalintake / data.dcalamount)*100));
            setLoading(false);
          })
          setdCaldata(data);
        } catch(err) {} 
      })
      .catch((error)=>{})
    firebase
      .firestore()
      .collection("Calories")
      .doc(user)
      .collection("weekly")
      .get()
      .then((snap) => {
        try{
          snap.forEach((doc) => {
            data2 = doc.data();
            setwCaltotal(Math.round((data2.wcalintake / data2.wcalamount)*100));
            setLoading2(false);
          });
          setwCaldata(data2);
        } catch(err){

        }
      })
      .catch((error)=>{})
  };

  const onDonePress = () => {
    firebase
      .firestore()
      .collection("Calories")
      .doc(user)
      .collection("daily")
      .doc(user)
      .update({
        dcalamount: dcalamount,
      });
    firebase
      .firestore()
      .collection("Calories")
      .doc(user)
      .collection("weekly")
      .doc(user)
      .update({
        wcalamount: wcalamount,
      });
    isNewcal(false);
    setModalvis(false);
    setRefresh(true);
  };

  return (
    <ImageBackground
        style={styles.view}
        source={require('../assets/bg4.png')} resizeMode='cover'
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
        { loading && loading2 ? <Loading /> : 
        <View style={styles.container}>
            <Text style={styles.heading}>My Calories</Text>
            <View>
                <TouchableOpacity
                onPress={() => {
                    isCalVis(true);
                    isNewcal(false);
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
                    <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
                        <Text style={{ fontWeight: "bold" }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Daily
                        </Text>
                        {"\n"}
                        {"\n"}
                        {dcaldata.dcalintake}kcal/{dcaldata.dcalamount}kcal
                    </Text>
                    )}
                </AnimatedCircularProgress>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                onPress={() => {
                    isCalVis(true);
                    isNewcal(false);
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
                    <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
                        <Text style={{ fontWeight: "bold" }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Weekly
                        </Text>
                        {"\n"}
                        {"\n"}
                        {wcaldata.wcalintake}kcal/{wcaldata.wcalamount}kcal
                    </Text>
                    )}
                </AnimatedCircularProgress>
                </TouchableOpacity>
            </View>
        </View>
        }
        <CalModal 
            visible={calVis}
            onRequestClose={() => {
                isCalVis(false);
            }}
            onChangeText={(val) => {
                setdCalamount(val);
                setwCalamount(val*7);
                isNewcal(true);
            }}
            onPress={() => {
                if(newcal) {
                    onDonePress();
                    isCalVis(false)
                }
            }}
        />
    </ImageBackground>
)
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
})