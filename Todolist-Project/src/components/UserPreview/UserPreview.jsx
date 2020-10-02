import React from "react";

const UserPreview = ({ user ,logout  }) => {
	return (
		<div>
			<b>Hello {user.displayName || user.email}</b>
			<button onClick={logout}>logout</button>
		</div>
	);
};

export { UserPreview };
