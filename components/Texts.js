import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const ExerciseText = (props) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: props.backgroundColor
            }}
        >
            <Text>{props.title}</Text>
        </TouchableOpacity>
    )
};

export { ExerciseText };

const styles = StyleSheet.create({
    text: {

    }
})