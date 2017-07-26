import * as firebase from 'firebase';

const fbConfig = {
  apiKey: "AIzaSyBgGQBuZPUWGLjosH9s-ZeX_6QL61PeEHE",
  authDomain: "rtcchat-b6efd.firebaseapp.com",
  databaseURL: "https://rtcchat-b6efd.firebaseio.com",
  projectId: "rtcchat-b6efd",
  storageBucket: "rtcchat-b6efd.appspot.com",
  messagingSenderId: "451643725027"
};
var fbConnection = firebase.initializeApp(fbConfig);
export default fbConnection;
