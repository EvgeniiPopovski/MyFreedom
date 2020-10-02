import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UserPreview.scss";
const UserPreview = ({ user, logout }) => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className="user-preview">
			{user.photoURL && (
				<img
					className="user-preview__avatar"
					src={user.photoURL}
					alt="User pisture"
				/>
			)}
			<p className="user-preview__user-name">
				Hello
				<span
					onClick={() => {
						setShowMenu(!showMenu);
					}}
				>
					{user.displayName || user.email} &#709;
				</span>
			</p>

			{showMenu && (
				<div className="dropdown-menu">
					<ul >
						<li>
							<Link to={`/userProfile/${user.uid}`}>Profile</Link>
						</li>
						<li>
							<Link to={`/settings`}>Setings</Link>
						</li>
						<li>
							<button onClick={logout}>Logout</button>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export { UserPreview };
