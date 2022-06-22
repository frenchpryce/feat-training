import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  ImageBackground,
  Alert,
} from "react-native";
import { LongButton, BackButton } from "../components/LongButton";
import {
  LongField,
  ShortField,
  LongDropDown,
  ShortDropDown,
} from "../components/EntryFields";
import { AllModal } from "../components/Modals";
import firebase from "../database";
import Loading from "../components/Loading";

export default function Register({ navigation }) {
  const [gvalue, setgValue] = useState();
  const [wvalue, setwValue] = useState();
  const [avalue, setaValue] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("");
  const [alert, isAlert] = useState(false);
  const [cals, setCals] = useState();
  let finalcal;

  useEffect(() => {
    console.log(new Date());
  },[])

  const registerToDatabase = (id) => {
    firebase
      .firestore()
      .collection("Users")
      .doc(id)
      .set({
        username: username,
        password: password,
        userid: id,
        firstname: fname,
        lastname: lname,
        email: email,
        height: Number(height),
        weight: Number(weight),
        age: Number(age),
        goal: Number(goal),
        weightgoal: wvalue,
        gender: gvalue,
        programtype: "Free User",
        startdate: new Date(),
        enddate: 0,
        payment: {
          balance: 0,
        },
        status: "Verified",
      })
      .then(() => {
        setUsername("");
        setPassword("");
        setFname("");
        setLname("");
        setEmail("");
        setHeight("");
        setWeight("");
        setAge("");
        setGoal("");
        setgValue();
        setwValue();
      })
      .catch(function (error) {
        console.log(error);
      });

    firebase
      .firestore()
      .collection("Reminders")
      .doc(id)
      .set({
          foryou: "Welcome to feat training!"
      })
  };

  const setCalories = () => {
    let ree;
    let tdee;
    let caldeficit;
    switch(wvalue) {
      case "weight loss":
        if(gvalue == 'Female') {
          ree = (10 * Number(weight)) + (6.25 * Number(height)) - (5 - Number(age));
          tdee = ree * avalue;
          caldeficit = tdee * .20;
          finalcal = (tdee - caldeficit);
          console.log(finalcal);
        } else {
          ree = (10 * Number(weight)) + (6.25 * Number(height)) - (5 - Number(age)) + 5;
          tdee = ree * avalue;
          caldeficit = tdee * .20;
          finalcal = (tdee - caldeficit);
          console.log(finalcal);
        }
      break;
      case "weight maintenance":
        if(gvalue == 'Female') {
          ree = (10 * Number(weight)) + (6.25 * Number(height)) - (5 - Number(age));
          tdee = ree * avalue;
          caldeficit = tdee * .20;
          finalcal = (tdee);
          console.log(finalcal);
        } else {
          ree = (10 * Number(weight)) + (6.25 * Number(height)) - (5 - Number(age)) + 5;
          tdee = ree * avalue;
          caldeficit = tdee * .20;
          finalcal = (tdee);
          console.log(finalcal);
        }
      case "weight gain": 
        if(gvalue == 'Female') {
          ree = (10 * Number(weight)) + (6.25 * Number(height)) - (5 - Number(age));
          tdee = ree * avalue;
          caldeficit = tdee * .20;
          finalcal = (tdee + caldeficit);
          console.log(finalcal);
        } else {
          ree = (10 * Number(weight)) + (6.25 * Number(height)) - (5 - Number(age)) + 5;
          tdee = ree * avalue;
          caldeficit = tdee * .20;
          finalcal = (tdee + caldeficit);
          console.log(finalcal);
        }
        break;
      }
  }

  const registerUser = () => {
    if (
      fname == "" ||
      lname == "" ||
      username == "" ||
      password == "" ||
      email == "" ||
      height == "" ||
      age == "" ||
      weight == "" ||
      goal == ""
    ) {
      Alert.alert(
        "Registration Failed",
        "Please fill up the following fields properly.",
        [
          {
            text: "Try Again",
            style: "cancel",
          },
        ]
      );
    } else {
      Alert.alert("Registered Successfully", "Done", [
        {
          text: "Done",
          onPress: () => {
            let temp = fname + lname;
            let userid = temp.replace(/\s/g, "");
            registerToDatabase(userid);
            firebase
              .firestore()
              .collection("Calories")
              .doc(userid)
              .collection("daily")
              .doc(userid)
              .set({
                dcalamount: finalcal,
                dcalintake: 0,
              });

            firebase
              .firestore()
              .collection("Calories")
              .doc(userid)
              .collection("weekly")
              .doc(userid)
              .set({
                wcalamount: finalcal * 7,
                wcalintake: 0,
              });
            navigation.navigate("Login", { user: userid });
          },
        },
      ]);
    }
  };

  return (
    <ScrollView style={styles.view} contentContainerStyle={{ flexGrow: 1, }}>
      <ImageBackground
        source={require("../assets/bg4.png")}
        resizeMode="cover"
        style={[styles.container]}
      >
        <View style={{marginTop: 50}}>
        <BackButton onPress={() => navigation.navigate("MainScreen")} />
        </View>
        <Text style={styles.heading}>Fill up the form...</Text>
        <LongField
          placeholder="username"
          marginTop={10}
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={username}
        />
        <LongField
          placeholder="first name"
          marginTop={10}
          onChangeText={(text) => {
            setFname(text);
          }}
          autoCapitalize="words"
          marginRight={5}
          value={fname}
        />
        <LongField
          placeholder="last name"
          marginTop={10}
          autoCapitalize="words"
          onChangeText={(text) => {
            setLname(text);
          }}
          value={lname}
        />
        <LongField
          placeholder="email address"
          marginTop={10}
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <LongField
          placeholder="password"
          marginTop={10}
          security={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <ShortField
            placeholder="height in cm"
            marginRight={5}
            keyboardType="numeric"
            onChangeText={(text) => {
              setHeight(text);
            }}
            value={height}
          />
          <ShortField
            placeholder="weight in kg"
            keyboardType="numeric"
            onChangeText={(text) => {
              setWeight(text);
            }}
            value={weight}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <ShortField
            placeholder="age"
            marginRight={5}
            keyboardType="numeric"
            onChangeText={(text) => {
              setAge(text);
            }}
            value={age}
          />
          <ShortField
            placeholder="weight goal in kg"
            keyboardType="numeric"
            onChangeText={(text) => {
              setGoal(text);
            }}
            value={goal}
          />
        </View>
        <ShortDropDown
          placeholder="gender"
          marginTop={10}
          zIndex={12}
          item={[
            { label: "Male", value: "male", icon: () => null },
            { label: "Female", value: "female", icon: () => null },
          ]}
          onChangeItem={(item) => {
            console.log(item.value);
            setgValue(item.value);
          }}
          defaultValue="male"
        />
        <LongDropDown
          placeholder="weight options"
          marginTop={10}
          zIndex={11}
          item={[
            { label: "Weight Gain", value: "weight gain", icon: () => null },
            { label: "Wegith Loss", value: "weight loss", icon: () => null },
            {
              label: "Wegith Maintenance",
              value: "weight maintenance",
              icon: () => null,
            },
          ]}
          onChangeItem={(item) => {
            console.log(item.value);
            setwValue(item.value);
          }}
          defaultValue="weight gain"
        />
        <LongDropDown
          marginTop={10}
          zIndex={10}
          item={[
            { label: "Sedentary-(little to no exercise + work a desk job)", value: 1.1, icon: () => null },
            { label: "Slightly active-(light exercise 1-3 days / week)", value: 1.2, icon: () => null },
            { label: "Active-(moderate exercise 3-5 days / week)", value: 1.3, icon: () => null },
            { label: "Very Active-(heavy exercise 6-7 days / week)", value: 1.4, icon: () => null },
          ]}
          onChangeItem={(item) => {
            console.log(item.value);
            setaValue(item.value);
          }}
          defaultValue={1.3}
        />
        <LongButton
          marginTop={20}
          marginBottom={100}
          bgcolor="#58DCC4"
          title="Done"
          elevation={0}
          onPress={() => {
            setCalories();
            registerUser();
          }}
        />
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  heading: {
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
    marginTop: 40,
  },
});
