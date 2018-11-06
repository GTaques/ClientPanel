import { createStore, combineReducers, compose } from 'redux';  
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
//Reducers
// @todo

const firebaseConfig = {
    apiKey: "AIzaSyBoikVPxG4PzE_TSXsZtfA_pzCE7JZNjvY",
    authDomain: "reactpainel.firebaseapp.com",
    databaseURL: "https://reactpainel.firebaseio.com",
    projectId: "reactpainel",
    storageBucket: "reactpainel.appspot.com",
    messagingSenderId: "1089408643131"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

//Init firebase instance
firebase.initializeApp(firebaseConfig);
//Init firestore
// const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
});

//Create initial state 
const initialState = {};

//Create store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default  store;
