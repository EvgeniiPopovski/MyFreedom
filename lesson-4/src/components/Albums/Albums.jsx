import React from "react";
import { getItemsAPI } from "../API/GetItemsAPI";
import { CollectionItem } from "../Users/CollectionItem";

class Albums extends React.Component {
	state = {
		albums: null,
		error: "",
		isLoading: true,
	};

	async componentDidMount() {
		try {
			let albums = await getItemsAPI("albums");
			this.setState({ albums, isLoading: false });
		} catch (error) {
			this.setState({ error, isLoading: false });
		}
	}

	render() {
		if (this.state.isLoading) {
			return <div>...Loading...</div>;
		}
		if (this.state.error) {
			return <div>An Error oquired {this.state.error.name}</div>;
		}
		return (
			<div className='column albums'> 
				<h1 className='header'>Albums</h1>
				{this.state.albums &&
					this.state.albums
						.filter((album) => album.userId === this.props.activeUserId)
						.map((album) => (
							<CollectionItem
								key={album.id}
								name={album.title}
								userId={album.userId}
							/>
						))}
			</div>
		);
	}
}

export { Albums };
