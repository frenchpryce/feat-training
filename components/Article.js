import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const ArticleBox = (props) => {
    return (
        <TouchableOpacity
            style={styles.articleBox}
            onPress={props.onPress}
        >
            <Image style={styles.featuredPhoto} source={{uri: props.source}} />
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.body}>{props.body}</Text>
        </TouchableOpacity>
    )
};

export { ArticleBox };

const styles = StyleSheet.create({
    articleBox: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        backgroundColor: '#EBF3F2',
        marginTop: 10,
        elevation: 5,
        padding: 5
    },
    featuredPhoto: {
        backgroundColor: '#FFFFFF',
        height: '70%',
        width: '100%',
        borderRadius: 15,
        marginBottom: 5
    },
    title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
        paddingLeft: 5
    },
    body: {
        fontFamily: 'OpenSans_300Light',
        fontSize: 13,
        paddingLeft: 5,
        flex: 1,
        flexWrap: 'wrap'
    }
})