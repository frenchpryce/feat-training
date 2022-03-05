import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { BackButton, LongButton } from "../components/LongButton";
import { MealModal } from "../components/Modals";
import Dinner from "../assets/dinner.svg";

export default function MealScreen({ navigation }) {
  const [doneMeal, isDoneMeal] = useState(false);

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
      <View style={styles.container}>
        <Dinner width={200} height={200} marginBottom={10} />
        <Text style={styles.title}>Food name</Text>
        <Text style={styles.heading}>Ingredients</Text>
        <Text style={styles.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh urna,
          tristique quis nullam duis justo.
        </Text>
        <Text style={styles.heading}>Procedure</Text>
        <Text style={styles.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh urna,
          tristique quis nullam duis justo.
        </Text>
        <Text style={styles.heading}>Calories: 123</Text>
        <Text style={styles.heading}>Fats: 123</Text>
        <Text style={styles.heading}>Carbohydrates: 123</Text>
        <Text style={styles.heading}>Proteins: 123</Text>
        <Text style={styles.heading}>Serving: 123</Text>
        <LongButton
          title="Finish Meal"
          bgcolor="#32877D"
          marginTop={20}
          onPress={() => {
            isDoneMeal(true);
          }}
        />
      </View>
      <MealModal
        visible={doneMeal}
        warning="Finish your meal!"
        text="Are you done eating?"
        title1="No"
        title2="Yes"
        bgcolor1="#FF6F61"
        bgcolor2="#32877D"
        marginRight={5}
        onPress1={() => isDoneMeal(false)}
        onPress2={() => navigation.navigate("UserMeal")}
      />
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
