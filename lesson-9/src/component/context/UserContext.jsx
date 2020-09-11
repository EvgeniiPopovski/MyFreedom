import React, { useEffect, useState, useContext } from "react";
import { firebaseAuth } from "../../firebaseAPI/firebase";
import { Preloader } from "../common/Preloader/Preloader";

const UserContext = React.createContext();

export const onRegister = async (email, pass) => {
	let resonse = await firebaseAuth.createUserWithEmailAndPassword(email, pass);
	console.log(resonse);
};

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		try {
			firebaseAuth.onAuthStateChanged((user) => {
				if (user) {
					setUser({ email: user.email , displayName : user.displayName , id : user.uid });
				}
				setIsLoading(false);
			});
		} catch (e) {
			setError(`Error : ${e.message}`);
		}
		return () => firebaseAuth.onAuthStateChanged();
	}, []);

	const registration = async (email, pass) => {
        try {
            await firebaseAuth.createUserWithEmailAndPassword(email, pass);
        }catch (e) {
            return setError(`Error : ${e.message}`)
        }
		
	};

	const login = async (email, pass) => {
		await firebaseAuth.signInWithEmailAndPassword(email, pass);
	};

	const logout = async () => {
        setUser(null)
        await firebaseAuth.signOut();
	};

	const updateUser = async ({ updates }) => {
        setUser({ ...user, ...updates });
        await user.updateProfile(updates);
		
	};

	if (isLoading) {
		return <Preloader />;
	}
	if (error) {
		return <div>{error}</div>;
	}

	return (
		<UserContext.Provider
			value={{
				user: user,
				login: login,
				registration: registration,
				logout: logout,
                updateUser: updateUser,
                error : error
			}}
		>
			{children({
				user: user,
				login: login,
				registration: registration,
				logout: logout,
                updateUser: updateUser,
                error : error
			})}
		</UserContext.Provider>
	);
};

const UserConsumer = UserContext.Consumer;

export const useUserContext = () => useContext(UserContext);

export { UserProvider, UserConsumer };
