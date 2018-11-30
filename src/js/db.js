// Initialize Firebase
const config = {
  apiKey: "AIzaSyDognQWyGDSG4nuAAQsddwCJK1kHLFRWbQ",
  authDomain: "airports-psllc.firebaseapp.com",
  databaseURL: "https://airports-psllc.firebaseio.com",
  projectId: "airports-psllc",
  storageBucket: "airports-psllc.appspot.com",
  messagingSenderId: "54962740346"
};
firebase.initializeApp(config)
const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true
})
var fbAuth = firebase.auth()
var fbUser = null
var fbUserAirports = db.collection('UserAirports')
var fbUserCams = db.collection('UserCams')