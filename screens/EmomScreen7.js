import React, { useEffect, useState, useCallback, useRef } from "react";
import { TextButton, LongButton, BackButton } from "../components/LongButton";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert
} from "react-native";
import Play from "../assets/play.svg";
import Reset from "../assets/reset.svg";
import Pause from "../assets/pause.svg";
import firebase from "../database";
import Loading from "../components/Loading";
import Timer from 'react-compound-timer';

export default function EmomScreen7({ navigation, route }) {
  const { user, id } = route.params;
  const [pressed, isPressed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [reps, setReps] = useState([]);
  const [dataid, setDataid] = useState('');
  const [note, setNote] = useState("");
  const [timer, setTimer] = useState();
  // const [currround, setCurrround] = useState(0);
  // const [currex, setCurrex] = useState(0);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Users")
      .doc(user)
      .collection("wrktmeal")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          if (doc.data().id == id && doc.data().status == 'unfinished') {
            setDataid(doc.id);
            setExercises(doc.data().exercise);
            setReps(doc.data().exercise);
            setNote(doc.data().note);
            if(doc.data().exercise[0].extime == 0) {
              setTimer(0);
            } else {
              setTimer(doc.data().exercise[0].extime);
            }
            setLoading(false);
          }
          console.log(timer);
        });
      });
  }, []);

  const doneWorkout = () => {
    Alert.alert(
      'Finished Exercise',
      'Are you done with your workout?',
      [
          {
              text: 'Yes',
              onPress: () => {
                firebase.firestore()
                .collection('Users')
                .doc(user)
                .collection('wrktmeal')
                .doc(dataid)
                .update({
                  status: 'finished'
                })
            
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'UserWorkout', params: {user: user}}],
                })
              }
          },
          {
              text: 'No',
              style: 'cancel'
          }
      ]
    )
  }


  return (
    <ScrollView style={{ paddingTop: 20, paddingRight: 20, paddingLeft: 20, flex: 1, backgroundColor: "#FFFFFF"  }}>
      {loading ? <Loading /> : 
      <View style={styles.container}>
        <View
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            zIndex: 1
          }}
          >
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.Video}></View>
        <Timer
              initialTime={timer*1000*60}
              direction={timer == 0 ? 'forward' : 'backward'}
              startImmediately={false}
              
              checkpoints={[
                {
                  time: 0,
                  callback: () => console.log('Timer Finished'),
                }
              ]}
        >
        {({ start, pause, reset, stop }) =>  (
        <React.Fragment>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <TouchableOpacity
              onPressIn={start}
            >
              <Play height={25} width={25} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 4, justifyContent: "center", flexDirection: 'row' }}>
            <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 40 }}>
              <Timer.Minutes />
            </Text>
            <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 40 }}>
              :
            </Text>
            <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 40 }}>
              <Timer.Seconds />
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TouchableOpacity
              onPress={reset}
              onPressOut={stop}
            >
              <Reset height={25} width={25} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TouchableOpacity
              onPress={pause}
            >
              <Pause height={25} width={25} />
            </TouchableOpacity>
          </View>
        </View>
        </React.Fragment>
        )}
        </Timer>
        <View>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 16,
              paddingRight: 50,
            }}
          >
            Note
          </Text>
          <View style={{ height: 60, marginBottom: 10 }}>
            <ScrollView nestedScrollEnabled={true}>
              <Text>{note}</Text>
            </ScrollView>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
              Exercises
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 16,
                paddingLeft: 115,
              }}
            >
              Load
            </Text>
          </View>
          <View style={{ height: 100, width: 290, marginBottom: 10 }}>
            <ScrollView nestedScrollEnabled={true}>
              {exercises.length && exercises.map((label, index) => (
                <View
                  key={index}
                  style={{
                    paddingTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.listyle}>{label.exercise.name}</Text>
                  </TouchableOpacity>
                  <Text style={styles.listyle}>
                    {label.load} {label.equipment.name}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
              Reps
            </Text>
          </View>
          <View
            style={{
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              {exercises.length && exercises.map((label, index) => (
                <View style={{ paddingLeft: 10, paddingRight: 10 }} key={index}>
                  <TouchableOpacity>
                    <Text style={styles.listyle}>{label.reps}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
        {/* <LongButton
          title="Next Round"
          bgcolor="#3F3D56"
          marginBottom={10}
        ></LongButton> */}
        <LongButton title="Finish Workout" bgcolor="#32877D"
          onPress={() =>{
            doneWorkout();
          }}
        />
      </View>
    }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 40,
  },
  Video: {
    backgroundColor: "#32877D",
    height: 180,
    width: 295,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  BackImage: {
    height: 25,
    width: 25,
    marginRight: 270,
    marginBottom: 10,
  },
  Image: {
    marginTop: 20,
    height: 25,
    width: 25,
    marginLeft: 15,
    marginRight: 55,
  },
  Image2: {
    marginTop: 20,
    height: 25,
    width: 25,
    marginLeft: 40,
    marginRight: 10,
  },
  Image3: {
    marginTop: 20,
    height: 25,
    width: 25,
    marginLeft: 5,
    marginRight: 20,
  },
  Text1: {
    color: "#2F7EF3",
    alignItems: "center",
    justifyContent: "center",
  },
  Text2: {
    color: "#42EB21",
    alignItems: "center",
    justifyContent: "center",
  },
  listyle: {
    color: "#000000",
  },
});
