import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import { LongButton, TextButton, BackButton } from "../components/LongButton";
import {
  LongField,
  ShortField,
  LongDropDown,
  ShortDropDown,
} from "../components/EntryFields";
import firebase from "../database";
import Loading from "../components/Loading";

export default function ArticleScreen({navigation, route}) {
    
    const artcle = route.params.artcle;
    
    return (
        <ScrollView
            contentContainerStyle={{justifyContent: 'flex-start'}}
            style={{flex: 1, padding: 40}}
        >
            <View
                style={{
                    position: "absolute",
                    top: 0,
                }}
                >
                <BackButton onPress={() => navigation.goBack()} />
            </View>
            <Text style={styles.headtext}>{artcle.title}</Text>
            <Text style={[styles.textstyle, {color: "#A4A4A4", marginBottom: 20, fontStyle: 'italic'}]}>{artcle.author} | {artcle.date}</Text>
            <Image 
                style={{height: 200, width: "100%", borderRadius: 20, marginBottom: 20}}
                source={{uri: artcle.image}}
            />
            <Text style={[styles.textstyle, {marginBottom: 70}]}>{artcle.body}</Text>
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
      fontSize: 20,
      color: "#09857D",
      fontFamily: "Poppins_400Regular",
      alignSelf: "flex-start",
    },
  });