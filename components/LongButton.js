import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import ArrowRight from '../assets/arrow-right.svg';
import ArrowLeft from '../assets/arrow-left.svg';
import Profile from '../assets/profile.svg';
import Workouts from '../assets/worokout.svg';
import Meals from '../assets/meals.svg';
import Calories from '../assets/calories.svg';


const LongButton = (props) => {
    return (
        <TouchableOpacity 
            style={[styles.center, styles.longbutton, {backgroundColor: props.bgcolor, marginTop: props.marginTop, marginBottom: props.marginBottom, elevation: props.elevation, alignSelf: props.alignSelf}]}
            onPress={props.onPress}
        >
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const TextButton = (props) => {
    return (
        <TouchableOpacity 
            onPress={props.onPress}
            style={{
                position: props.position,
                top: props.top,
                right: props.right,
                bottom: props.bottom,
                color: props.color,
                marginRight: props.marginRight,
                marginTop: props.marginTop,
                marginBottom: props.marginBottom
            }}
        >
            <Text style={[styles.textbutton, {color: props.color, width: props.width}]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const ShortButton = (props) => {
    return (
        <TouchableOpacity
            style={[styles.center, styles.shortbutton, { backgroundColor: props.bgcolor }]}
            onPress={props.onPress}
        >
            <Text style={styles.text}>{props.title}</Text>
            <ArrowRight height={14} width={16} marginLeft={15} />
        </TouchableOpacity>
    )
}

const MiniButton = (props) => {
    return (
        <TouchableOpacity
            style={[styles.center, styles.minibutton, {marginRight: 10}]}
            onPress={props.onPress}
        >
            <ArrowRight height={14} width={16} />
        </TouchableOpacity>
    )
}

const BackButton = (props) => {
    return (
        <TouchableOpacity
            style={[styles.backbutton, {marginTop: props.marginTop, marginBottom: props.marginBottom}]}
            onPress={props.onPress}
        >
            <ArrowLeft height={20} width={20}/>
        </TouchableOpacity>
    )
}

const ModalButton = (props) => {
    return (
        <TouchableOpacity
            style={[styles.center, styles.modalbutton, { backgroundColor: props.bgcolor, marginRight: props.marginRight }]}
            onPress={props.onPress}
        >
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const ModalButton2 = (props) => {
    return (
        <TouchableOpacity
            style={[styles.center, styles.modalbutton2, { backgroundColor: props.bgcolor, marginTop: props.marginTop }]}
            onPress={props.onPress}
        >
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const ProfileBadge = (props) => {
    return (
        <TouchableOpacity
            style={[styles.badges, { backgroundColor: props.bgcolor, marginRight: props.marginRight }]}
            onPress={props.onPress}
        >
            <Profile height={50} width={50} />
            <Text style={[styles.text, {letterSpacing: 1, marginTop: 15}]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const WorkoutBadge = (props) => {
    return (
        <TouchableOpacity
            style={[styles.badges, { backgroundColor: props.bgcolor }]}
            onPress={props.onPress}
        >
            <Workouts height={50} width={50} />
            <Text style={[styles.text, {letterSpacing: 1, marginTop: 15}]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const MealBadge = (props) => {
    return (
        <TouchableOpacity
            style={[styles.badges, { backgroundColor: props.bgcolor, marginRight: props.marginRight }]}
            onPress={props.onPress}
        >
            <Meals height={50} width={50} />
            <Text style={[styles.text, {letterSpacing: 1, marginTop: 15}]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const CaloriesBadge = (props) => {
    return (
        <TouchableOpacity
            style={[styles.badges, { backgroundColor: props.bgcolor }]}
            onPress={props.onPress}
        >
            <Calories height={50} width={50} />
            <Text style={[styles.text, {letterSpacing: 1, marginTop: 15}]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const WorkoutButton = (props) => {
    return (
        <TouchableOpacity
            key={props.mykey}
            style={[styles.wrktbutton, { marginTop: props.marginTop }]}
            onPress={props.onPress}
            onLongPress={props.onLongPress}
        >
            <Text style={[styles.text, { color: props.color, letterSpacing: 2 }]}>{props.wrkt}</Text>
        </TouchableOpacity>
    )
}

const PicButton = (props) => {
    return (
        <View style={styles.picbutton} key={props.mykey}>
            <TouchableOpacity
                style={styles.picbutton}
                onPress={props.onPress}
            >
                <Image style={{backgroundColor: '#58DCC4'}} source={{uri: props.source}}/>
            </TouchableOpacity>
            <Text style={{
                color: props.color,
                textAlign: 'center',
                fontFamily: 'OpenSans_400Regular',
                fontSize: 16,
            }}>{props.user}</Text>
        </View>
    )
}

export { 
    LongButton, 
    TextButton, 
    ShortButton, 
    MiniButton, 
    BackButton, 
    ProfileBadge, 
    WorkoutBadge, 
    MealBadge, 
    CaloriesBadge, 
    ModalButton,
    WorkoutButton,
    PicButton,
    ModalButton2
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    longbutton: {
        width: '100%',
        height: 45,
        borderRadius: 30,
        backgroundColor: '#32877D',
        elevation: 5,
    },
    text: {
        fontSize: 16,
        color: '#FFFFFF',
        letterSpacing: 5,
        fontFamily: 'Poppins_400Regular'  
    },
    textbutton: {
        fontSize: 13,
        elevation: 5,
        fontFamily: 'Poppins_700Bold',
    },
    shortbutton: {
        width: '50%',
        height: 40,
        borderRadius: 30,
        elevation: 5,
        flexDirection: 'row',
    },
    modalbutton: {
        width: 100,
        height: 40,
        borderRadius: 30,
        elevation: 5,
        flexDirection: 'row',
    },
    modalbutton2: {
        width: '100%',
        height: 45,
        borderRadius: 30,
        elevation: 5,
    },
    minibutton: {
        height: 40,
        width: 40,
        borderRadius: 20,
        elevation: 5,
        backgroundColor: '#58DCC4',
        transform: [
            {
                rotate: '180deg'
            }
        ]
    },
    backbutton: {
        elevation: 5,
        width: 20,
        height:20
    },
    badges: {
        width: 145,
        height: 130,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    wrktbutton: {
        width: '98%',
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        elevation: 5,
        marginBottom: 10
    },
    picbutton: {
        height: 80,
        width: 80,
        borderRadius: 50,
        elevation: 1,
        backgroundColor: '#FFFFFF',
        marginRight: 30
    }
}); 