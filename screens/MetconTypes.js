import React, { useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    ImageBackground
} from 'react-native';
import { BackButton, WorkoutButton } from '../components/LongButton';

export default function MetconTypes({ navigation, route }) {

    const { date, user } = route.params;

    return (
        <ImageBackground
            style={{ flex: 1, backgroundColor: "#FFFFFF" }}
            source={require("../assets/bg6.png")}
            resizeMode="cover"
        >
            <View
                style={{
                position: "absolute",
                top: 40,
                left: 40,
                }}
            >
                <BackButton onPress={() => navigation.goBack()} />
            </View>
            <Text style={styles.heading}>METCON Types</Text>
            <ScrollView style={styles.scrollview}>
                <WorkoutButton 
                    wrkt='For Time 1'
                    color="#000000"
                    onPress={() => navigation.navigate('ForTimeCreate1', { user: user, date: date })}
                />
                <WorkoutButton 
                    wrkt='For Time 2'
                    color="#000000"
                    onPress={() => navigation.navigate('ForTimeCreate2', { user: user, date: date })}
                />
                <WorkoutButton 
                    wrkt='For Time 3'
                    color="#000000"
                    onPress={() => navigation.navigate('ForTimeCreate3', { user: user, date: date })}
                />
                <WorkoutButton 
                    wrkt='For Time 4'
                    color="#000000"
                    onPress={() => navigation.navigate('ForTimeCreate4', { user: user, date: date })}
                />
                <WorkoutButton 
                    wrkt='Emom 1'
                    color="#000000"
                    onPress={() => navigation.navigate('EmomCreate1', { user: user, date: date })}
                />
                <WorkoutButton 
                    wrkt='Emom 2'
                    color="#000000"
                    onPress={() => navigation.navigate('EmomCreate2', { user: user, date: date })}
                />
                <WorkoutButton 
                    wrkt='Emom 3'
                    color="#000000"
                    onPress={() => navigation.navigate('EmomCreate3', { user: user, date: date })}
                />
                <WorkoutButton 
                    wrkt='METCON Type 8'
                    color="#000000"
                />
                <WorkoutButton 
                    wrkt='METCON Type 9'
                    color="#000000"
                />
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: 50,
    },
    heading: {
        fontSize: 30,
        fontFamily: "Poppins_700Bold",
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 100
    },
    scrollview: {
        paddingRight: 40,
        paddingLeft: 40,
    }
})