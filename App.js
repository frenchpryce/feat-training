import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_100Thin,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
import {
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";
import {
  CalorieTrack,
  EditProfile,
  Login,
  MainScreen,
  MealPlans,
  MealScreen,
  Menu,
  Register,
  UserList,
  UserMeal,
  UserMeal2,
  UserProfile,
  UserProfile2,
  UserWorkout,
  UserWorkout2,
  Welcome,
  WorkoutPlans,
  NormalWrkt,
  MetconTypes,
  UserCalorie,
  UserCalorie2,
  ForTimeScreen1,
  ForTimeScreen2,
  ForTimeScreen3,
  ForTimeScreen4,
  Amrap,
  ForTimeCreate1,
  ForTimCreate3,
  ForTimCreate4,
  EmomCreate1,
  EmomCreate2,
  EmomCreate3,
  EmomCreate4,
  EmomCreate5,
  EmomCreate6,
  EmomCreate7,
  MealCreate,
  EmomScreen1,
  EmomScreen2,
  EmomScreen3,
  EmomScreen4,
  EmomScreen5,
  EmomScreen6,
  EmomScreen7,
  Subscription,
  Details,
  ArticleScreen,
  EditPage,
  About,
  FAQ
} from "./screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loading from "./components/Loading";
import ForTimeCreate2 from "./screens/ForTimeCreate2";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsloaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_100Thin,
    Poppins_300Light,
    OpenSans_300Light,
    OpenSans_300Light_Italic,
    OpenSans_700Bold,
    OpenSans_400Regular,
  });

  if (!fontsloaded) {
    return <View style={styles.view}></View>;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        >
          <Stack.Screen
            name="WelcomeScreen"
            component={Welcome}
            options={{ animation: "fade" }}
          />
          <Stack.Screen
            name="WelcomeScreen2"
            component={WorkoutPlans}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="WelcomeScreen3"
            component={MealPlans}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="WelcomeScreen4"
            component={CalorieTrack}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Subscription" component={Subscription} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="UserProfile2" component={UserProfile2} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="EditPage" component={EditPage} />
          <Stack.Screen name="UserWorkout" component={UserWorkout} />
          <Stack.Screen name="UserWorkout2" component={UserWorkout2} />
          <Stack.Screen name="UserMeal" component={UserMeal} />
          <Stack.Screen name="UserMeal2" component={UserMeal2} />
          <Stack.Screen name="MealScreen" component={MealScreen} />
          <Stack.Screen name="UserList" component={UserList} />
          <Stack.Screen name="NormalWrkt" component={NormalWrkt} />
          <Stack.Screen name="MetconTypes" component={MetconTypes} />
          <Stack.Screen name="UserCalorie" component={UserCalorie} />
          <Stack.Screen name="UserCalorie2" component={UserCalorie2} />
          <Stack.Screen name="ForTimeScreen1" component={ForTimeScreen1} />
          <Stack.Screen name="ForTimeScreen2" component={ForTimeScreen2} />
          <Stack.Screen name="ForTimeScreen3" component={ForTimeScreen3} />
          <Stack.Screen name="ForTimeScreen4" component={ForTimeScreen4} />
          <Stack.Screen name="EmomScreen1" component={EmomScreen1} />
          <Stack.Screen name="EmomScreen2" component={EmomScreen2} />
          <Stack.Screen name="EmomScreen3" component={EmomScreen3} />
          <Stack.Screen name="EmomScreen4" component={EmomScreen4} />
          <Stack.Screen name="EmomScreen5" component={EmomScreen5} />
          <Stack.Screen name="EmomScreen6" component={EmomScreen6} />
          <Stack.Screen name="EmomScreen7" component={EmomScreen7} />
          <Stack.Screen name="Amrap" component={Amrap} />
          <Stack.Screen name="ForTimeCreate1" component={ForTimeCreate1} />
          <Stack.Screen name="ForTimeCreate2" component={ForTimeCreate2} />
          <Stack.Screen name="ForTimeCreate3" component={ForTimCreate3} />
          <Stack.Screen name="ForTimeCreate4" component={ForTimCreate4} />
          <Stack.Screen name="EmomCreate1" component={EmomCreate1} />
          <Stack.Screen name="EmomCreate2" component={EmomCreate2} />
          <Stack.Screen name="EmomCreate3" component={EmomCreate3} />
          <Stack.Screen name="EmomCreate4" component={EmomCreate4} />
          <Stack.Screen name="EmomCreate5" component={EmomCreate5} />
          <Stack.Screen name="EmomCreate6" component={EmomCreate6} />
          <Stack.Screen name="EmomCreate7" component={EmomCreate7} />
          <Stack.Screen name="MealCreate" component={MealCreate} />
          <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="FAQ" component={FAQ} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: 40,
  },
});
