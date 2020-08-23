import React from "react";
import { CollectionItem } from "./CollectionItem";
import { getItemsAPI } from "../API/GetItemsAPI";

class UsersCollection extends React.Component {
	state = {
		users: null,
		isLoading: true,
		error: "",
	};

	async componentDidMount() {
		try {
			let users = await getItemsAPI("users");
			this.setState({ users, isLoading: false });
			this.props.changeActiveUser(this.state.users[0].id);
		} catch (error) {
			this.setState({ error, isLoading: false } , () => console.log(this.state.error));
		}
	}

	render() {
		if (this.state.isLoading) {
			return <div>...Loading...</div>;
		}
		if (this.state.error) {
			return <div> An Error oquired{this.state.error.name}</div>;
		}
		return (
			<div className='column users'>
				<h1 className='header'>Users</h1>
				{this.state.users &&
					this.state.users.map((user) => (
						<CollectionItem
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
