import React from 'react'
import { getItemsAPI } from '../API/GetItemsAPI';



class Albums extends React.Component {
    state ={ 
        albums : null,
        errors : '',
        isLoading : true,
    }

    async componentDidMount () {
        try {
			let albums = await getItemsAPI("albums");
			this.setState({ albums , isLoading: false } , () => console.log(this.state.albums));
		} catch (error) {
			this.setState({ error, isLoading: false });
		}
    }

    render () {
        return (
            <div>
                
            </div>
        )
    }
}

export {Albums}