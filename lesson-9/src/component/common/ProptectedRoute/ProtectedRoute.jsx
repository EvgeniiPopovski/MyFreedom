import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";


const ProtectedRoute = (props) => {
	const { user } = useUserContext();
	return (
		<Route path={props.path}>
			{(propsRouter) => (
				user ? (
					props.children
				) : (
					<Redirect exact to={{ pathname: "/login", state: { ref : propsRouter.location.pathname} }} />
				)
            )}
		</Route>
	);
};

export { ProtectedRoute };
