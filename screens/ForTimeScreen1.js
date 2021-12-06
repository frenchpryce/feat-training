import React, { useState } from "react";
import {
  TextButton,
  LongButton,
  BackButton,
} from "../components/LongButton";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Play from '../assets/play.svg';
import Reset from '../assets/reset.svg';
import Pause from '../assets/pause.svg';

export default function ForTimeScreen1({ navigation }) {
  const [colortext, setColor] = useState("black");
  const [fonttext, setFont] = useState("");
  const [colortext2, setColor2] = useState("black");
  const [fonttext2, setFont2] = useState("");
  const [colortext3, setColor3] = useState("black");
  const [fonttext3, setFont3] = useState("");
  const [colortext4, setColor4] = useState("black");
  const [fonttext4, setFont4] = useState("");
  const [colortext5, setColor5] = useState("black");
  const [fonttext5, setFont5] = useState("");

  const data = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
  ];

  return (
    <ScrollView style={{ paddingTop: 20}}>
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
            <View style={{flex: 2, justifyContent: 'center'}}>
                <Play height={25} width={25}/>
            </View>
            <View style={{flex: 4, justifyContent: 'center'}}>
                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 40 }}>
                    20:00
                </Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Reset height={25} width={25}/>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Pause height={25} width={25}/>
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
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. A1. Jump Squat A2. Lateral Walks A3. Alternating
                Jumping Lunges A4. Mt. Climbers A5. Burpees
              </Text>
            </ScrollView>
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
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
              Reps
            </Text>
          </View>
          <View style={{ height: 100, width: 290, marginBottom: 10 }}>
            <ScrollView nestedScrollEnabled={true}>
              <View style={{ paddingTop: 10, flexDirection: "row", justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    onPress={() => {
                      setColor("#32877D");
                      setFont("Poppins_700Bold");
                      setColor2("black");
                      setFont2("");
                      setColor3("black");
                      setFont3("");
                      setColor4("black");
                      setFont4("");
                      setColor5("black");
                      setFont5("");
                    }}
                  >
                    <Text style={{ color: colortext, fontFamily: fonttext }}>
                      Exercise 1
                    </Text>
                  </TouchableOpacity>
                    <Text style={{ color: colortext, fontFamily: fonttext }}>
                        15
                    </Text>
              </View>
              <View style={{ paddingTop: 10, flexDirection: "row", justifyContent: 'space-between' }}>
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
              <View style={{ paddingTop: 10, flexDirection: "row", justifyContent: 'space-between' }}>
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
              <View style={{ paddingTop: 10, flexDirection: "row", justifyContent: 'space-between' }}>
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
              <View style={{ paddingTop: 10, flexDirection: "row", justifyContent: 'space-between' }}>
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
              </View>
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
              width: 45,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              marginLeft: 120,
            }}
          >
            <ScrollView nestedScrollEnabled={true} horizontal={true} style={{}}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View style={{ flex: 1, paddingRight: 15, paddingLeft: 15 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setColor("#32877D");
                      setFont("Poppins_700Bold");
                      setColor2("black");
                      setFont2("");
                      setColor3("black");
                      setFont3("");
                      setColor4("black");
                      setFont4("");
                      setColor5("black");
                      setFont5("");
                    }}
                  >
                    <Text style={{ color: colortext, fontFamily: fonttext }}>
                      10
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1, paddingRight: 15, paddingLeft: 15 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setColor2("#32877D");
                      setFont2("Poppins_700Bold");
                      setColor5("black");
                      setFont5("");
                      setColor4("black");
                      setFont4("");
                      setColor3("black");
                      setFont3("");
                      setColor("black");
                      setFont("");
                    }}
                  >
                    <Text style={{ color: colortext2, fontFamily: fonttext2 }}>
                      20
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, paddingRight: 15, paddingLeft: 15 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setColor3("#32877D");
                      setFont3("Poppins_700Bold");
                      setColor5("black");
                      setFont5("");
                      setColor4("black");
                      setFont4("");
                      setColor2("black");
                      setFont2("");
                      setColor("black");
                      setFont("");
                    }}
                  >
                    <Text style={{ color: colortext3, fontFamily: fonttext3 }}>
                      10
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, paddingRight: 15, paddingLeft: 15 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setColor4("#32877D");
                      setFont4("Poppins_700Bold");
                      setColor5("black");
                      setFont5("");
                      setColor3("black");
                      setFont3("");
                      setColor2("black");
                      setFont2("");
                      setColor("black");
                      setFont("");
                    }}
                  >
                    <Text style={{ color: colortext4, fontFamily: fonttext4 }}>
                      20
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, paddingRight: 20, paddingLeft: 15 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setColor5("#32877D");
                      setFont5("Poppins_700Bold");
                      setColor4("black");
                      setFont4("");
                      setColor3("black");
                      setFont3("");
                      setColor2("black");
                      setFont2("");
                      setColor("black");
                      setFont("");
                    }}
                  >
                    <Text style={{ color: colortext5, fontFamily: fonttext5 }}>
                      5
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>

        <LongButton title="Next Round" bgcolor="#3F3D56" marginBottom={10}></LongButton>
        <LongButton title="Finish Workout" bgcolor="#32877D"></LongButton>
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
    marginBottom: 40
  },
  Video: {
    backgroundColor: "#32877D",
    height: 180,
    width: 295,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
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
});
