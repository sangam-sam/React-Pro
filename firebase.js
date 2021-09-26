// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEoHiou8zoRZoc0ceoIgJbnDnDsWzjd1A",
    authDomain: "amigo-c197b.firebaseapp.com",
    projectId: "amigo-c197b",
    storageBucket: "amigo-c197b.appspot.com",
    messagingSenderId: "121344604785",
    appId: "1:121344604785:web:ed7e9a8857c2332353b9d0",
    measurementId: "G-47M5R6VHDZ"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;