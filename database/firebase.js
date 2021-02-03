import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCFg91UbqVclER8WPAfoFuJNNcIG8PWFko",
    authDomain: "react-native-crud-e182e.firebaseapp.com",
    projectId: "react-native-crud-e182e",
    storageBucket: "react-native-crud-e182e.appspot.com",
    messagingSenderId: "815874860893",
    appId: "1:815874860893:web:2e7b280ba755712521eab4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();
  export default {
      firebase,
      db,

  };