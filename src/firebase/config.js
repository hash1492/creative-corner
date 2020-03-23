import firebase from 'firebase'
import 'firebase/firestore'

var config = {
  apiKey: "AIzaSyCRVzdDQ4W4Q5psqnXJKRiSz8m23USI7zU",
  authDomain: "creative-corner-8ced8.firebaseapp.com",
  databaseURL: "https://creative-corner-8ced8.firebaseio.com",
  projectId: "creative-corner-8ced8",
  storageBucket: "creative-corner-8ced8.appspot.com",
  messagingSenderId: "1065018289602"
};

export const app = firebase.initializeApp(config)
export const firebaseStorage = firebase.storage()
export const firebaseAuth = firebase.auth()
export const productsCollection = firebase.firestore().collection('products')
export const productMessagesCollection = firebase.firestore().collection('productMessages')
