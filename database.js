import * as firebasedb from "firebase";
import "firebase/firestore";

const app = firebasedb.initializeApp({
    apiKey: "AIzaSyBvvP393UV4AtaFP0CRIMAu6zsprNVE8DI",
    authDomain: "feat-training-bycarla-default-rtdb.asia-southeast1.firebasedatabase.app",
    databaseURL: "https://feat-training-bycarla-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "feat-training-bycarla",
    storageBucket: 'gs://feat-training-bycarla.appspot.com',
    appId: "1:401679842000:android:0e01908994640d15147cd5"
});

export const firebase = app.firestore();
export default app;