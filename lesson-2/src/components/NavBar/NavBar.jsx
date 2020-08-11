import React from "react";

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: this.props.items,
			initialActiveItemId: this.props.initialActiveItemId,
		};
    }
    
    changeActiveItem = (event) => {
        if (event.target.id !== this.state.initialActiveItemId) {
            console.log( event.target.textContent , this.props.initialActiveItemId)
            this.setState({initialActiveItemId: event.target.textContent} , () => console.log(this.state))
        }
    }

	render() {
        let navBarItems = this.state.items.map(item => <span onClick={(event) => this.changeActiveItem(event)} id={item}  key={item} className={item === this.state.initialActiveItemId  ? 'active' : null} >{item}</span>) 
		return <div className="icon-bar horizontal">
            {navBarItems}
        </div>;
	}
}

export { NavBar };
