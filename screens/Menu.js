import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import PersonalTrainer from '../assets/personaltrainer.svg';
import { ProfileBadge, WorkoutBadge, MealBadge, CaloriesBadge, TextButton, BackButton } from '../components/LongButton';
import { AlertModal } from '../components/Modals';

export default function Menu({navigation, route}) {

    const user = route.params.user;
    const type = route.params.type;
    const trainer = route.params.trainer;

    return (
        <View style={styles.view}>
            { trainer &&
            <View
                style={{
                    position: "absolute",
                    top: 50,
                    left: 40,
                    zIndex: 1
                }}
                >
                <BackButton onPress={() => navigation.goBack()} />
            </View>
            }
            <TextButton 
                title='Logout'
                color='#FF6F61'
                position='absolute'
                top={50}
                right={30}
                onPress={() => {
                    Alert.alert(
                        'Logging out',
                        'Are you sure you want to logout?',
                        [
                            {
                                text: 'Yes',
                                onPress: () => {
                                    navigation.navigate('MainScreen');
                                }
                            },
                            {
                                text: 'No',
                                style: 'cancel'
                            }
                        ]
                    )
                }}
            />
            <Text style={styles.heading}>Feat Training</Text>
            <PersonalTrainer width={240} height={180} marginBottom={25}/>
            <Text style={styles.text}>Menu</Text>
            <View 
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <ProfileBadge 
                    bgcolor='#FBBEBE'
                    title='Profile'
                    marginRight={10}
                    onPress={() => {
                        if(type == 'trainer'){
                            navigation.navigate('UserProfile2', { user: user })
                        } else {
                            navigation.navigate('UserProfile', { user: user })
                        }
                }}
                />
                <WorkoutBadge 
                    bgcolor='#3F3D56'
                    title='Workouts'
                    onPress={() => {
                        if(type == 'trainer'){
                            navigation.navigate('UserWorkout2', { user: user })
                        } else {
                            navigation.navigate('UserWorkout', { user: user })
                        }
                    }}
                />
            </View>
            <View 
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20
                }}
            >
                <MealBadge 
                    bgcolor='#736E9E'
                    title='Meals'
                    marginRight={10}
                    onPress={() => {
                        if(type == 'trainer'){
                            navigation.navigate('UserMeal2', { user: user })
                        } else {
                            navigation.navigate('UserMeal', { user: user })
                        }
                    }}
                />
                <CaloriesBadge 
                    bgcolor='#32877D'
                    title='Calories'
                    onPress={() => {
                        if(type == 'trainer') {
                            navigation.navigate('UserCalorie2', { user: user })
                        } else {
                            navigation.navigate('UserCalorie', { user: user });
                        }
                    }}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingTop: 40,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 30,
        fontFamily: 'Poppins_700Bold',
        width: 150,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        marginBottom: 25
    }
})