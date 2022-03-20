import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { BackButton, LongButton } from "../components/LongButton";
import Dinner from "../assets/dinner.svg";
import firebase from "../database";
import Loading from "../components/Loading";

export default function MealScreen({ navigation, route }) {
  const { user, id } = route.params;
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState([]);
  const [dataid, setDataid] = useState('');

  useEffect(() => {
    firebase
      .firestore()
      .collection("Users")
      .doc(user)
      .collection("wrktmeal")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          if(doc.data().category == "meals"){
            console.log(doc.data());
            if (doc.data().id == id && doc.data().status == 'unfinished') {
              setDataid(doc.id);
              setMeal(doc.data());
              console.log(meal);
              setLoading(false);
            }
          }
        });
      });
  }, []);

  const doneMeal = () => {
    Alert.alert(
      'Finished Meal',
      'Are you done with your meal?',
      [
        {
          text: 'No',
          style: 'cancel'
        },
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
                routes: [{ name: 'UserMeal', params: {user: user}}],
              })
            }
        },
      ]
    )
  }

  return (
    <ScrollView style={styles.view}>
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 40,
        }}
        >
        <BackButton onPress={() => navigation.goBack()} />
      </View>
    {loading ? <Loading /> :
      <View style={styles.container}>
        <Dinner width={200} height={200} marginBottom={10} />
        <Text style={styles.title}>{meal.meal.name}</Text>
        <Text style={styles.heading}>Ingredients</Text>
        <Text style={styles.body}>{meal.ingred}</Text>
        <Text style={styles.heading}>Procedure</Text>
        <Text style={styles.body}>{meal.procd}</Text>
        <Text style={styles.heading}>Calories: {meal.meal.cals}</Text>
        <Text style={styles.heading}>Fats: {meal.meal.fats}</Text>
        <Text style={styles.heading}>Carbohydrates: {meal.meal.carbs}</Text>
        <Text style={styles.heading}>Proteins: {meal.meal.prots}</Text>
        <Text style={styles.heading}>Serving: {meal.meal.serve}</Text>
        <LongButton
          title="Finish Meal"
          bgcolor="#32877D"
          marginTop={20}
          onPress={() => {
            doneMeal();
          }}
        />
      </View>
    }
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 80,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    textAlign: "center",
  },
  heading: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    textAlign: "center",
  },
  body: {
    fontFamily: "OpenSans_300Light",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
});
