import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBgGQBuZPUWGLjosH9s-ZeX_6QL61PeEHE",
  authDomain: "rtcchat-b6efd.firebaseapp.com",
  databaseURL: "https://rtcchat-b6efd.firebaseio.com",
  projectId: "rtcchat-b6efd",
  storageBucket: "rtcchat-b6efd.appspot.com",
  messagingSenderId: "451643725027"
};
var fire = firebase.initializeApp(config);
var auth = firebase.auth();
var fbdb = firebase.database().ref();
var convo = fbdb.child('convo');
var messaging = firebase.messaging();
var fb = { fire, auth, fbdb, convo, messaging }
export default fb;
