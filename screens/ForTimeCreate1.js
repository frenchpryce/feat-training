// Example of Searchable Dropdown / Picker in React Native
// https://aboutreact.com/example-of-searchable-dropdown-picker-in-react-native/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import {ShortField, LongField, ShortField2, LargeField } from '../components/EntryFields';
import { ExerciseText } from '../components/Texts';
import { LongButton, BackButton } from '../components/LongButton';


//import SearchableDropdown component
import SearchableDropdown from 'react-native-searchable-dropdown';
import firebase from '../database';

//Item array for the dropdown
export default function ForTimeCreate1({ navigation, route }) {

const [exercises, setExercises] = useState([]);
const [checklist, isChecklist] = useState(false);
const { user, date } = route.params;
const [selected, setSelected] = useState('');
const [type, setType] = useState('workout type');
const [reps, setReps] = useState([]);
const [repinput, setRepinput] = useState('');
const [sets, setSets] = useState('');
const [equipment, setEquipment] = useState('');
const [load, setLoad] = useState('');
const [rest, setRest] = useState('');
const [note, setNote] = useState('');
const [timer, setTimer] = useState('');
const [exlabels, setExlabels] = useState([]);
const [wrkttypes, setWrkttpyes] = useState([]);
const [equips, setEquips] = useState([]);
const [mylink, setLink] = useState('');
const [exercise, setExercise] = useState([]);

const [equipdrop, isEquipdrop] = useState(false);
const [exdrop, isExdrop] = useState(false);
let tempexercise = [];

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
      let exercises = [];
      snap.forEach((doc) => {
        exercises.push({ name: doc.id, id: doc.id });
      });
      setExlabels(exercises);
    });

    firebase.firestore()
    .collection('Equipments')
    .get()
    .then((snap) => {
      let equipments = [];
      snap.forEach((doc) => {
        equipments.push({name: doc.id, id: doc.id});
      });
      setEquips(equipments);
    })
  }, []);

  const addWorkout = () => {
    if(exercise == null || reps == null ) {
        Alert.alert(
            'Invalid Input',
            'Please fill up the necessary fields',
            [
                {
                    text: 'Close',
                    style: 'cancel'
                }
            ]
        );
    } else {
        var db = firebase.firestore();
        var batch = db.batch();
        date.forEach((doc) => {
            console.log(doc);
            var docRef = db.collection('Users').doc(user).collection('wrktmeal').doc();
            batch.set(docRef, {
                id: idGenerator(),
                type: 'for time 1',
                exercise: exercise,
                reps: reps,
                sets: sets,
                rest: Number(rest),
                note: note,
                timer: Number(timer),
                date: doc,
                category: 'workout',
                status: 'unfinished',
            })
        })
        batch.commit()
        .then(() => {
            setExercise([]);
            setType('workout type');
            setReps([]);
            setSets('');
            setEquipment('');
            setRest('');
            setLoad('');
            setNote('');
            setTimer('');

            navigation.reset({
                index: 0,
                routes: [{ name: 'UserWorkout2', params: {user: user}}],
            })
        })
    }
}

let idGenerator = () => {
    let id = () => {
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }
    return id()+id()+'-'+id()+'-'+id()+'-'+id()+'-'+id()+id()+id();
}


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
          For Time 1
        </Text>
        <View  style={{height:500, width:290,marginBottom:50}}>
        <SearchableDropdown 
          selectedItems={selected}
          onTextChange={(text) => setSelected(text)}
          onItemSelect={(item) => {
            setSelected(item);
            isExdrop(true);
          }}
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
            maxHeight: '100%',
          }}
          items={exlabels}
          //default selected item index
          placeholder="exercise"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
          <ShortField placeholder="load" value={load} onChangeText={(text) => setLoad(text)}>
          </ShortField>
        <SearchableDropdown 
          selectedItems={equipment}
          onTextChange={(text) => setEquipment(text)}
          //On text change listner on the searchable input
          onItemSelect={(item) => {
            setEquipment(item);
            isEquipdrop(true);
          }}
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
          items={equips}
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
        <TouchableOpacity 
          onPress={() => {
            exercise.push({
              ex: exdrop ? selected.name : selected ,
              load: load,
              equipment: equipdrop ? equipment.name : equipment
            });
            setLoad('');
            isEquipdrop(false);
            isExdrop(false);
            console.log(exercise);
          }}
        >
        <Text style={{color:'#32877D', fontSize:16,marginTop:10,marginLeft:5,marginBottom:10}}>
           + Add another exercise
          </Text>
        </TouchableOpacity>
       
          <ShortField placeholder="reps" 
            value={repinput}
            onChangeText={(text) => setRepinput(text)}
          >
         </ShortField>
         <TouchableOpacity
          onPress={() => {
            reps.push(repinput);
            console.log(reps);
            setRepinput('');
          }}
         >
        <Text style={{color:'#32877D', fontSize:16,marginTop:10,marginLeft:5,marginBottom:10}}>
           + Add another reps
          </Text>
           </TouchableOpacity>
        <LargeField placeholder="note" onChangeText={(text) => setNote(text)} >

        </LargeField>
        <LongButton     
          title='Next'
          bgcolor='#32877D'
          marginTop={20}
          onPress={() => addWorkout()}
        >
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
    justifyContent: 'center',
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
