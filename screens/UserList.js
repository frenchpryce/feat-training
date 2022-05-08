import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  ToastAndroid,
  TextInput,
  Platform
} from "react-native";
import { BackButton, PicButton } from "../components/LongButton";
import firebase from '../database';
import Loading from "../components/Loading";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function UserList({ navigation, route }) {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const data = route.params.data;

  const [userlist, setUserlist] = useState([]);
  const [imagelink, setImagelinks] = useState([]);
  const [allprogs, setProgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [unverif, setUnverif] = useState([]);
  const [reminder, setReminder] = useState("");

  const sendReminder = () => {
    firebase
      .firestore()
      .collection("Reminders")
      .doc("General")
      .set({
        forall: reminder
      });
  }

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder from Carla! 📬",
        body: reminder,
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  useEffect(() => {
    let list = [];
    let progs = [];
    let unverifusers = [];

    firebase
      .firestore()
      .collection("Users")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          if (doc.data().usertype == "trainer") {
          } else if (doc.data().status == 'Verified') {
            list.push(doc.data());
          } else if (doc.data().status == 'Unverified') {
            unverifusers.push(doc.data());
          }
        });
        setUserlist(list);
        setUnverif(unverifusers);
        setLoading2(false);
      })
      console.log(userlist);

    firebase
      .firestore()
      .collection("Programs")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          progs.push({
            title: doc.id,
          });
        });
        setProgs(progs);
        setLoading(false);
      });

      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
  }, []);

  return (
    <ImageBackground
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      source={require("../assets/bg4.png")}
      resizeMode="cover"
    >
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          zIndex: 1
        }}
      >
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      { loading && loading2 ? <Loading/> :
      <ScrollView style={styles.view} >
              <View style={[styles.reminderBox, {justifyContent: 'space-between'}]}>
                <TextInput 
                  style={{height: "100%", backgroundColor: "transparent", padding: 10, textAlignVertical: 'top'}}
                  placeholder="Set reminder..."
                  value={reminder}
                  onChangeText={(text) => setReminder(text)}
                />
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                    bottom: 15,
                    right: 20,
                    zIndex: 1,
                    position: 'absolute'
                  }}
                  onPress={async () => {
                      await schedulePushNotification();
                    sendReminder();
                    setReminder("");
                    ToastAndroid.show("Reminder has been sent!", ToastAndroid.SHORT);
                  }}
                >
                  <Text style={{color: 'red', fontWeight: 'bold'}}>Send</Text>
                </TouchableOpacity>
              </View>
              { allprogs.map((programs, index) => (
              <View key={index}>
                <Text style={styles.heading}>{programs.title}</Text>
                <View style={styles.container}>
                    <ScrollView horizontal={true}>
                    { userlist
                    .filter((type) => type.programtype == programs.title )
                    .map((user, index) => (
                        <View key={index}>
                        {/* <PicButton
                            mykey={index.toString()}
                            color='#000000'
                            user={user.firstname}
                            uri={user.urllink}
                            onPress={() => navigation.navigate('Menu', { user: user.userid, type: 'trainer' })}
                        /> */}
                        <TouchableOpacity style={{marginRight: 30}}
                          onPress={() => navigation.navigate('Menu', { user: user.userid, type: 'trainer' })}
                        >
                          <Image 
                            style={{width: 80, height: 80, borderRadius: 50, backgroundColor: "#FFFFFF"}}
                            source={{uri: user.urllink}}
                          />
                          <Text style={{
                            color: "#000000",
                            textAlign: 'center',
                            fontFamily: 'OpenSans_400Regular',
                            fontSize: 16,
                        }}>{user.firstname}</Text>
                        </TouchableOpacity>
                        </View>
                    ))}
                    </ScrollView>
                </View>
              </View>
              ))}
        </ScrollView>
      }
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 100,
    backgroundColor: "transparent",
  },
  container: {
    backgroundColor: "#EBF3F2",
    height: 130,
    borderRadius: 15,
    elevation: 5,
    justifyContent: "flex-start",
    paddingLeft: 20,
    paddingTop: 20,
    marginBottom: 20,
    borderColor: "#000000",
    margin: 3,
    flexDirection: "row",
  },
  heading: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
  reminderBox: {
    width: "100%",
    height: 100,
    borderRadius: 15,
    backgroundColor: "#EBF3F2",
    elevation: 5,
    marginBottom: 10
  },
});
