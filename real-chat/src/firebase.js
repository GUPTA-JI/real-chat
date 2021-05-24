
import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyD_5mQyBxQjvM9ZofAVYJeQYq0qqjwVQwI",
    authDomain: "real-chat-c2e71.firebaseapp.com",
    databaseURL: "https://real-chat-c2e71.firebaseio.com",
    projectId: "real-chat-c2e71",
    storageBucket: "real-chat-c2e71.appspot.com",
    messagingSenderId: "40841037904",
    appId: "1:40841037904:web:5c3515488aaa56ff94a955",
    measurementId: "G-860EER28VL"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()
  
  export {auth ,provider}
  export default db