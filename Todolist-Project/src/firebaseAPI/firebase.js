import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyBJG0FHazrx1QEx6Mm-xCHWSXKPsOfHCdo",
	authDomain: "todolist-project-63a28.firebaseapp.com",
	databaseURL: "https://todolist-project-63a28.firebaseio.com",
	projectId: "todolist-project-63a28",
	storageBucket: "todolist-project-63a28.appspot.com",
	messagingSenderId: "295618072805",
	appId: "1:295618072805:web:b620346e4290491ce1c40c",
};

firebase.initializeApp(firebaseConfig);

const fireDB = firebase.firestore();
const auth = firebase.auth();

const firestoreAPI = {
	getData: async (collectionName, userId) => {
		let response = await fireDB
			.collection(collectionName)
			.where("userId", "==", userId);
		console.log(userId);
		let collection = await response.get();
		return collection;
	},
	addItem: async (collectionName, obj) => {
		let response = await fireDB.collection(collectionName).add({
			...obj,
		});
		let responseObj = await (await response.get()).data();
		let newObj = { id: response.id, ...responseObj };
		return newObj;
	},
	updateItem: async (collectionName, docId, obj) => {
		let response = await fireDB
			.collection(collectionName)
			.doc(docId)
			.update({
				...obj,
			});
		return response;
	},
	deleteItem: async (collectionName, itemId) => {
		let response = await fireDB.collection(collectionName).doc(itemId).delete();
		return response;
	},
	killProject: async (collectionName, projectId) => {
		let response = await (
			await (
				await fireDB
					.collection(collectionName)
					.where("projectId", "==", projectId)
			).get()
		).docs.forEach(
			async (docum) =>
				await fireDB.collection(collectionName).doc(docum.id).delete()
		);

		return response;
	},
};

const fireAuth = {
	register: async (email, password) => {
		let response = await auth.createUserWithEmailAndPassword(email, password);
		return response;
	},
	login: async (email, password) => {
		let response = await auth.signInWithEmailAndPassword(email, password);
		return response;
	},
	logout: async () => await auth.signOut(),

	signInWithGoogle: async () => {
		// firebase.auth().languageCode = "en";
		const provider = new firebase.auth.GoogleAuthProvider();
		const result = await auth.signInWithPopup(provider);
		const token = await result.credential.accessToken
		const user = result.user
		return user
	},
};

export { firestoreAPI, fireAuth, auth };
