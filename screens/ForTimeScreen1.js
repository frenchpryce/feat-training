import React, { useEffect, useState } from "react";
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

export default function ForTimeScreen1({ navigation, route }) {
  const { user, id } = route.params;
  const [pressed, isPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [reps, setReps] = useState([]);
  const [dataid, setDataid] = useState('');
  const [note, setNote] = useState("");

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
            setReps(doc.data().reps);
            setNote(doc.data().note);
          }
          console.log(reps);
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
    <ScrollView style={{ paddingTop: 20 }}>
      <View style={styles.container}>
        <View
          style={{
            position: "absolute",
            top: 40,
            left: 40,
          }}
        >
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.Video}></View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Play height={25} width={25} />
          </View>
          <View style={{ flex: 4, justifyContent: "center" }}>
            <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 40 }}>
              20:00
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Reset height={25} width={25} />
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Pause height={25} width={25} />
          </View>
        </View>
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
              {exercises.map((label, index) => (
                <View
                  key={index}
                  style={{
                    paddingTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.listyle[index]}>{label.ex}</Text>
                  </TouchableOpacity>
                  <Text style={styles.listyle}>
                    {label.load} {label.equipment}
                  </Text>
                </View>
              ))}
              {/* <View
                style={{
                  paddingTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setColor2("#32877D");
                    setFont2("Poppins_700Bold");
                    setColor("black");
                    setFont("");
                    setColor3("black");
                    setFont3("");
                    setColor4("black");
                    setFont4("");
                    setColor5("black");
                    setFont5("");
                  }}
                >
                  <Text style={{ color: colortext2, fontFamily: fonttext2 }}>
                    Exercise 2
                  </Text>
                </TouchableOpacity>
                <Text style={{ color: colortext2, fontFamily: fonttext2 }}>
                  15
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setColor3("#32877D");
                    setFont3("Poppins_700Bold");
                    setColor("black");
                    setFont("");
                    setColor2("black");
                    setFont2("");
                    setColor4("black");
                    setFont4("");
                    setColor5("black");
                    setFont5("");
                  }}
                >
                  <Text style={{ color: colortext3, fontFamily: fonttext3 }}>
                    Exercise 3
                  </Text>
                </TouchableOpacity>
                <Text style={{ color: colortext3, fontFamily: fonttext3 }}>
                  15
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setColor4("#32877D");
                    setFont4("Poppins_700Bold");
                    setColor2("black");
                    setFont2("");
                    setColor("black");
                    setFont("");
                    setColor3("black");
                    setFont3("");
                    setColor5("black");
                    setFont5("");
                  }}
                >
                  <Text style={{ color: colortext4, fontFamily: fonttext4 }}>
                    Exercise 4
                  </Text>
                </TouchableOpacity>
                <Text style={{ color: colortext4, fontFamily: fonttext4 }}>
                  15
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setColor5("#32877D");
                    setFont5("Poppins_700Bold");
                    setColor2("black");
                    setFont2("");
                    setColor3("black");
                    setFont3("");
                    setColor("black");
                    setFont("");
                    setColor4("black");
                    setFont4("");
                  }}
                >
                  <Text style={{ color: colortext5, fontFamily: fonttext5 }}>
                    Exercise 5
                  </Text>
                </TouchableOpacity>
                <Text style={{ color: colortext5, fontFamily: fonttext5 }}>
                  15
                </Text>
              </View> */}
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
              {reps.map((label, index) => (
                <View style={{ paddingLeft: 10, paddingRight: 10 }} key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      setColor("#32877D");
                      setFont("Poppins_700Bold");
                    }}
                  >
                    <Text style={styles.listyle}>{label}</Text>
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
