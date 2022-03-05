import * as firebasedb from "firebase";
import "firebase/firestore";

const app = firebasedb.initializeApp({
    apiKey: "AIzaSyDmuUc8x3PpRzkpJq417HtXKGzPW_Q2dgE",
    authDomain: "feat-db-default-rtdb.asia-southeast1.firebasedatabase.app",
    databaseURL: "https://feat-db-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "feat-db",
    storageBucket: 'feat-db.appspot.com',
    appId: "1:76918616939:android:e03ae4a250419d2f77d22e"
});

export const firebase = app.firestore();
export default app;