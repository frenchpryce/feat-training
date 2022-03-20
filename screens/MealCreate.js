import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ShortField, LongField, LargeField } from "../components/EntryFields";
import { LongButton, BackButton } from "../components/LongButton";
import SearchableDropdown from "react-native-searchable-dropdown";
import firebase from "../database";

export default function ForTimeCreate1({ navigation, route }) {
  const type = route.params.type;
  const { user, date } = route.params;
  const [mealtypes, setMealtypes] = useState([]);
  const [selected, setSelected] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [meals, setMeals] = useState([]);
  const [carbs, setCarbs] = useState("");
  const [prots, setProts] = useState("");
  const [fats, setFats] = useState("");
  const [cals, setCals] = useState("");
  const [serve, setServe] = useState("");
  const [ingred, setIngred] = useState("");
  const [proced, setProced] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("Meal Types")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          mealtypes.push({ key: doc.id, label: doc.id });
        });
        setMealtypes(mealtypes);
      });

    firebase
      .firestore()
      .collection("Meals")
      .get()
      .then((snap) => {
        let recipe = [];
        snap.forEach((doc) => {
          recipe.push({
            name: doc.data().FIELD1,
            id: doc.id,
            carbs: doc.data().Carbs,
            fats: doc.data().Fat,
            prots: doc.data().Protein,
            cals: doc.data().Calories,
          });
        });
        setRecipes(recipe);
      });
  }, []);

  const addMeal = () => {
    if (selected == "" || serve == "") {
      Alert.alert("Invalid Input", "Please fill up the necessary fields", [
        {
          text: "Close",
          style: "cancel",
        },
      ]);
    } else {
      Alert.alert("Submitting", "Done creating meal?", [
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
              batch.set(docRef, {
                id: idGenerator(),
                type: type,
                meal: selected,
                ingred: ingred,
                procd: proced,
                carbs: carbs,
                fats: fats,
                prots: prots,
                cals: cals,
                serve: serve,
                date: doc,
                category: "meals",
                status: "unfinished",
              });
            });
            batch.commit().then(() => {
              setMeals([]);
              setIngred("");
              setProced("");
              setCals("");
              setProts("");
              setCarbs("");
              setFats("");
              setServe("");
              navigation.reset({
                index: 0,
                routes: [{ name: "UserMeal2", params: { user: user } }],
              });
            });
          },
        },
      ]);
    }
  };

  let idGenerator = () => {
    let id = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return (
      id() +
      id() +
      "-" +
      id() +
      "-" +
      id() +
      "-" +
      id() +
      "-" +
      id() +
      id() +
      id()
    );
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
      <Text
        style={{ fontFamily: "Poppins_700Bold", fontSize: 30, marginTop: 40 }}
      >
        {type}
      </Text>
      <View style={{ height: 500, width: 290, marginBottom: 50 }}>
        <SearchableDropdown
          selectedItems={selected}
          // onTextChange={(text) => setSelected(text)}
          onItemSelect={(item) => {
            setSelected(item);
            recipes.forEach((data) => {
              if (data.name == item.name) {
                setCals(data.cals.toString());
                setFats(data.fats.toString());
                setProts(data.prots.toString());
                setCarbs(data.carbs.toString());
              }
            });
          }}
          containerStyle={{ paddingBottom: 10 }}
          textInputStyle={{
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
            color: "#222",
          }}
          itemsContainerStyle={{
            maxHeight: "43%",
          }}
          items={recipes}
          defaultIndex={2}
          placeholder="recipes"
          resetValue={false}
          underlineColorAndroid="transparent"
        />
        <LargeField 
          placeholder="ingredients" 
          value={ingred}
          onChangeText={(text) => setIngred(text)}  
        />
        <LargeField 
          placeholder="procedure" 
          marginTop={10} 
          value={proced}
          onChangeText={(text) => setProced(text)}  
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <ShortField 
            placeholder="carbohydrates"
            value={"Carbs: " + carbs}
            onChangeText={(text) => setCarbs(text)}  
          ></ShortField>
          <ShortField 
            placeholder="fats"
            value={"Fat: " + fats}
            onChangeText={(text) => setFats(text)}
          ></ShortField>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <ShortField 
            placeholder="protein"
            value={"Protein: " + prots}
            onChangeText={(text) => setProts(text)}
          ></ShortField>
          <ShortField 
            placeholder="serving"
            value={serve}
            onChangeText={(text) => setServe(text)}
          ></ShortField>
        </View>
        <LongButton
          title="Next"
          bgcolor="#32877D"
          marginTop={20}
          onPress={() => {
            addMeal();
          }}
        ></LongButton>
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
    justifyContent: "flex-start",
  },
  BackImage: {
    height: 25,
    width: 25,
    marginRight: 270,
    marginBottom: 10,
  },
  workoutname: {
    paddingTop: 30,
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
