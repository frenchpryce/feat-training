// Example of Searchable Dropdown / Picker in React Native
// https://aboutreact.com/example-of-searchable-dropdown-picker-in-react-native/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import {ShortField, LongField, LargeField } from '../components/EntryFields';
import { LongButton, BackButton } from '../components/LongButton';


//import SearchableDropdown component
import SearchableDropdown from 'react-native-searchable-dropdown';
import firebase from '../database';

//Item array for the dropdown
export default function ForTimeCreate1({ navigation, route }) {

const type = route.params.type;
const user = route.params.user;

const items = [
  //name key is must.It is to show the text in front
  { id: 1, name: 'Jump Squat' },
  { id: 2, name: 'Lateral Walks' },
  { id: 3, name: 'Alternating Jump Lunges' },
  { id: 4, name: 'Mt.Climbers' },
  { id: 5, name: 'Burpees' },
  { id: 6, name: 'Inclined Push Up' },
  { id: 7, name: 'Squats' },
  { id: 8, name: 'Revese Lunges' },
  { id: 9, name: 'Plank Shoulder Tap' },
  { id: 10, name: 'KB Swings' },
];
const [mealtypes, setMealtypes] = useState([]);

  useEffect(() => {
    // fetch('https://aboutreact.herokuapp.com/demosearchables.php')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     //Successful response from the API Call
    //     setServerData(responseJson.results);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    firebase.firestore()
    .collection('Meal Types')
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        mealtypes.push({ key: doc.id, label: doc.id });
      });
      setMealtypes(mealtypes);
    });
  }, []);

  return (
    <View style={styles.container} >
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
        <Text style={{fontFamily:"Poppins_700Bold", fontSize:30, marginTop: 40 }}>
          {type}
        </Text>
        <View  style={{height:500, width:290,marginBottom:50}}>
        <LongField placeholder='recipe' />
        <LargeField placeholder='ingredients' marginTop={10} />
        <LargeField placeholder='procedure' marginTop={10} />
        <View style={{flexDirection:'row', marginTop: 10}}>
        <ShortField placeholder="carbohydrates"   >

        </ShortField>
        <ShortField placeholder="fats"   >

        </ShortField>
        </View>
        <View style={{flexDirection:'row', marginTop: 10}}>
        <ShortField placeholder="protein"   >

        </ShortField>
        <ShortField placeholder="serving"   >

        </ShortField>
        </View>
        <LongButton     
          title='Next'
          bgcolor='#32877D'
          marginTop={20}
        >

            </LongButton>
         </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  BackImage:{
    height:25, 
    width:25,
    marginRight:270,
    marginBottom:10,
  },
  workoutname: {
    paddingTop:30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
});
