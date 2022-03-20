import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { BackButton, TextButton } from "../components/LongButton";
import firebase from "../database";

export default function Subscription({ navigation, route }) {
  const user = route.params.user;
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Programs")
      .get()
      .then((snap) => {
        let program = [];
        snap.forEach((doc) => {
          program.push({ prog: doc.id });
        });
        setPrograms(program);
      });
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 40, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          position: "absolute",
          top: 0,
        }}
      >
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <Text style={styles.headtext}>Choose a program</Text>
      {programs.map((label, index) => (
        <TouchableOpacity
          style={styles.categories}
          key={index}
          onPress={() => {
            navigation.navigate("Details", { prog: label.prog, user: user });
          }}
        >
          <Text style={styles.textstyle}>{label.prog}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  categories: {
    zIndex: 1,
    marginBottom: 20,
    height: 120,
    width: "100%",
    borderRadius: 20,
    elevation: 3,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#09857D",
    padding: 30,
  },
  userLogo: {
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: "column",
  },
  users: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
  },
  userName: {
    textAlign: "center",
    fontFamily: "Poppins_300Light",
    fontSize: 13,
    color: "#FFFFFF",
  },
  textstyle: {
    fontSize: 13,
    color: "#000000",
    fontFamily: "Poppins_300Light",
  },
  headtext: {
    marginTop: 40,
    marginBottom: 20,
    fontSize: 24,
    color: "#09857D",
    fontFamily: "Poppins_400Regular",
    alignSelf: "flex-start",
  },
});
