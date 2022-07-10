import React, { useState, useEffect } from "react";
import * as Linking from 'expo-linking';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { BackButton, TextButton, LongButton } from "../components/LongButton";
import firebase from "../database";
import Loading from "../components/Loading";

export default function Details({navigation, route}) {
    const user = route.params.user;
    const prog = route.params.prog;
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState("");
    const [price, setPrice] = useState("");
    const [img, setImg] = useState("");

    useEffect(() => {
        firebase
        .firestore()
        .collection("Programs")
        .doc(prog)
        .get()
        .then((snap) => {
            setDetails(snap.data().details);
            setPrice(snap.data().price + ".00");
            setImg(snap.data().img);
            setLoading(false);
        });
    },[])

    const startSub = () => {
      firebase
        .firestore()
        .collection("Users")
        .doc(user)
        .update({
          status: "verified",
          payment: {
            balance: price
          },
          programtype: prog,
        })
    }

    return (
        
        <ScrollView
            style={{flex: 1, padding: 40, backgroundColor: "#FFFFFF"}}
        >   
            <View
                style={{
                    position: "absolute",
                    top: 0,
                }}
                >
                <BackButton onPress={() => navigation.goBack()} />
            </View>
            {loading ? <Loading /> : 
                <View>
                <Text style={styles.headtext}>{prog}</Text>
                <Image style={{height: 200, width: "100%", borderRadius: 20}}
                source={{uri: img}}
                />
                <Text style={styles.textstyle}>{details}</Text>
                <LongButton 
                  marginTop={50}
                  onPress={() => {
                    Alert.alert(
                      "You are choosing " + prog,
                      "Do you want to proceed?",
                      [
                        {
                          text: 'YES',
                          onPress: () => {
                            firebase
                              .firestore()
                              .collection("Users")
                              .doc(user)
                              .update({
                                programtype: prog,
                                status: 'Verified',
                                payment: {
                                  balance: price
                                }
                              })
                            navigation.navigate('Menu', { user: user })
                            Linking.openURL("https://www.picktime.com/6a769cc0-56f6-4a31-9cbb-0c350b8fa554");
                          }
                        },
                        {
                          text: "NO",
                          style: 'cancel'
                        }
                      ]
                    )
                  }}
                  title='Choose Program'
                  bgcolor='#FF6F61'
                />
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    parentContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    categories: {
      zIndex: 1,
      marginBottom: 20,
      height: 120,
      width: "100%",
      borderRadius: 20,
      elevation: 3,
      justifyContent: "space-between",
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#09857D",
      padding: 30,
    },
    price: {
        fontSize: 24,
        fontFamily: "Poppins_700Bold",
        marginTop: 20
    },  
    textstyle: {
      fontSize: 13,
      color: "#000000",
      fontFamily: "Poppins_300Light",
    },
    headtext: {
      marginTop: 40,
      marginBottom: 20,
      fontSize: 20,
      color: "#09857D",
      fontFamily: "Poppins_400Regular",
      alignSelf: "flex-start",
    },
  });