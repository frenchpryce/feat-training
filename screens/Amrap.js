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
  Button,
  Alert,
  TextInput,
  Modal,
  Dimensions,
  Pressable
} from "react-native";
import Play from "../assets/play.svg";
import Reset from "../assets/reset.svg";
import Pause from "../assets/pause.svg";
import firebase from "../database";
import Loading from "../components/Loading";
import Timer from 'react-compound-timer';
import { Video, AVPlaybackStatus } from 'expo-av';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get("window");

export default function Amrap({ navigation, route }) {
  const { user, id } = route.params;
  const [pressed, isPressed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [reps, setReps] = useState("");
  const [dataid, setDataid] = useState('');
  const [note, setNote] = useState("");
  const [timer, setTimer] = useState();
  const [visible, setVisible] = useState(false);
  const video = useRef(null);
  const [status, setStatus] = React.useState({});
  const [ex, setEx] = useState(0);

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
            setNote(doc.data().note);
            if(doc.data().timer == 0) {
              setTimer(0);
            } else {
              setTimer(doc.data().timer);
            }
            setLoading(false);
          }
          console.log(exercises);
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
                  status: 'finished',
                  sets: reps
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
              uri: exercises[ex].lnk
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
              // onPress={() => {
              //   status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
              // }}
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
              onPressIn={pause}
              // onPress={() => {
              //   status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
              // }}
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
            <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16, width: 150, color:'#32877D' }}>
              Exercises
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 16,
                color:'#32877D',
              }}
            >
              Load
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 16,
                color:'#32877D',
              }}
            >
              Reps
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
                    <Text style={[styles.listyle, {width: 120}]}>{label.ex}</Text>
                  </TouchableOpacity>
                  <Text style={styles.listyle}>
                    {label.load} {label.equipment}
                  </Text>
                  <Text style={styles.listyle}>
                    {label.reps}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
          {/* <View
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
                  <TouchableOpacity
                    onPress={() => {
                      setColor("#32877D");
                      setFont("Poppins_700Bold");
                    }}
                  >
                    <Text style={styles.listyle}>{label.reps}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View> */}
        </View>
        <LongButton title="Finish Workout" bgcolor="#32877D"
          onPress={() =>{
            setVisible(true);
            doneWorkout();
          }}
        />
      </View>
    }
    <Modal 
      animationType="slide" 
      transparent 
      visible={visible} 
      presentationStyle="overFullScreen" 
      onDismiss={() => {
        setVisible(false);
      }}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
              <TextInput placeholder="How many sets have you finished?" 
                          value={reps} style={styles.textInput} 
                          onChangeText={(text) => setReps(text)} />
              <TouchableOpacity onPress={() => {
                if(reps == ""){

                } else {
                  setVisible(false);
                  doneWorkout();
                }
              }}>
                <Text style={[styles.Text1, {fontFamily: 'Poppins_700Bold'}]}>Continue</Text>
              </TouchableOpacity>
          </View>
      </View>
    </Modal>
    {/* <View
      style={{
        position: "absolute",
        top: 200,
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

        }}
      >
        <Text style={{fontFamily: 'Poppins_700Bold', color: "#FFFFFF"}}>Rest</Text>
      </TouchableOpacity>
    </View> */}
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
    height: 180,
    width: 295,
    alignSelf: 'center',
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
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
},
viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
},
modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, 
                { translateY: -90 }],
    height: 180,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 7,
},
textInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
    textAlign: 'center'
},
});
