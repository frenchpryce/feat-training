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
import { TimerModal } from "../components/Modals";
import { Video, AVPlaybackStatus } from 'expo-av';
import { WebView } from 'react-native-webview';

export default function EmomScreen5({ navigation, route }) {
  const { user, id } = route.params;
  const [pressed, isPressed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [reps, setReps] = useState([]);
  const [dataid, setDataid] = useState('');
  const [note, setNote] = useState("");
  const [timer, setTimer] = useState();
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [ex, setEx] = useState(0);
  const [timermodal, setTimermodal] = useState(false);
  const timeRef = React.createRef();

  useEffect(() => {
    firebase
      .firestore()
      .collection("Users")
      .doc(user)
      .collection("wrktmeal")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          if (doc.data().id == id) {
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

  const onRest = (rest_time) => {
    setTimermodal(true);
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
        <View style={{height: 235}}>
          {/* <Video
            ref={video}
            style={styles.Video}
            source={{
              uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              html: `
                <html>
                  <body>
                    <iframe src="https://vimeo.com/precisionnutrition/5-3-2-sets" width="100%" height="200px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    <script src="https://player.vimeo.com/api/player.js"></script>
                  </body>
                </html>
              `,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />  */}
          <WebView 
            style={styles.Video}
            source={{
              uri: exercises[ex].exercise.lnk
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={{padding: 5, width: 80, height: 'auto', alignSelf: 'flex-start', backgroundColor: "#3F3D56"}}
            onPress={() => {
              if(ex >= exercises.length-1 || ex != 0) {
                setEx(ex-1);
              } else {
                doneWorkout();
              }
            }}
          >
            <Text style={{fontFamily: "Poppins_700Bold", fontSize: 10, color: "#FFFFFF", textAlign: 'center'}}>Prev Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 5, width: 80, height: 'auto', alignSelf: 'flex-end', backgroundColor: "#3F3D56"}}
            onPress={() => {
              if(ex < exercises.length-1) {
                setEx(ex+1);
              } else {
                doneWorkout();
              }
            }}
          >
            <Text style={{fontFamily: "Poppins_700Bold", fontSize: 10, color: "#FFFFFF", textAlign: 'center'}}>Next Video</Text>
          </TouchableOpacity>
          </View>
        </View>
        <Timer
              initialTime={timer*1000*60}
              direction={timer == 0 ? 'forward' : 'backward'}
              startImmediately={false}
              ref={timeRef}
              checkpoints={[
                {
                  time: 0,
                  callback: () => Alert.alert(
                    "Time's Up!",
                    "Proceed to next workout",
                    [
                      {
                        text: "Continue",
                        style: 'cancel',
                        onPress: () => {
                          setTimermodal(true)
                        }
                      }
                    ]
                  ),
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
              color:'#32877D',
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
            <Text style={{ fontFamily: "Poppins_400Regular", color:'#32877D', fontSize: 16 }}>
              Exercises
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 16,
                color:'#32877D',
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
            <Text style={{ fontFamily: "Poppins_400Regular", color:'#32877D', fontSize: 16 }}>
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
        <View
          style={{
            position: "absolute",
            top: "27%",
            right: 0,
            zIndex: 1
          }}
          >
          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#3F3D56",
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 40
            }}
            onPress={() => {
              onRest(3);
            }}
          >
            <Text style={{fontFamily: 'Poppins_700Bold', color: "#FFFFFF"}}>Rest</Text>
          </TouchableOpacity>
        </View>
        <TimerModal 
          timer={exercises[ex].rest}
          visible={timermodal}
          onPress={() => {
            Alert.alert(
              "Stopping rest",
              "Are you sure to stop resting?",
              [
                {
                  text: "YES",
                  style: 'cancel',
                  onPress: () => {
                    timeRef.current.reset();
                    timeRef.current.start();
                    setTimermodal(false);
                  }
                },
                {
                  text: "NO",
                  style: 'cancel'
                }
              ]
            )
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
