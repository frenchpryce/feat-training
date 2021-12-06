import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, LogBox, Image } from 'react-native';
import { TextButton, LongButton, BackButton } from '../components/LongButton';
import { LongField } from '../components/EntryFields';
import Logo from '../assets/logo.svg';
import firebase from '../database';
import Loading from '../components/Loading';
import { useIsFocused } from '@react-navigation/native';

export default function CalorieTrack({navigation}) {

    const [trainer, isTrainer] = useState(false);
    const [ids, setIds] = useState([]);
    const [show, isShow] = useState(false);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const isFocused = useIsFocused();

    
    useEffect(() => {
        if(isFocused) {
            let list = [];
            firebase.firestore()
            .collection('Users')
            .get()
            .then((snap) => {
                snap.forEach((doc) => {
                    list.push(doc.data().userid);
                    console.log(list);
                    setIds(list);
                })
            })
        }
    }, [isFocused])

    LogBox.ignoreLogs(['Setting a timer']);
    
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onLoginPress = () => {
        firebase.firestore()
        .collection('Users')
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                if(doc.data().username == username && doc.data().password == password) {
                    ids.some((x) => {
                        if(x == doc.data().userid){
                            if(doc.data().usertype == 'trainer') {
                                setUsername('');
                                setPassword('');
                                isShow(false);
                                navigation.navigate('UserList', { data: x });
                            } 
                            else {
                                isShow(false);
                                setUsername('');
                                setPassword('');
                                return navigation.navigate('Menu', { user: x });
                            }
                        }
                    })
                } else {
                    setTimeout(() => {
                        isShow(true);
                        wait(2000).then(() => isShow(false));
                    }, 1000);
                }
            });
        })
        .catch(function(error) {
            
        })
    }

    return(
        <ImageBackground source={require('../assets/bg6.png')} resizeMode='cover' style={styles.view}>
            <View style={styles.container}>
                <Image source={require('../assets/FeatTraining.png')} style={{maxWidth: 300, maxHeight: 300}}/>
                {/* <Logo width={300} height={300} /> */}
                { show && 
                    <Text style={{fontSize: 13, fontFamily: 'Poppins_400Regular', color: '#FF6F61', textAlign: 'center'}}>Invalid credentials. Try Again</Text>
                }
                <LongField 
                    placeholder='username'
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />
                <LongField 
                    marginTop={10}
                    placeholder='password'
                    security={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <LongButton
                    title='Login'
                    bgcolor='#58DCC4'
                    marginTop={10}
                    onPress={() => {
                        onLoginPress();
                    }}
                />
            </View>
            <View 
                style={{
                    flexDirection: 'row', 
                    paddingLeft: 40, 
                    position: 'absolute', 
                    bottom: 20, 
                    left: 0,
                    right: 40,
                    justifyContent: 'space-between'
                }}
            >
                <TextButton 
                    title='About'
                    color='#FFFFFF'
                />
                <TextButton 
                    title='FAQ'
                    color='#FFFFFF'
                />
            </View>
            <View style={{
                position: 'absolute',
                top: 40,
                left: 40
            }}>
                <BackButton
                    onPress={() => navigation.navigate('MainScreen')}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 200,
        paddingLeft: 40,
        paddingRight: 40
    }
  });