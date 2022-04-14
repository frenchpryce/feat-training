import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';

export default function About({navigation}) {

    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

    return(
        <ScrollView>
            <View style={styles.container}>
                
                <Text style={styles.heading}>
                    The Story
                </Text>
                <Text style={styles.textContent}>
                FEAT (Fit and Eat) TRAINING was founded in 2020 as a one woman team operated business. 
                In the middle of a global pandemic, while I was working on my own fitness goals and friends 
                reaching our for advice, I saw a major gap between evidence based weight loss methods and the 
                available information out there.  I didn’t want it to be just another fitness and nutrition 
                program - I wanted to simplify the science of fitness and behavior change for my clients. 
                There is no one-size-fits all strategy to approach training and nutrition. I know my clients 
                have their own needs, lives and goals, and I want to make fitness work for each of my clients. 
                Hence, the birth of FEAT TRAINING.
                </Text>
                <Text style={styles.heading}>
                WHAT WE DO
                </Text>
                <Text style={styles.textContent}>
                I  want to help you live a fit and healthy lifestyle! We do this by helping you find the most 
                suitable equipment for your home gym, studio or commercial gym, keeping your budget, lifestyle and 
                fitness goals in mind. Through online coaching, I will teach you how to do fitness smarter. 
                I’m all about utilizing an effective, lasting approach that involves positive health habits and 
                improving overall mindset - ALL WHILE LIVING YOUR LIFE. You can have your favorite food and eat it 
                with a carefully structured plan.
                </Text>
                <Text style={styles.heading}>
                VISION AND MISSION:
                </Text>
                <Text style={styles.textContent}>
                FEAT TRAINING’s Vision and Mission is to help individuals navigate the vast information out there regarding 
                weight loss and training and zero in on what’s right FOR YOU.

                My mission in creating FEAT Training is to give you the knowledge and confidence to incorporate the best possible 
                training and nutrition program into your lifestyle. 

                My approach to training and nutrition is straightforward and to the point. No BS, No Speculation or Trends.
                </Text>
                <Text style={styles.heading}>
                CONNECT WITH ME:
                </Text>
                <Text style={styles.textContent}>
                <B>INSTAGRAM:</B> feat.training_ {"\n"}
                <B>Facebook Page:</B> FEAT Training {"\n"}
                <B>Email:</B> fitand.eatbycja@gmail.com {"\n"}
                <B>Viber / WhatsApp / Imessage or SMS:</B> +639175273323 {"\n"}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        padding: 20
    },
    heading: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 25,
        color: '#006266'
    },
    textContent: {
        fontFamily: 'Poppins_300Light',
        fontSize: 15,
        color: '#006266',
        textAlign: 'center'
    }
})