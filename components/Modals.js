import React from 'react';
import { Modal, View, StyleSheet, Text, ScrollView } from 'react-native';
import { ModalButton, ModalButton2, TextButton } from './LongButton';
import { LongField } from './EntryFields';
import Log from '../assets/log.svg';
import Choose from '../assets/choose.svg';

const AlertModal = (props) => {
    return(
        <Modal
                visible={props.visible}
                onRequestClose={props.onRequestClose}
                transparent={true}
                animationType='fade'
            >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)'
                }}
            >
                <View style={styles.modal}>
                    <Log width={315} height={300} />
                    <Text style={styles.heading}>{props.warning}</Text>
                    <Text style={styles.body}>{props.text}</Text>
                    <View 
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 20
                        }}
                    >
                        <ModalButton
                            title={props.title1}
                            bgcolor={props.bgcolor1}
                            marginRight={props.marginRight}
                            onPress={props.onPress1}
                        />
                        <ModalButton
                            title={props.title2}
                            bgcolor={props.bgcolor2}
                            onPress={props.onPress2}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const MealModal = (props) => {
    return ( 
        <Modal
                visible={props.visible}
                onRequestClose={props.onRequestClose}
                transparent={true}
                animationType='fade'
            >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)'
                }}
            >
                <View style={styles.modal}>
                    <Log width={315} height={300} />
                    <Text style={styles.heading}>{props.warning}</Text>
                    <Text style={styles.body}>{props.text}</Text>
                    <View 
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 20
                        }}
                    >
                        <ModalButton
                            title={props.title1}
                            bgcolor={props.bgcolor1}
                            marginRight={props.marginRight}
                            onPress={props.onPress1}
                        />
                        <ModalButton
                            title={props.title2}
                            bgcolor={props.bgcolor2}
                            onPress={props.onPress2}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const WrktModal = (props) => {
    return ( 
        <Modal
                visible={props.visible}
                onRequestClose={props.onRequestClose}
                transparent={true}
                animationType='fade'
            >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)'
                }}
            >
                <View style={styles.modal}>
                    <Text style={styles.heading}>Choose a workout</Text>
                    <Choose height={200} width={215}/>
                    <ModalButton2
                        title={props.title1}
                        bgcolor={props.bgcolor1}
                        marginTop={props.marginTop}
                        onPress={props.onPress1}
                    />
                    <ModalButton2
                        title={props.title2}
                        bgcolor={props.bgcolor2}
                        marginTop={props.marginTop}
                        onPress={props.onPress2}
                    />
                </View>
            </View>
        </Modal>
    )
}

const MealChooseModal = (props) => {
    return ( 
        <Modal
                visible={props.visible}
                onRequestClose={props.onRequestClose}
                transparent={true}
                animationType='fade'
            >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)'
                }}
            >
                <View style={styles.modal}>
                    <Text style={styles.heading}>Choose a meal</Text>
                    <Choose height={150} width={165}/>
                    <ModalButton2
                        title={props.title1}
                        bgcolor={props.bgcolor1}
                        marginTop={props.marginTop}
                        onPress={props.onPress1}
                    />
                    <ModalButton2
                        title={props.title2}
                        bgcolor={props.bgcolor2}
                        marginTop={props.marginTop}
                        onPress={props.onPress2}
                    />
                    <ModalButton2
                        title={props.title3}
                        bgcolor={props.bgcolor3}
                        marginTop={props.marginTop}
                        onPress={props.onPress3}
                    />
                    <ModalButton2
                        title={props.title4}
                        bgcolor={props.bgcolor4}
                        marginTop={props.marginTop}
                        onPress={props.onPress4}
                    />
                </View>
            </View>
        </Modal>
    )
}

const CheckList = (props) => {
    return ( 
        <Modal
                visible={props.visible}
                onRequestClose={props.onRequestClose}
                transparent={true}
                animationType='fade'
            >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)'
                }}
            >
                <View style={styles.modal}>
                    <Text style={styles.heading}>{props.warning}</Text>
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        style={{
                            height: 200
                        }}>
                        <Text style={styles.heading2, [{ textAlign: 'center' }]}>{props.workout}</Text>
                        <Text style={styles.body, [{ textAlign: 'center' }]}>Exercise: {props.exercise}</Text>
                        <Text style={styles.body, [{ textAlign: 'center' }]}>Reps: {props.reps}</Text>
                        <Text style={styles.body, [{ textAlign: 'center' }]}>Rounds/Sets: {props.roundsets}</Text>
                        <Text style={styles.body, [{ textAlign: 'center' }]}>Load/Equipment: {props.loadequip}</Text>
                        <Text style={styles.body, [{ textAlign: 'center' }]}>Time: {props.time}</Text>
                        <Text style={styles.body, [{ textAlign: 'center' }]}>Note: {props.note}</Text>
                    </ScrollView>
                    <ModalButton2
                        title={props.title1}
                        bgcolor={props.bgcolor1}
                        marginTop={props.marginTop}
                        onPress={props.onPress1}
                    />
                    <ModalButton2
                        title={props.title2}
                        bgcolor={props.bgcolor2}
                        marginTop={props.marginTop}
                        onPress={props.onPress2}
                    />
                </View>
            </View>
        </Modal>
    )
}

const CalModal = (props) => {
    return (
        <Modal
            visible={props.visible}
            onRequestClose={props.onRequestClose}
            transparent={true}
            animationType='fade'
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)'
                }}
            >
                <View style={styles.modal}>
                    <Text style={[styles.heading2, {textAlign: 'left'}]}>Set the user's daily calorie intake</Text>
                    <LongField placeholder="Calorie intake" keyboardType="number-pad" marginTop={10} marginBottom={20} onChangeText={props.onChangeText}/>
                    <TextButton 
                        title="Done" 
                        position="absolute" 
                        bottom={10} 
                        right={30}
                        onPress={props.onPress}
                        color="#37877D"  
                    />
                </View>
            </View>
        </Modal>
    )
}

const AllModal = (props) => {
    return (
        <Modal
            visible={props.visible}
            onRequestClose={props.onRequestClose}
            transparent={true}
            animationType='fade'
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)'
                }}
            >
                <View style={styles.modal}>
                    <Text style={[styles.heading2]}>{props.title}</Text>
                    <Text style={[styles.body, {marginBottom: 20}]}>{props.body}</Text>
                    <TextButton 
                        title={props.btnText} 
                        position="absolute" 
                        bottom={10} 
                        right={30}
                        onPress={props.onPress}
                        color="#37877D"  
                    />
                </View>
            </View>
        </Modal>
    )
}

export { AlertModal, MealModal, WrktModal, CheckList, MealChooseModal, CalModal, AllModal };

const styles = StyleSheet.create({
    modal: {
        width: 315,
        height: 'auto',
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 60,
        paddingBottom: 40,
        alignSelf: 'center',
    },
    heading: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 30,
        textAlign: 'center'
    },
    heading2: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 20,
        textAlign: 'center'
    },
    body: {
        fontFamily: 'OpenSans_300Light',
        fontSize: 16
    }
})