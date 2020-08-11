import React from "react";
import { AccountItem } from "./AccountItem/AccountItem";

class Accountant extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			costItems: [],
			inputValue: "",
			costValue: "",
		};
	}
	componentDidMount() {
		let items = localStorage.getItem('items')
		this.setState({costItems : JSON.parse(items)})
	}

	onCostChange = (event) => {
		this.setState({ ...this.state, costValue: event.target.value });
	};
	onInputChange = (event) => {
		this.setState({ ...this.state, inputValue: event.currentTarget.value });
	};
	addCostItem = () => {
		let item = {
			id: Date.now().toString(),
			cost: Number(this.state.costValue),
			content: this.state.inputValue,
		};
		let stateCopy = { ...this.state };
		stateCopy.costItems = [...this.state.costItems, item];
		this.setState(stateCopy, () =>
			this.setState({ ...this.state, inputValue: "", costValue: "" }, () => localStorage.setItem('items' , JSON.stringify(this.state.costItems)))
		);
		
	};
	deleteCostItem = (id) => {
		let stateCopy = { ...this.state };
		let filtereArr = this.state.costItems.filter((item) => item.id !== id);
		stateCopy.costItems = filtereArr;
		this.setState(stateCopy , () => localStorage.setItem('items' , JSON.stringify(this.state.costItems)));
	};

	render() {
		let renderItems = this.state.costItems.map((item) => (
			<AccountItem
				key={item.id}
				id={item.id}
				cost={item.cost}
				content={item.content}
				deleteItem={this.deleteCostItem}
			/>
        ));
        let sum = 0;
        for(let i = 0; i < this.state.costItems.length; i++) {
            sum +=  Number(this.state.costItems[i].cost)
        }
        
		return (
			<div>
				<h3>Карманная Бухгалтерия для самых маленьких</h3>
				<ul className='accountant'>{renderItems}</ul>
				<label>
					Сумма, руб.
					<input
						type="text"
						required={true}
						value={this.state.costValue}
						onChange={(e) => this.onCostChange(e)}
						placeholder="сумма расходов"
					/>
				</label>
				<label>
					Описание
					<input
						type="text"
						required={true}
						value={this.state.inputValue}
						onChange={(e) => this.onInputChange(e)}
						placeholder="Название статьи расходов"
					/>
				</label>
				<p>
					ИТОГО <span> {sum} </span>
				</p>
				<button disabled={!this.state.inputValue || !this.state.costValue} onClick={this.addCostItem}>Добавить</button>
			</div>
		);
	}
}

export { Accountant };
