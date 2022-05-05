import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Text,
  ScrollView,
  ImageBackground,
  ToastAndroid
} from "react-native";
import { BackButton, TextButton } from "../components/LongButton";
import { AlertModal } from "../components/Modals";
import { ArticleBox } from "../components/Article";
import firebase from '../database';
import Loading from "../components/Loading";
import { useIsFocused } from '@react-navigation/native';

export default function UserProfile2({ navigation, route }) {

  const user = route.params.user;
  const [logout, isLogout] = useState(false);
  // const [modalVis, setModalVis] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [goal, setGoal] = useState();
  const [balance, setBalance] = useState();
  const [imagelink, setImagelink] = useState('');
  const [loading, setLoading] = useState(true);
  // const [reminder, setReminder] = useState('');
  const [verif, setVerif] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [noimage, isNoimage] = useState(true);
  const [articles, setArticles] = useState([]);
  const [reminder, setReminder] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused) {
      getData();
      getArticles();
      setRefreshing(false);
    }
  }, [isFocused, refreshing]);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setLoading(true);
    wait(3000).then(() => setRefreshing(false));
  },[refreshing])

  const getData = () => {
    firebase
      .firestore()
      .collection("Users")
      .doc(user)
      .get()
      .then((snap) => {
        setName(snap.data().firstname + " " + snap.data().lastname);
        setEmail(snap.data().email);
        setHeight(snap.data().height);
        setWeight(snap.data().weight);
        setGoal(snap.data().goal);
        setBalance(snap.data().payment.balance);
        if(snap.data().status == 'Unverified') {
          setVerif(true);
        } else {
          setVerif(false);
        }
        setLoading(false);
      });

    firebase
      .storage()
      .ref('uploads/' + user + '.jpg')
      .getDownloadURL()
      .then((url) => {
        try{
          setImagelink(url);
          isNoimage(false);
          setLoading(false);
        } catch(err) {
          isNoimage(true);
        }
      })
      .catch((error)=>{})
  }

  const getArticles = () => {
    let articles = [];
      firebase
        .firestore()
        .collection("Articles")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            articles.push(doc.data());
          });
          setArticles(articles);
        });
    }
  
  const sendReminder = () => {
    firebase
      .firestore()
      .collection("Reminders")
      .doc(user)
      .set({
        foryou: reminder
      });
  }

  return (
    <ImageBackground
    source={require("../assets/bg4.png")}
    resizeMode="cover"
    style={{
      flex: 1,
    }}
    >
      { loading ? <Loading/> : 
      <ScrollView style={{ backgroundColor: "#FFFFFF" }}
        renderToHardwareTextureAndroid
        shouldRasterizeIOS
        refreshControl={
          <RefreshControl 
          refreshing={refreshing}
          onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.card}>
          <Image
            style={{
              position: "absolute",
              top: -100,
              left: 0,
              right: 0,
            }}
            source={require("../assets/wave.png")}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                marginRight: 40,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                }}
              >
                <BackButton onPress={() => navigation.goBack()} />
              </View>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: "#37877D",
                  marginTop: -20,
                }}
                source={ noimage ? require('../assets/noPic.png') : { uri: imagelink } }
              />
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "flex-start",
                marginTop: 30,
                marginBottom: 20,
              }}
            >
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.email}>{email}</Text>
              <Text style={styles.email}>Balance: {balance}</Text>
            </View>
          </View>
        </View>
        <View style={styles.view}>
          <Text style={styles.heading}>Reminders</Text>
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
              onPress={() => {
                sendReminder();
                setReminder("");
                ToastAndroid.show("Reminder has been sent!", ToastAndroid.SHORT);
              }}
            >
              <Text style={{color: 'red', fontWeight: 'bold'}}>Send</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.heading}>Latest Articles</Text>
          {articles.map((artcle, index) => (
            <ArticleBox key={index} source={artcle.image} title={artcle.title} body={artcle.body}/>
          ))}
        </View>
      </ScrollView>
      }
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
    backgroundColor: "#FFFFFF",
  },
  card: {
    flex: 1,
    height: 240,
    width: "100%",
    backgroundColor: "#EBF3F2",
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  heading: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    marginTop: 20,
  },
  reminderBox: {
    width: "100%",
    height: 100,
    borderRadius: 15,
    backgroundColor: "#EBF3F2",
    elevation: 5,
  },
  articleBox: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    backgroundColor: "#EBF3F2",
    marginTop: 10,
    elevation: 5,
  },
  name: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  email: {
    fontFamily: "Poppins_300Light",
    fontSize: 13,
  },
});
