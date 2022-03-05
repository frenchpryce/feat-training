import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { ShortButton, MiniButton } from '../components/LongButton';
import LottieView from 'lottie-react-native';

export default function Welcome({navigation}) {

    let animation = React.createRef();
    useEffect(() => {
      animation.current.play();
    }, [])

    const [visible, isVisible] = useState(false);

    return(
        <ImageBackground source={require('../assets/bg1.png')} resizeMode='cover' style={styles.view}>
            <Text 
                style={styles.heading}
            >Welcome to Feat Training</Text>
            <View style={styles.container}>
            <LottieView 
              ref={animation}
              loop={false}
              style={{
                width: 300,
                height: 500,
                backgroundColor: 'transparent',
                position: 'absolute',
                top: -50
              }}
              source={require('../assets/confetti.json')}
            />
            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh urna, tristique quis nullam duis justo.</Text>
            <View style={{flexDirection: 'row'}}>
                <ShortButton 
                    onPress={() => navigation.navigate('WelcomeScreen2')}
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
      backgroundColor: 'transparent',
      justifyContent: 'center',
      paddingTop: 40,
      paddingBottom: 250
    },
    container: {
      paddingLeft: 40,
      backgroundColor: 'transparent',
    },
    heading: {
      fontFamily: 'Poppins_700Bold',
      fontSize: 40,
      color: '#000000',
      width: 255,
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