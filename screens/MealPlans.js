import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { ShortButton, MiniButton } from '../components/LongButton';
import MealPlan from '../assets/mealplans.svg';

export default function MealPlans({navigation}) {
    return(
        <ImageBackground source={require('../assets/bg3.png')} resizeMode='cover' style={styles.view}>
            <Text 
                style={styles.heading}
            >Meal Plans</Text>
            <MealPlan width={290} height={255} marginLeft={40}/>
            <View style={styles.container}>
            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh urna, tristique quis nullam duis justo.</Text>
            <View style={{flexDirection: 'row'}}>
                <MiniButton 
                    onPress={() => navigation.goBack()}
                />
                <ShortButton 
                    onPress={() => navigation.navigate('WelcomeScreen4')}
                    title='Next'
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
      width: 200,
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