import React from "react";
import { AccountItem } from "./AccountItem/AccountItem";

class Accountant extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            costItems : [],
            inputValue : '',
            costValue : ''
        };
	}
    onCostChange = (event) => {
        this.setState({...this.state , costValue: event.target.value})
    }
    onInputChange = (event) => {
        this.setState({...this.state , inputValue: event.currentTarget.value})
    }
	addCostItem = () => {
        let item = {
            id : Date.now().toString(),
            cost : this.state.costValue,
            content : this.state.inputValue
        }
        let stateCopy = {...this.state}
        stateCopy.costItems = [...this.state.costItems , item]
        this.setState(stateCopy , () => this.setState({...this.state , inputValue : '',costValue : ''}))
        
    };
    deleteCostItem = (id) => {
        let stateCopy = {...this.state}
        let filtereArr = this.state.costItems.filter( item => item.id !== id)
        stateCopy.costItems = filtereArr
        this.setState(stateCopy)
    }

	render() {
        let renderItems = this.state.costItems.map(item => <AccountItem key={item.id} id={item.id} cost={item.cost} content={item.content} deleteItem={this.deleteCostItem} />) 
		return (
			<div>
				<h3>Карманная Бухгалтерия для самых маленьких</h3>
				<ul>
                    {renderItems}
                </ul>
				<label>
					Сумма, руб.
					<input type="text" required={true}  value={this.state.costValue} onChange={(e) => this.onCostChange(e)} placeholder="сумма расходов" />
				</label>
				<label>
					Описание
					<input type="text" required={true} value={this.state.inputValue} onChange={(e) => this.onInputChange(e)} placeholder="Название статьи расходов" />
				</label>
                <p>ИТОГО </p>
                <button onClick={this.addCostItem}>Добавить</button>
			</div>
		);
	}
}

export {Accountant}