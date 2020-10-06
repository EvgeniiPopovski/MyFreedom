import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";
import "./UserPreview.scss";
import downArrow from "./../../icons/arrow-ios-downward-outline.svg";
import upArrow from "./../../icons/arrow-ios-upward-outline.svg";
import { Button } from "../common/Button/Button";

const UserPreview = ({ user, logout }) => {
	const [showDropDown, setShowDropDown] = useState(false);

	return (
		<div className="user-preview">
			{user.photoURL && (
				<img
					className="user-preview__avatar"
					src={user.photoURL}
					alt="User pisture"
				/>
			)}
			<div className="user-preview__user-name">
				Hello
				<p
					className="user-name"
					onClick={() => {
						setShowDropDown(!showDropDown);
					}}
				>
					{user.displayName || user.email}
					<img
						width="20px"
						className="dropdown-arrow"
						src={showDropDown ? upArrow : downArrow}
						alt="dropdown-arrow"
					/>
				</p>
			</div>

			
				<Transition in={showDropDown} timeout={100} appear unmountOnExit>
					{(state) => (
					<div className={`dropdown-menu ${state}`}>
							<ul className="dropdown-menu__list list">
								{user.photoURL && (
									<li className="dropdown-menu__listItems">
										<img
											className="dropdown-menu__avatar"
											src={user.photoURL}
											alt="user avatar"
										/>
									</li>
								)}

								<li className="dropdown-menu__listItems">
									<Link to={`/userProfile/${user.uid}`}>Profile</Link>
								</li>
								<li className="dropdown-menu__listItems">
									<Link to={`/settings`}>Setings</Link>
								</li>
								<li className="dropdown-menu__listItems">
									<Button onClick={logout}>Logout</Button>
								</li>
							</ul>
						</div>
					)}
				</Transition>
		</div>
	);
};

export { UserPreview };
