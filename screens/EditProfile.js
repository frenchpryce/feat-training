import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Image, View, ImageBackground, Text, ScrollView, RefreshControl } from 'react-native';
import { LongButton, TextButton, BackButton } from '../components/LongButton';
import { LongField, ShortField, LongDropDown, ShortDropDown } from '../components/EntryFields';
import firebase from '../database';
import Loading from '../components/Loading';
import { useIsFocused } from '@react-navigation/native';

export default function EditProfile({navigation, route}) {

    // const [gvalue, setgValue] = useState();
    // const [wvalue, setwValue] = useState();
    const user = route.params.user;
    const [firstname, setfirstName] = useState('');
    const [lastname, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [goal, setGoal] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [option, setOption] = useState();
    const [firstplace, setfirstplace] = useState();
    const [lastplace, setlastplace] = useState();
    const [eplace, setEplace] = useState();
    const [hplace, setHplace] = useState();
    const [wplace, setWplace] = useState();
    const [gplace, setGplace] = useState();
    const [ageplace, setAgeplace] = useState();
    const [goalplace, setGoalplace] = useState();
    const [optionplace, setOptionplace] = useState();
    const [imagelink, setImagelink] = useState('../../assets/noPic.png');
    const [noimage, isNoimage] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
    
      const onRefresh = useCallback(() => {
        setRefreshing(true);
        setLoading(true);
        wait(3000).then(() => setRefreshing(false));
    },[refreshing])

    useEffect(() => {
        setRefreshing(false);
        firebase
          .firestore()
          .collection("Users")
          .doc(user)
          .get()
          .then((snap) => {
            setfirstplace(snap.data().firstname);
            setlastplace(snap.data().lastname);
            setEplace(snap.data().email);
            setHplace(snap.data().height);
            setWplace(snap.data().weight);
            setGplace(snap.data().gender);
            setAgeplace(snap.data().age);
            setGoalplace(snap.data().goal);
            setOptionplace(snap.data().weightgoal);
            setfirstName(snap.data().firstname);
            setlastName(snap.data().lastname);
            setEmail(snap.data().email);
            setHeight(snap.data().height);
            setWeight(snap.data().weight);
            setAge(snap.data().age);
            setGoal(snap.data().goal);
            setOption(snap.data().weightgoal);
            setLoading2(false);
          });
        firebase
          .storage()
          .ref('uploads/' + user + '.jpg')
          .getDownloadURL()
          .then((url) => {
            try{
              isNoimage(false);
              setImagelink(url);
              setLoading(false);
            } catch {
              isNoimage(true);
            }
              
          })
          .catch((e) => {
              console.log(e);
          });
    },[refreshing]);

    const uriToBlob = (uri) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function() {
            reject(new Error('uritoblob failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });
      }
    
      const uploadToFirebase = (blob) => {
        return new Promise((resolve, reject) => {
          var storageRef = firebase.storage().ref();
          storageRef.child('uploads/' + user + '.jpg').put(blob, {
            contentType: 'image/jpeg'
          }).then((snapshot) => {
            blob.close();
            resolve(snapshot);
          }).catch((error) => {
            reject(error);
          });
        });
      }
    
      const pickImage = async () => {
        ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        }).then((result) => {
          if(!result.cancelled){
            const { height, width, type, uri } = result;
            console.log(uri);
            return uriToBlob(uri);
          }
        }).then((blob) => {
          if(blob != null){Alert.alert(
            'Edit Profile',
            'Profile Picture Changed Succesfully',
            [
              {
                text: 'Done',
                onPress: () => {
                  firebase.storage().ref('uploads/' + user + '.jpg').getDownloadURL().then((url) => {
                    firebase.firestore()
                    .collection('Users')
                    .doc(user)
                    .update({
                      urllink: url
                    })
                  })
                  setRefreshing(true)
                },
                style: 'cancel'
              }
            ]
          )
          return uploadToFirebase(blob);
        }
        }).catch((error) => {
          throw error;
        });
    };

    const onDonePress = () => {
        firebase
        .firestore()
        .collection("Users")
        .doc(user)
        .update({
          'firstname': firstname,
          'lastname': lastname,
          'email': email,
          'height': height,
          'weight': weight,
          'goal': goal,
          'age': age,
          'gender': gender,
          'weightgoal': option,
        })
        .then(() => {
          console.log("User Profile Updated");
        });
        navigation.navigate("UserProfile");
    };

    return (
      <ImageBackground 
      source={require('../assets/bg4.png')}
      resizeMode='cover'
      style={styles.view}
      >
            <View
                style={{
                  position: 'absolute',
                  top: 40,
                  left: 40
                }}
                >
                <BackButton 
                    onPress={() => navigation.goBack()}
                    />
            </View>
            { loading && loading2 ? <Loading/> :
            <ScrollView style={{ backgroundColor: "#FFFFFF", paddingLeft: 40, paddingRight: 40 }}
                renderToHardwareTextureAndroid
                shouldRasterizeIOS
                refreshControl={
                <RefreshControl 
                refreshing={refreshing}
                onRefresh={onRefresh}
                />
                }
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Image 
                        style={{
                            flex: 1,
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            backgroundColor: '#37877D',
                        }}
                        source={ noimage ? require('../assets/noPic.png') : { uri: imagelink }}
                    />
                    <View
                        style={{
                            flex: 1.2,
                            width: 80,
                            justifyContent: 'center',
                            marginLeft: 10,
                            marginRight: 50
                        }}
                    >
                        <TextButton
                            onPress={() => pickImage()}
                            title='Change Profile Picture'
                        />
                    </View>
                </View>
                <View 
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                    }}
                >
                    <ShortField 
                        placeholder={firstplace}
                        marginRight={5}
                        onTextChange={(text) => {
                            setfirstName(text);
                        }}
                    />
                    <ShortField 
                        placeholder={lastplace}
                        onTextChange={(text) => {
                            setlastName(text);
                        }}
                    />
                </View>
                <LongField 
                    placeholder={eplace}
                    onTextChange={(text) => {
                        setEmail(text);
                    }}
                    marginTop={10}
                />
                    <View 
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                    }}
                    >
                        <ShortField 
                            placeholder={hplace}
                            onTextChange={(text) => {
                                setHeight(text);
                            }}
                            marginRight={5}
                        />
                        <ShortField 
                            placeholder={wplace}
                            onTextChange={(text) => {
                                setWeight(text);
                            }}
                        />
                    </View>
                    <View 
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                    }}
                    >
                        <ShortField 
                            placeholder={ageplace}
                            onTextChange={(text) => {
                                setAge(text);
                            }}
                            marginRight={5}
                        />
                        <ShortField 
                            placeholder={goalplace}
                            onTextChange={(text) => {
                                setGoal(text);
                            }}
                        />
                    </View>
                <ShortDropDown 
                    placeholder={gplace}
                    marginTop={10}
                    item={[
                        {label: 'Male', value: 'male', icon: () => null},
                        {label: 'Female', value: 'female', icon: () => null},
                    ]}
                    onChangeItem={item => {
                        console.log(item.value);
                        setGender(item.value);
                    }}
                    defaultValue='male'
                />
                <LongDropDown 
                    placeholder={optionplace}
                    zIndex={10}
                    marginTop={10}
                    item={[
                        {label: 'Weight Gain', value: 'weight gain', icon: () => null},
                        {label: 'Wegith Loss', value: 'weight loss', icon: () => null},
                        {label: 'Wegith Maintenance', value: 'weight maintenance', icon: () => null},
                    ]}
                    onChangeItem={item => {
                        console.log(item.value);
                        setOption(item.value);
                    }}
                    defaultValue='weight gain'
                />
                <LongButton 
                    marginTop={20}
                    bgcolor='#58DCC4'
                    title='Save'
                    onPress={() => onDonePress()}
                />
            </ScrollView>
        }
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 80
    },
    container: {
        flex: 1,
        paddingLeft: 40,
        paddingRight: 40,
        justifyContent: 'flex-start',
    }
})