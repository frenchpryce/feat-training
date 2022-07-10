import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  Text,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import { BackButton, TextButton } from "../components/LongButton";
import { AlertModal } from "../components/Modals";
import { ArticleBox } from "../components/Article";
import firebase from "../database";
import Loading from "../components/Loading";
import { useIsFocused } from "@react-navigation/native";

export default function UserProfile({ navigation, route }) {
  const user = route.params.user;
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
  const [verifdays, setVerifdays] = useState();
  const isFocused = useIsFocused();
  const month = new Date().getMonth();
  const date = new Date().getDate();
  const year = new Date().getFullYear();

  const getSubData = () => {
    firebase
      .firestore()
      .collection("Users")
      .doc(user)
      .get()
      .then((snap) => {
        let date1 = new Date(year, month, date);
        console.log(date1);
        let now = new Date(snap.data().startdate);
        console.log(now);
        let diffInTime = now.getTime() - date1.getTime();
        let diffInDays = diffInTime / (1000* 3600 * 24);

        let expday = Math.round(diffInDays+30);
        if(diffInDays <= -31 && snap.data().programtype == "Free User"){
          firebase
            .firestore()
            .collection("Users")
            .doc(user)
            .update({
              status: "Unverified"
            })
          Alert.alert(
            "Free Trial Expired",
            "Thank you for Choosing FEAT training, your 30 days trial has ended. To continue enjoying all of our FEAT programs,",
            [
              {
                text: "Click Here",
                onPress: () => {
                  navigation.navigate("Subscription", { user: user });
                }
              },
            ]
          );
        }

        if(diffInDays <= -24){
          Alert.alert(
            "Free Trial about to expire: " + expday + " days",
            "Your Free Trial is about to expire, contact your coach to enjoy more of our FEAT Programs. We are excited to continue guiding you in your FEATness Journey.",
            [
              {
                text: "Click Here",
                onPress: () => {
                  navigation.navigate("Subscription", { user: user });
                }
              },
              {
                text: "Back",
                style: "cancel"
              }
            ]
          );
        }
      })
  }

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setLoading(true);
    wait(3000).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    if (isFocused) {
      getSubData();
      getData();
      getArticles();
      getReminders();
      setRefreshing(false);
    }
  }, [isFocused, refreshing]);

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
        if (snap.data().status == "Unverified") {
          setVerif(true);
        } else {
          setVerif(false);
        }
        setLoading(false);
      });

    firebase
      .storage()
      .ref("uploads/" + user + ".jpg")
      .getDownloadURL()
      .then((url) => {
        try {
          setImagelink(url);
          isNoimage(false);
          setLoading(false);
        } catch (err) {
          isNoimage(true);
        }
      })
      .catch((error) => {});
  };

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
  };

  const getReminders = () => {
    firebase
      .firestore()
      .collection("Reminders")
      .doc(user)
      .get()
      .then((snap) => {
        setReminder(snap.data().foryou);
        console.log(reminder);
      },[])
  }

  return (
    <ImageBackground
      source={require("../assets/bg4.png")}
      resizeMode="cover"
      style={{
        flex: 1,
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          style={{ backgroundColor: "#FFFFFF" }}
          renderToHardwareTextureAndroid
          shouldRasterizeIOS
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
                  source={
                    noimage
                      ? require("../assets/noPic.png")
                      : { uri: imagelink }
                  }
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
            <View
              style={{
                position: "absolute",
                bottom: 10,
                left: 40,
              }}
            >
              <TextButton
                title="Edit"
                color="#000000"
                onPress={() =>
                  navigation.navigate("EditPage", { user: user })
                }
              />
            </View>
            <View
              style={{
                position: "absolute",
                flexDirection: "row",
                bottom: 10,
                right: 40,
              }}
            >
              <TextButton
                color="#FF6F61"
                title="Choose Program"
                marginRight={15}
                onPress={() => {
                  navigation.navigate('Subscription', { user: user })
                }}
              />
              <TextButton
                color="#37877D"
                title="Logout"
                onPress={() => {
                  Alert.alert(
                    "Logging out",
                    "Are you sure you want to logout?",
                    [
                      {
                        text: "Yes",
                        onPress: () => {
                          navigation.navigate("MainScreen");
                        },
                      },
                      {
                        text: "No",
                        style: "cancel",
                      },
                    ]
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.view}>
            <Text style={styles.heading}>Reminders</Text>
            <View style={styles.reminderBox}>
              <Text style={styles.textstyle}>{reminder}</Text>
            </View>
            <Text style={styles.heading}>Latest Articles</Text>
            {articles.map((artcle, index) => (
              <ArticleBox
                key={index}
                source={artcle.image}
                title={artcle.title}
                body={artcle.body}
                onPress={() => {
                  navigation.navigate("ArticleScreen", { artcle: artcle })
                }}
              />
            ))}
          </View>
        </ScrollView>
      )}
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
    padding: 20
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
  textstyle: {
    fontSize: 13,
    color: "#000000",
    fontFamily: "Poppins_300Light",
  },
});
