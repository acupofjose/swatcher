import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

import { getRandomReadableString } from "./util";

var firebaseConfig = {
  apiKey: "AIzaSyCI6k9tVs9BRBb1ILSqnMCW_MLke7Kbh1c",
  authDomain: "swatcher-app.firebaseapp.com",
  databaseURL: "https://swatcher-app.firebaseio.com",
  projectId: "swatcher-app",
  storageBucket: "swatcher-app.appspot.com",
  messagingSenderId: "130889170160",
  appId: "1:130889170160:web:1584e26d45f16f0d685635"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const swatchCollection = firebase.firestore().collection("swatches");

export const SavePalette = async (name, colors) => {
  const key = getRandomReadableString();
  console.log(colors);
  try {
    await swatchCollection.add({
      key,
      name,
      colors
    });
    return key;
  } catch (err) {
    console.error(err);
  }
};

export const GetPalette = async key => {
  try {
    const result = await swatchCollection.where("key", "==", key).get();
    return result ? result.docs[0] : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
