import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { BackButton, PicButton } from "../components/LongButton";
import firebase from '../database';
import Loading from "../components/Loading";

export default function UserList({ navigation, route }) {

  const data = route.params.data;

  const [userlist, setUserlist] = useState([]);
  const [imagelink, setImagelinks] = useState([]);
  const [allprogs, setProgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [unverif, setUnverif] = useState([]);

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

    // firebase
    //   .storage()
    //   .ref("uploads/)
    //   .getDownloadURL()
    //   .then((url) => {
    //     try {
    //       setImagelink(url);
    //       isNoimage(false);
    //       setLoading(false);
    //     } catch (err) {
    //       isNoimage(true);
    //     }
    //   })
    //   .catch((error) => {});
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
              { allprogs.map((programs, index) => (
              <View key={index}>
                <Text style={styles.heading}>{programs.title}</Text>
                <View style={styles.container}>
                    <ScrollView horizontal={true}>
                    { userlist
                    .filter((type) => type.programtype == programs.title )
                    .map((user, index) => (
                        <View key={index}>
                        <PicButton
                            mykey={index.toString()}
                            color='#000000'
                            user={user.firstname}
                            source={user.imagelink}
                            onPress={() => navigation.navigate('Menu', { user: user.userid, type: 'trainer' })}
                        />
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
});
