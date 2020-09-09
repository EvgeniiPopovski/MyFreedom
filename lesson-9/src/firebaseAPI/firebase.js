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

export const getFirebaseData = async (collectionName) => {
    let response = await fireDB.collection(collectionName)
    let collection = await response.get()
    return collection
};

export const deleteItems = async (itemId, collectionName) => {
    let response =  fireDB.collection(collectionName)
    let doc =  response.doc(itemId)
    await doc.delete()
};

export const addItems = async  (objWithNewData, category) => {
    let response =  fireDB.collection(category)
    let ref =  await response.add({
            ...objWithNewData
        })
        return ref
};

export const editItems = async (newDataObj, collectionName, docId) => {
    let collection = await fireDB.collection(collectionName)
    let doc = await collection.doc(docId)
    await doc.update({
        ...newDataObj
    })
};



export { fireDB }

