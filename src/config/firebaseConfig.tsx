import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import  ReactNativeAsyncStorage  from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBwTLsv8O4LQwuqExq86KkSDDK2ZmlUdaA",
  authDomain: "tiendapcgamer-20274.firebaseapp.com",
  projectId: "tiendapcgamer-20274",
  storageBucket: "tiendapcgamer-20274.appspot.com",
  messagingSenderId: "734301377251",
  appId: "1:734301377251:web:60b7be1a671e1e6326abd6",
  databaseURL:"https://tiendapcgamer-20274-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Realtime Database and get a reference to the service
export const dbRealTime = getDatabase(firebase);