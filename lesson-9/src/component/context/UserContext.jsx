import React, { useEffect, useState, useContext } from "react";
import { firebaseAuth } from "../../firebaseAPI/firebase";
import { Preloader } from "../common/Preloader/Preloader";

const UserContext = React.createContext();

export const onRegister = async (email, pass) => {
	await firebaseAuth.createUserWithEmailAndPassword(email, pass);
};

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		firebaseAuth.onAuthStateChanged((user) => {
			if (user) {
				setUser({ email: user.email, displayName: user.displayName, id: user.uid });
			}
			setIsLoading(false);
		});

		return () => firebaseAuth.onAuthStateChanged();
	}, []);

	const registration = async (email, pass) => {
		await firebaseAuth.createUserWithEmailAndPassword(email, pass);
	};

	const login = async (email, pass) => {
		await firebaseAuth.signInWithEmailAndPassword(email, pass);
	};

	const logout = async () => {
		setUser(null);
		await firebaseAuth.signOut();
	};

	const updateUser = async ({ updates }) => {
		setUser({ ...user, ...updates });
		await user.updateProfile(updates);
	};

	if (isLoading) {
		return <Preloader />;
	}

	return (
		<UserContext.Provider
			value={{
				user: user,
				login: login,
				registration: registration,
				logout: logout,
				updateUser: updateUser,
			}}
		>
			{children({
				user: user,
				login: login,
				registration: registration,
				logout: logout,
				updateUser: updateUser,
			})}
		</UserContext.Provider>
	);
};

const UserConsumer = UserContext.Consumer;

export const useUserContext = () => useContext(UserContext);

export { UserProvider, UserConsumer };
