import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    RefreshControl,
    Alert,
    ToastAndroid
} from 'react-native';
import { LongButton, TextButton, BackButton } from "../components/LongButton";
import { LongField, ShortField, LongDropDown, ShortDropDown } from "../components/EntryFields";
import * as ImagePicker from 'expo-image-picker'
import firebase from "../database";
import Loading from "../components/Loading";
import { useIsFocused } from "@react-navigation/native";

export default function EditPage({ navigation, route }) {

    const user = route.params.user;
    const [userData, setUserData] = useState({});
    const [firstname, setfirstName] = useState("");
    const [lastname, setlastName] = useState("");
    const [email, setEmail] = useState("");   
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [goal, setGoal] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [option, setOption] = useState();
    const [imagelink, setImagelink] = useState("../../assets/noPic.png");
    const [noimage, isNoimage] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
      };
    
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      wait(3000).then(() => setRefreshing(false));
    }, [refreshing]);
      
    useEffect(() => {
    if (isFocused) {
        firebase
        .firestore()
        .collection("Users")
        .doc(user)
        .get()
        .then((snap) => {
            setUserData(snap.data());
        });
        setRefreshing(false);
    }
    firebase
    .storage()
    .ref("uploads/" + user + ".jpg")
    .getDownloadURL()
    .then((url) => {
        try {
        isNoimage(false);
        setImagelink(url);
        } catch {
        isNoimage(true);
        }
    })
    .catch((e) => {
        console.log(e);
    });
    }, [isFocused, refreshing]);

    const uriToBlob = (uri) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new Error("uritoblob failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
    };

    const uploadToFirebase = (blob) => {
      return new Promise((resolve, reject) => {
        var storageRef = firebase.storage().ref();
        storageRef
          .child("uploads/" + user + ".jpg")
          .put(blob, {
            contentType: "image/jpeg",
          })
          .then((snapshot) => {
            blob.close();
            resolve(snapshot);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    const pickImage = async () => {
      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
        .then((result) => {
          if (!result.cancelled) {
            const { height, width, type, uri } = result;
            console.log(uri);
            return uriToBlob(uri);
          }
        })
        .then((blob) => {
          if (blob != null) {
            Alert.alert("Edit Profile", "Profile Picture Changed Succesfully", [
              {
                text: "Done",
                onPress: () => {
                  firebase
                    .storage()
                    .ref("uploads/" + user + ".jpg")
                    .getDownloadURL()
                    .then((url) => {
                      firebase.firestore().collection("Users").doc(user).update({
                        urllink: url,
                      });
                    });
                  setRefreshing(true);
                },
                style: "cancel",
              },
            ]);
            return uploadToFirebase(blob);
          }
        })
        .catch((error) => {
          throw error;
        });
    };

    // const onDonePress = () => {
    //   firebase
    //     .firestore()
    //     .collection("Users")
    //     .doc(user)
    //     .update({
    //       firstname: firstname,
    //       lastname: lastname,
    //       email: email,
    //       height: height,
    //       weight: weight,
    //       age: age,
    //       goal: goal,
    //       gender: gender,
    //       weightgoal: option,
    //   })
    // }

    return (
        <ScrollView
            style={{backgroundColor: "#FFFFFF"}}
            renderToHardwareTextureAndroid
            shouldRasterizeIOS
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.view}>
                <View style={{ position: "absolute", top: 60, left: 40 }}>
                  <BackButton onPress={() => navigation.goBack()} />
                </View>
                <Image style={styles.picture} source={{uri: userData.urllink}}/>
                <TextButton 
                    onPress={() => pickImage()}
                    title="Change Profile Picture" 
                    alignSelf='center'
                    marginTop={10}
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                    }}
                >
                    <ShortField
                        placeholder={userData.firstname}
                        marginRight={5}
                        onTextChange={(text) => {
                            setfirstName(text);
                        }}
                        
                    />
                    <ShortField
                        placeholder={userData.lastname}
                        onTextChange={(text) => {
                            setlastName(text);
                        }}
                    />
                </View>
                <LongField
                    placeholder={userData.email}
                    onTextChange={(text) => {
                    setEmail(text);
                    }}
                    marginTop={10}
                />
                <View
                    style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                    }}
                >
                    <ShortField
                    placeholder={"" + userData.height + " cm"}
                    onTextChange={(text) => {
                        setHeight(text);
                    }}
                    marginRight={5}
                    />
                    <ShortField
                    placeholder={"" + userData.weight + " kg"}
                    onTextChange={(text) => {
                        setWeight(text);
                    }}
                    />
                </View>
                <View
                    style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                    }}
                >
                    <ShortField
                    placeholder={"" + userData.age}
                    onTextChange={(text) => {
                        setAge(text);
                    }}
                    marginRight={5}
                    />
                    <ShortField
                    placeholder={"" + userData.goal + " kg"}
                    onTextChange={(text) => {
                        setGoal(text);
                    }}
                    />
                </View>
                <ShortDropDown
                    placeholder={userData.gender}
                    marginTop={10}
                    item={[
                    { label: "Male", value: "male", icon: () => null },
                    { label: "Female", value: "female", icon: () => null },
                    ]}
                    onChangeItem={(item) => {
                    console.log(item.value);
                    setGender(item.value);
                    }}
                    defaultValue="male"
                />
                <LongDropDown
                    placeholder={userData.weightgoal}
                    zIndex={10}
                    marginTop={10}
                    item={[
                    { label: "Weight Gain", value: "weight gain", icon: () => null },
                    { label: "Wegith Loss", value: "weight loss", icon: () => null },
                    {
                        label: "Wegith Maintenance",
                        value: "weight maintenance",
                        icon: () => null,
                    },
                    ]}
                    onChangeItem={(item) => {
                    console.log(item.value);
                    setOption(item.value);
                    }}
                    defaultValue="weight gain"
                />
                <LongButton
                    marginTop={20}
                    bgcolor="#58DCC4"
                    title="Save"
                    onPress={() => onDonePress()}
                />
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: 80,
        paddingBottom: 50,
        paddingLeft: 40,
        paddingRight: 40
    },
    picture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#37877D",
        alignSelf: 'center'
    }
})