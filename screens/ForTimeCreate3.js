// Example of Searchable Dropdown / Picker in React Native
// https://aboutreact.com/example-of-searchable-dropdown-picker-in-react-native/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import {ShortField, LongField, LargeField } from '../components/EntryFields';
import { ExerciseText } from '../components/Texts';
import { LongButton, BackButton } from '../components/LongButton';
import firebase from '../database';


//import SearchableDropdown component
import SearchableDropdown from 'react-native-searchable-dropdown';

//Item array for the dropdown
export default function ForTimeCreate3({navigation}) {
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


  const [exercises, setExercises] = useState([]);

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
    .collection('Exercises')
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        exercises.push({ key: doc.id, label: doc.id });
      });
      setExercises(exercises);
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
      <View style={styles.workoutname} >
        <Text style={{fontFamily:"Poppins_700Bold", fontSize:30, marginTop: 40 }}>
          For Time 3
        </Text>
        <View  style={{height:500, width:290,marginBottom:50}}>
        <SearchableDropdown 
          onTextChange={(text) => console.log(text)}
          //On text change listner on the searchable input
          onItemSelect={(item) => alert(JSON.stringify(item))}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ paddingBottom: 10 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12, borderRadius:15,
            backgroundColor: '#FFFF',
            width:'100%',
            borderRadius: 30,
            elevation: 5,
            fontFamily: 'OpenSans_300Light_Italic',
            fontSize: 16,
            textAlign:'center',
          }}
          itemStyle={{
            //single dropdown item style
            marginTop:5,
            padding:10,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
            height:50,
            width:'100%',
            justifyContent:'center',
            alignItems:'center'
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '43%',
          }}
          items={exercises}
          //mapping of item array
          defaultIndex={2}
          //default selected item index
          placeholder="exercise"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
        <View style={{flexDirection:'row'}}>
        <ShortField placeholder="reps"   >

        </ShortField>
        <ShortField placeholder="rounds/sets"   >

        </ShortField>
        </View>
        <View style={{marginTop:10}}>
        <ShortField placeholder="load"   >

        </ShortField>
        </View>
    
      
        <SearchableDropdown 
          onTextChange={(text) => console.log(text)}
          //On text change listner on the searchable input
          onItemSelect={(item) => alert(JSON.stringify(item))}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ paddingTop: 10 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12, borderRadius:15,
            backgroundColor: '#FFFF',
            width:'100%',
            borderRadius: 30,
            elevation: 5,
            fontFamily: 'OpenSans_300Light_Italic',
            fontSize: 16,
            textAlign:'center',
          }}
          itemStyle={{
            //single dropdown item style
            marginTop:5,
            padding:10,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
            height:50,
            width:'100%',
            justifyContent:'center',
            alignItems:'center'
            
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '43%',
          }}
          items={exercises}
          //mapping of item array
          defaultIndex={2}
          //default selected item index
          placeholder="equipment"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
        <TouchableOpacity>
        <Text style={{color:'#32877D', fontSize:16,marginTop:10,marginLeft:5,marginBottom:10}}>
           + Add another exercise
          </Text>
           </TouchableOpacity>
       
        <LargeField placeholder="note" >

        </LargeField>
        <TouchableOpacity>
        <Text style={{color:'#32877D', fontSize:16,marginTop:10,marginLeft:5,marginBottom:10}}>
           + Add another circuit
          </Text>
           </TouchableOpacity>
        <LongButton     title='Next'
                    bgcolor='#32877D'>

            </LongButton>
         </View>
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
