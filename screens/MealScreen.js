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
import { AddMealModal } from "../components/Modals";
import Dinner from "../assets/dinner.svg";
import firebase from "../database";
import Loading from "../components/Loading";

export default function MealScreen({ navigation, route }) {
  const { user, id } = route.params;
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState({});
  const [dataid, setDataid] = useState('');
  const [dailycal, setDailycal] = useState({});
  const [weeklycal, setWeeklycal] = useState({});
  const [addVis, isAddVis] = useState(false);
  const [add, setAdd] = useState("");

  const getData = () => {
    firebase
      .firestore()
      .collection("Calories")
      .doc(user)
      .collection("daily")
      .doc(user)
      .get()
      .then((snap) => {
          setDailycal(snap.data());
        })
    
    firebase
      .firestore()
      .collection("Calories")
      .doc(user)
      .collection("weekly")
      .doc(user)
      .get()
      .then((snap) => {
          setWeeklycal(snap.data());
        })
  }

  useEffect(() => {
    getData();
    firebase
      .firestore()
      .collection("Users")
      .doc(user)
      .collection("wrktmeal")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          if(doc.data().category == "meals"){
            if (doc.data().id == id) {
              setDataid(doc.id);
              setMeal(doc.data());
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
          style: 'cancel',
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

              firebase
                .firestore()
                .collection('Calories')
                .doc(user)
                .collection('daily')
                .doc(user)
                .update({
                  dcalintake: dailycal.dcalintake += (meal.meal.cals * add)
                })
              firebase
                .firestore()
                .collection('Calories')
                .doc(user)
                .collection('weekly')
                .doc(user)
                .update({
                  wcalintake: (weeklycal.wcalintake + (meal.meal.cals * add))
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.heading2}>Cals</Text>
          <Text style={styles.heading2}>Fats</Text>
          <Text style={styles.heading2}>Carb</Text>
          <Text style={styles.heading2}>Prot</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.subheading}>{meal.meal.cals}</Text>
          <Text style={styles.subheading}>{meal.meal.fats}</Text>
          <Text style={styles.subheading}>{meal.meal.carbs}</Text>
          <Text style={styles.subheading}>{meal.meal.prots}</Text>
        </View>
        <Text style={styles.heading}>Serving</Text>
        <Text style={styles.subheading}>{meal.serve}</Text>
        <LongButton
          title="Finish Meal"
          bgcolor="#32877D"
          marginTop={20}
          onPress={() => {
            isAddVis(true);
          }}
        />
        <AddMealModal 
            visible={addVis}
            placeholder="How many servings?"
            onRequestClose={() => {
              isAddVis(false);
            }}
            onChangeText={(val) => {
              setAdd(val);
            }}
            onPress={() => {
              isAddVis(false);
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
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    textAlign: "center",
  },
  heading2: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    textAlign: "center",
    width: "25%"
  },
  subheading: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    textAlign: "center",
    width: "25%"
  },
  body: {
    fontFamily: "OpenSans_300Light",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
});
