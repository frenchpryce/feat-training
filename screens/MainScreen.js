import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Modal } from 'react-native';
import Loading from '../components/Loading';
import { TextButton, LongButton, BackButton } from '../components/LongButton';

export default function CalorieTrack({navigation}) {

    return(
        <ImageBackground source={require('../assets/bg5.png')} resizeMode='cover' style={styles.view}>
            <Text 
                style={styles.heading}
            >Get Started!</Text>
            <View style={styles.container}>
            <Text style={styles.text}>We'd love to help you start your journey!</Text>
            <View>
                <LongButton 
                    onPress={() => {
                        navigation.navigate('Loading');
                        setTimeout(() => {
                            navigation.navigate('Register');
                        }, 3000)
                    }}
                    title='Register Now!'
                    bgcolor='#58DCC4'
                    alignSelf='center'
                />
            </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 30, marginLeft: 20}}>
                <Text style={[styles.secondtext, {marginRight: 5}]}>Already have an account?</Text>
                <TextButton 
                    onPress={() => {
                        navigation.navigate('Login')
                    }}
                    title='Login'
                    color='#32877D'
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
                    onPress={() => {
                        navigation.navigate("About");
                    }}
                    title='About'
                    color='#FFFFFF'
                />
                <TextButton 
                    onPress={() => {
                        navigation.navigate("FAQsPage");
                    }}
                    title='FAQ'
                    color='#FFFFFF'
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      paddingTop: 40,
      paddingBottom: 230
    },
    container: {
      paddingLeft: 40,
      paddingRight: 40,
      backgroundColor: '#FFFFFF',
    },
    heading: {
      fontFamily: 'Poppins_700Bold',
      fontSize: 50,
      color: '#000000',
      width: 260,
      paddingLeft: 40,
      marginTop: 20
    },
    text: {
      fontSize: 16,
      fontFamily: 'OpenSans_300Light',
      width: 225,
      marginBottom: 45,
      marginTop: 10
    },
    secondtext: {
        fontSize: 13,
        fontFamily: 'Poppins_400Regular',
        color: '#000000'
    }
  });