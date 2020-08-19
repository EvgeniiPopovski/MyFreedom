import React from "react";
import { User } from "./User";
import { getItemsAPI } from "../API/GetItemsAPI";

class UsersCollection extends React.Component {
	state = {
		users: null,
		isLoading: true,
		errors: "",
	};

	async componentDidMount() {
		try {
			let users = await getItemsAPI("users");
			this.setState({ users, isLoading: false });
		} catch (error) {
			this.setState({ error, isLoading: false });
		}
	}

	render() {
		if (this.state.isLoading) {
			return <div>...Loading...</div>;
		}
		if (this.state.errors) {
			return <div>{this.state.errors}</div>;
		}
		return (
			<div>
				{this.state.users &&
					this.state.users.map((user) => (
						<User
							key={user.id}
							name={user.name}
							userId={user.id}
							activeUserId={this.props.activeUserId}
							changeActiveUser={this.props.changeActiveUser}
						/>
					))}
			</div>
		);
	}
}

export { UsersCollection };
