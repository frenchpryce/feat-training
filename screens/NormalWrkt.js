import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert
} from 'react-native';
import { LongField, ShortField, LargeField } from '../components/EntryFields';
import { BackButton, LongButton } from '../components/LongButton';
import { CheckList } from '../components/Modals';
import firebase from '../database';
import SearchableDropdown from 'react-native-searchable-dropdown';


export default function NormalWrkt({navigation, route}) {

    const [checklist, isChecklist] = useState(false);
    const { user, date } = route.params;
    const [exercise, setExercise] = useState('exercise');
    const [type, setType] = useState('workout type');
    const [reps, setReps] = useState('');
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

    useEffect(() => {
        console.log(date);
        let exercises = [];
        let wrkttypes = [];
        let equips = [];
        firebase.firestore()
        .collection('Exercises')
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
                exercises.push({name: doc.id, id: doc.id});
            });
            setExlabels(exercises);
        })
    },[])

    const addWorkout = () => {
        if(exercise=='exercise' || reps=='' || sets=='') {
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
                    type: 'normal',
                    exercise: exercise,
                    reps: reps,
                    sets: sets,
                    rest: Number(rest),
                    equipment: equipment,
                    load: load,
                    note: note,
                    timer: Number(timer),
                    date: doc,
                    category: 'workout',
                    status: 'unfinished',
                })
            })
            batch.commit()
            .then(() => {
                setExercise('exercise');
                setType('workout type');
                setReps('');
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
        <View style={styles.view}>
            <View
                style={{
                    position: 'absolute',
                    top: 40,
                    left: 40,
                }}
            >
                <BackButton onPress={() => navigation.goBack()} />
            </View>
            <View>
                <Text style={styles.heading}>Normal Workout</Text>
                <SafeAreaView>
                <SearchableDropdown 
                    onTextChange={(text) => console.log(text)}
                    //On text change listner on the searchable input
                    onItemSelect={(item) => setExercise(item)}
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
                    placeholder='exercise'
                    //place holder for the search input
                    resetValue={false}
                    //reset textInput Value with true and false state
                    underlineColorAndroid="transparent"
                    //To remove the underline from the android input
                />
                </SafeAreaView>
                <View style={{ flexDirection: 'row'}}>
                    <ShortField 
                        marginRight={5}
                        placeholder='reps'
                        onChangeText={(text) => setReps(text)}
                    />
                    <ShortField 
                        placeholder='sets'
                        onChangeText={(text) => setSets(text)}
                    />
                </View>
                <LongField 
                    marginTop={10}
                    placeholder='equipment'
                    onChangeText={(text) => setEquipment(text)}
                />
                <View style={{marginTop: 10, flexDirection: 'row'}}>
                    <ShortField 
                        marginRight={5}
                        placeholder='load'
                        onChangeText={(text) => setLoad(text)}
                    />
                    <ShortField 
                        placeholder='ex time'
                        onChangeText={(text) => setTimer(text)}
                    />
                </View>
                <ShortField 
                    marginTop={10}
                    placeholder='rest time'
                    onChangeText={(text) => setRest(text)}
                />
                <LargeField 
                    placeholder='note'
                    marginTop={10}
                    onChangeText={(text) => setNote(text)}
                />
                <LongButton 
                    marginTop={30}
                    marginBottom={30}
                    title='Next'
                    bgcolor='#32877D'
                    onPress={() => {
                        addWorkout();
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 50,
    },
    heading: {
        fontSize: 30,
        fontFamily: "Poppins_700Bold",
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    text: {
        fontSize: 16,
        fontFamily: "OpenSans_300Light",
        width: 225,
        textAlign: "center",
        color: "#37877D"
    },
})