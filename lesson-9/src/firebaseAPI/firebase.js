import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyD0Bnc8c7PJwDw9McL_91Vn-tubHIVWBdE",
    authDomain: "myawsomeaccountant.firebaseapp.com",
    databaseURL: "https://myawsomeaccountant.firebaseio.com",
    projectId: "myawsomeaccountant",
    storageBucket: "myawsomeaccountant.appspot.com",
    messagingSenderId: "749651765726",
    appId: "1:749651765726:web:23bcd81a96bb243bdd954f"
};

firebase.initializeApp(firebaseConfig)

const fireDB = firebase.firestore()

export let docToObject = (doc) => {
    return {
        id: doc.id,
        ...doc.data(),
    };
};

export const getFirebaseData = (collectionName, setState , setError) => {
    fireDB
        .collection(collectionName)
        .get()
        .then((collection) => setState(collection.docs.map(docToObject)))
        .catch((e)=> setError(`Error Occuired : ${e.message}`))
};

export const deleteItems = (itemId, collectionName, setState, state , setError) => {
    fireDB
        .collection(collectionName)
        .doc(itemId)
        .delete()
        .then(setState(state.filter((item) => itemId !== item.id)))
        .catch((e) => setError(`Error Occuired : ${e.message}`))
};

export const addItems = (objWithNewData, category, setState, state , setError) => {
    fireDB
        .collection(category)
        .add({
            ...objWithNewData
        })
        .then((docRef) => setState([...state, { id: docRef.id, ...objWithNewData }]))
        .catch((e) => setError(`Error Occuired : ${e.message}`))
};

export const editItems = (newDataObj, collectionName, docId, setState, state , setError) => {
    fireDB.collection(collectionName).doc(docId).update({
        ...newDataObj
    })
    .catch((e) => setError(`Error Occuired : ${e.message}`))
    let obj = state.find((item) => docId === item.id);
    let index = state.indexOf(obj);
    setState([
        ...state.slice(0, index),
        { id: docId, ...newDataObj},
        ...state.slice(index + 1),
    ])
    
};



export { fireDB }

