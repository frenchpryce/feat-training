import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
export default function FAQsPage({navigation}) {
    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.heading}>FAQ </Text>
                <View style={{marginLeft: 20, marginBottom: 20}}>
                    <Text style={styles.subHeading}>Q1: </Text>
                    <Text style={styles.textContent}>Ut eu orci nunc. Donec eget bibendum urna. Maecenas a ultrices ipsum. Nulla volutpat nunc ante, tincidunt eleifend massa mattis quis.</Text>
                </View>
                <View style={{marginLeft: 20, marginBottom: 20}}>
                    <Text style={styles.subHeading}>Q2: </Text>
                    <Text style={styles.textContent}>Ut eu orci nunc. Donec eget bibendum urna. Maecenas a ultrices ipsum. Nulla volutpat nunc ante, tincidunt eleifend massa mattis quis.</Text>
                </View>
                <View style={{marginLeft: 20, marginBottom: 20}}>
                    <Text style={styles.subHeading}>Q3: </Text>
                    <Text style={styles.textContent}>Ut eu orci nunc. Donec eget bibendum urna. Maecenas a ultrices ipsum. Nulla volutpat nunc ante, tincidunt eleifend massa mattis quis.</Text>
                </View>
                <View style={{marginLeft: 20, marginBottom: 20}}>
                    <Text style={styles.subHeading}>Q4: </Text>
                    <Text style={styles.textContent}>Ut eu orci nunc. Donec eget bibendum urna. Maecenas a ultrices ipsum. Nulla volutpat nunc ante, tincidunt eleifend massa mattis quis.</Text>
                </View>
                <View style={{marginLeft: 20, marginBottom: 20}}>
                    <Text style={styles.subHeading}>Q5: </Text>
                    <Text style={styles.textContent}>Ut eu orci nunc. Donec eget bibendum urna. Maecenas a ultrices ipsum. Nulla volutpat nunc ante, tincidunt eleifend massa mattis quis.</Text>
                </View>
                <View style={{marginLeft: 20, marginBottom: 20}}>
                    <Text style={styles.subHeading}>Q6: </Text>
                    <Text style={styles.textContent}>Ut eu orci nunc. Donec eget bibendum urna. Maecenas a ultrices ipsum. Nulla volutpat nunc ante, tincidunt eleifend massa mattis quis.</Text>
                </View>
                <View style={{marginLeft: 20, marginBottom: 20}}>
                    <Text style={styles.subHeading}>Q7: </Text>
                    <Text style={styles.textContent}>Ut eu orci nunc. Donec eget bibendum urna. Maecenas a ultrices ipsum. Nulla volutpat nunc ante, tincidunt eleifend massa mattis quis.</Text>
                </View>
                <View style={{marginLeft: 20, marginBottom: 20}}>
                    <Text style={styles.subHeading}>Q8: </Text>
                    <Text style={styles.textContent}>Ut eu orci nunc. Donec eget bibendum urna. Maecenas a ultrices ipsum. Nulla volutpat nunc ante, tincidunt eleifend massa mattis quis.</Text>
                </View>
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
        padding: 10
    },
    heading: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 25,
        color: '#006266'
    },
    subHeading: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 20,
        color: '#006266'
    },  
    textContent: {
        fontFamily: 'Poppins_300Light',
        fontSize: 15,
        color: '#006266',
    }
})



