import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { ShortButton, MiniButton } from '../components/LongButton';
import CalorieTracker from '../assets/calorietracker.svg';

export default function CalorieTrack({navigation}) {
    return(
        <ImageBackground source={require('../assets/bg4.png')} resizeMode='cover' style={styles.view}>
            <Text 
                style={styles.heading}
            >Track Your Calories</Text>
            <CalorieTracker width={375} height={255}/>
            <View style={styles.container}>
            <Text style={styles.text}>With Feat Training, you can get in shape without going to the gym. The application is free to to download in play store and app store.</Text>
            <View style={{flexDirection: 'row'}}>
                <MiniButton 
                    onPress={() => navigation.goBack()}
                />
                <ShortButton 
                    onPress={() => navigation.navigate('MainScreen')}
                    title='Finish'
                    bgcolor='#32877D'
                />
            </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      paddingTop: 40
    },
    container: {
      paddingLeft: 40,
      backgroundColor: 'transparent',
    },
    heading: {
      fontFamily: 'Poppins_700Bold',
      fontSize: 40,
      color: '#000000',
      width: 270,
      paddingLeft: 40
    },
    text: {
      fontSize: 16,
      fontFamily: 'OpenSans_300Light',
      width: 225,
      marginBottom: 45,
      marginTop: 20
    }
  });