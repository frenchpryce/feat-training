// Example of Searchable Dropdown / Picker in React Native
// https://aboutreact.com/example-of-searchable-dropdown-picker-in-react-native/

// import React in our code
import React, { useState, useEffect } from "react";

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import { ShortField, LongField, LargeField } from "../components/EntryFields";
import { LongButton, BackButton } from "../components/LongButton";
import firebase from "../database";

//import SearchableDropdown component
import SearchableDropdown from "react-native-searchable-dropdown";

//Item array for the dropdown
export default function EmomCreate6({ navigation, route }) {
  const [exercises, setExercises] = useState([]);
  const [checklist, isChecklist] = useState(false);
  const { user, date } = route.params;
  const [selected, setSelected] = useState("");
  const [exercise, setExercise] = useState([]);
  const [type, setType] = useState("workout type");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [equipment, setEquipment] = useState("");
  const [load, setLoad] = useState("");
  const [rest, setRest] = useState("");
  const [note, setNote] = useState("");
  const [timer, setTimer] = useState("");
  const [exlabels, setExlabels] = useState([]);
  const [wrkttypes, setWrkttpyes] = useState([]);
  const [equips, setEquips] = useState([]);
  const [mylink, setLink] = useState("");
  const [exerciseset, setExerciseset] = useState([]);
  const [extime, setExtime] = useState("");
  const [round, setRound] = useState([]);
  let thisdate;
  let tempexercise = [];
  const [equipdrop, isEquipdrop] = useState(false);
  const [exdrop, isExdrop] = useState(false);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Exercises")
      .get()
      .then((snap) => {
        let exercises = [];
        snap.forEach((doc) => {
          exercises.push({ name: doc.id, id: doc.id, lnk: doc.data().links });
        });
        setExlabels(exercises);
      });
    firebase
      .firestore()
      .collection("Equipments")
      .get()
      .then((snap) => {
        let equipments = [];
        snap.forEach((doc) => {
          equipments.push({ name: doc.id, id: doc.id });
        });
        setEquips(equipments);
      });
  }, []);

  const addWorkout = () => {
    if (exercise == null || reps == null) {
      Alert.alert("Invalid Input", "Please fill up the necessary fields", [
        {
          text: "Close",
          style: "cancel",
        },
      ]);
    } else {
      Alert.alert("Submitting", "Done creating exercises?", [
        {
          text: "Back",
          style: "cancel",
        },
        {
          text: "Done",
          onPress: () => {
            var db = firebase.firestore();
            var batch = db.batch();
            date.forEach((doc) => {
              console.log(doc);
              var docRef = db
                .collection("Users")
                .doc(user)
                .collection("wrktmeal")
                .doc();
              thisdate = doc;
              batch.set(docRef, {
                id: idGenerator(),
                type: "emom 6",
                exercise: exercise,
                note: note,
                sets: sets,
                date: doc,
                category: "workout",
                status: "unfinished",
                curreps: exercise[0].reps
              });
            });
            batch.commit().then(() => {
              setExercise([]);
              setType("workout type");
              setReps("");
              setSets("");
              setEquipment("");
              setRest("");
              setLoad("");
              setNote("");
              setTimer("");
              setExtime("");
              ToastAndroid.show("Successful!", ToastAndroid.SHORT);
              navigation.reset({
                index: 0,
                routes: [{ name: "UserWorkout2", params: { user: user } }],
              });
            });
          }
        }
      ])
    }
  };

  let idGenerator = () => {
    var id = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            id += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
        }
        return id()+id()+'-'+id()+'-'+id()+'-'+id()+'-'+id()+id()+id();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          zIndex: 1,
        }}
      >
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.workoutname}>
        <Text
          style={{ fontFamily: "Poppins_700Bold", fontSize: 30, marginTop: 40 }}
        >
          EMOM 6
        </Text>
        <View style={{ height: 500, width: 290, marginBottom: 50 }}>
        <SearchableDropdown
            selectedItems={selected}
            //On text change listner on the searchable input
            onTextChange={(text) => console.log(text)}
            onItemSelect={(item) => {
              setSelected(item);
              isExdrop(true);
            }}
            //onItemSelect called after the selection from the dropdown
            containerStyle={{ paddingBottom: 10 }}
            //suggestion container style
            textInputStyle={{
              //inserted text style
              padding: 12,
              borderRadius: 15,
              backgroundColor: "#FFFF",
              width: "100%",
              borderRadius: 30,
              elevation: 5,
              fontFamily: "OpenSans_300Light_Italic",
              fontSize: 16,
              textAlign: "center",
            }}
            itemStyle={{
              //single dropdown item style
              marginTop: 5,
              padding: 10,
              backgroundColor: "#FAF9F8",
              borderColor: "#bbb",
              borderWidth: 1,
              height: 50,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            itemTextStyle={{
              //text style of a single dropdown item
              color: "#222",
            }}
            itemsContainerStyle={{
              //items container style you can pass maxHeight
              //to restrict the items dropdown hieght
              maxHeight: "43%",
            }}
            items={exlabels}
            //mapping of item array
            defaultIndex={2}
            //default selected item index
            placeholder="exercise"
            //place holder for the search input
            resetValue={false}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            //To remove the underline from the android input
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ShortField
              placeholder="reps"
              value={reps}
              onChangeText={(text) => setReps(text)}
            ></ShortField>
            <ShortField
              placeholder="load"
              value={load}
              onChangeText={(text) => setLoad(text)}
            ></ShortField>
          </View>
          <SearchableDropdown
            selectedItems={equipment}
            onTextChange={(text) => console.log(text)}
            //On text change listner on the searchable input
            onItemSelect={(item) => {
              setEquipment(item);
              isEquipdrop(true);
            }}
            //onItemSelect called after the selection from the dropdown
            containerStyle={{ paddingTop: 10 }}
            //suggestion container style
            textInputStyle={{
              //inserted text style
              padding: 12,
              borderRadius: 15,
              backgroundColor: "#FFFF",
              width: "100%",
              borderRadius: 30,
              elevation: 5,
              fontFamily: "OpenSans_300Light_Italic",
              fontSize: 16,
              textAlign: "center",
            }}
            itemStyle={{
              //single dropdown item style
              marginTop: 5,
              padding: 10,
              backgroundColor: "#FAF9F8",
              borderColor: "#bbb",
              borderWidth: 1,
              height: 50,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            itemTextStyle={{
              //text style of a single dropdown item
              color: "#222",
            }}
            itemsContainerStyle={{
              //items container style you can pass maxHeight
              //to restrict the items dropdown hieght
              maxHeight: "43%",
            }}
            items={equips}
            //mapping of item array
            defaultIndex={2}
            //default selected item index
            placeholder="equipment"
            //place holder for the search input
            resetValue={false}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            //To remove the underline from the android input
          />
          {/* <View
            style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}
          >
            <ShortField
              placeholder="ex time"
              value={extime}
              onChangeText={(text) => setExtime(text)}
            ></ShortField>
            <ShortField
              placeholder="rest time"
              value={rest}
              onChangeText={(text) => setRest(text)}
            ></ShortField>
          </View> */}
          <TouchableOpacity
            onPress={() => {
              exercise.push({
                exercise: selected,
                lnk: selected.lnk,
                reps: reps,
                load: load,
                equipment: equipment,
                extime: extime,
                rest: rest
              });
              setLoad("");
              setReps("");
              setExtime("");
              setRest("");
              ToastAndroid.show("Exercise has been added!", ToastAndroid.SHORT);
            }}
          >
            <Text
              style={{
                color: "#32877D",
                fontSize: 16,
                marginTop: 10,
                marginLeft: 5,
                marginBottom: 10,
              }}
            >
              + Add another exercise
            </Text>
          </TouchableOpacity>

          <LargeField
            placeholder="note"
            value={note}
            onChangeText={(text) => setNote(text)}
          ></LargeField>
            <ShortField
                marginTop={10}
                placeholder="time"
                value={timer}
                onChangeText={(text) => setTimer(text)}
            ></ShortField>
          <LongButton
            title="Next"
            bgcolor="#32877D"
            marginTop={20}
            onPress={() => addWorkout()}
          ></LongButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "flex-start",
  },
  BackImage: {
    height: 25,
    width: 25,
    marginRight: 270,
    marginBottom: 10,
  },
  workoutname: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  headingText: {
    padding: 8,
  },
});
