import React from "react";
import clns from "classnames";
import "./../App.css";

class PayCardManager extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			savedCards: [],
			cardInformation: {
				cardNumber: "",
				cardHolderName: "",
				cardValidity: {
					month: this.props.months[0],
					year: this.props.setYear()[0],
				},
				CVV: "",
			},
			errors: {
				cardNumber: "",
				cardHolderName: "",
				CVV: "",
			},
			suggestions: {
				cardNumber: "Card's number length should be 16 numbers",
				cardHolderName: "Cardholder name should be whritten in Latin alphabeth",
				CVV: "CVV code should contain only numbers and have 3 or 4 symbols",
			},
		};
	}

	changeNumber = (e) => {
		let cardnumber = e.target.value;
		let stateCopy = { ...this.state };
		stateCopy.cardInformation = { ...this.state.cardInformation };
		stateCopy.cardInformation.cardNumber = cardnumber;
		this.setState(stateCopy);
	};
	changeCardHolderName = (e) => {
		let holderName = e.target.value;
		let stateCopy = { ...this.state };
		stateCopy.cardInformation = { ...this.state.cardInformation };
		stateCopy.cardInformation.cardHolderName = holderName;
		this.setState(stateCopy);
	};
	changeMonth = (e) => {
		let month = e.target.value;
		let stateCopy = { ...this.state };
		stateCopy.cardInformation = { ...this.state.cardInformation };
		stateCopy.cardInformation.cardValidity = {
			...this.state.cardInformation.cardValidity,
		};
		stateCopy.cardInformation.cardValidity.month = month;
		this.setState(stateCopy, () => console.log(this.state));
	};
	changeYear = (e) => {
		let year = e.target.value;
		let stateCopy = { ...this.state };
		stateCopy.cardInformation = { ...this.state.cardInformation };
		stateCopy.cardInformation.cardValidity = {
			...this.state.cardInformation.cardValidity,
		};
		stateCopy.cardInformation.cardValidity.year = year;
		this.setState(stateCopy, () => console.log(this.state));
	};
	changeCVV = (e) => {
		let cvv = e.target.value;
		let stateCopy = { ...this.state };
		stateCopy.cardInformation = { ...this.state.cardInformation };
		stateCopy.cardInformation.CVV = cvv;
		this.setState(stateCopy);
	};

	validateCardnumber = () => {
		let number = this.state.cardInformation.cardNumber;
		if (number.length !== 16) {
			this.setState((state) => ({
				...state,
				errors: { ...state.errors, cardNumber: "Card number is incorrect" },
			}));
		}
		for (let i = 0; i < number.length; i++) {
			if (number[i] >= "0" && number[i] <= "9") {
				this.setState((state) => ({
					...state,
					errors: { ...state.errors, cardNumber: "" },
				}));
			} else {
				this.setState((state) => ({
					...state,
					errors: { ...state.errors, cardNumber: "Card number is incorrect" },
				}));
			}
		}
	};

	validateCardHolderName = () => {
		let holderNamme = this.state.cardInformation.cardHolderName;
		holderNamme = holderNamme.split(" ");
		holderNamme = holderNamme.reduce((acc, value) => acc + value);
		if (holderNamme.length === 0) {
			this.setState((state) => ({
				...state,
				errors: { ...state.errors, cardHolderName: "Fill in cardHolder Name" },
			}));
		}
		for (let i = 0; i < holderNamme.length; i++) {
			if (
				(holderNamme[i] >= "A" && holderNamme[i] <= "Z") ||
				(holderNamme[i] >= "a" && holderNamme[i] <= "z") ||
				holderNamme[i] === " "
			) {
				this.setState((state) => ({
					...state,
					errors: { ...state.errors, cardHolderName: "" },
				}));
			} else {
				this.setState((state) => ({
					...state,
					errors: {
						...state.errors,
						cardHolderName: "Cardholder name is incorrect",
					},
				}));
			}
		}
	};
	validateCVV = () => {
		let CVV = this.state.cardInformation.CVV;
		if (CVV.length >= 3) {
			for (let i = 0; i < CVV.length; i++) {
				if (CVV[i] >= "0" && CVV[i] <= "9") {
					this.setState((state) => ({
						...state,
						errors: { ...state.errors, CVV: "" },
					}));
				} else {
					this.setState((state) => ({
						...state,
						errors: { ...state.errors, CVV: "CVV is incorrect" },
					}));
				}
			}
		} else {
			this.setState((state) => ({
				...state,
				errors: { ...state.errors, CVV: "CVV is incorrect" },
			}));
		}
	};

	validateForm = () => {
		this.validateCVV();
		this.validateCardHolderName();
		this.validateCardnumber();
	};

	render() {
		return (
			<div className="wrapper">
				<form className="wrapper" onSubmit={(e) => e.preventDefault()}>
					<div className="columns">
						<div className="payment_card fist">
							<div className="row bank_name">BANK NAME</div>
							<div className="row">
								<div className="card_input cardNumber">
									<label htmlFor="cardNumber">Card Number</label>
									<input
										className={clns({
											input_cardNumber: true,
											input__error: this.state.errors.cardNumber,
										})}
										name="cardNumber"
										onChange={(e) => this.changeNumber(e)}
										value={this.state.cardInformation.cardNumber}
										placeholder="0000 0000 0000 0000"
										type="text"
										maxLength="16"
									/>
									<p
										className={clns({
											error: this.state.errors.cardNumber,
										})}
									>
										{this.state.errors.cardNumber}
									</p>
								</div>
							</div>

							<div className="row selects">
								<div className="column">
									<label htmlFor="month">month/year</label>
									<select name="month" onChange={(e) => this.changeMonth(e)}>
										{this.props.months.map((month) => (
											<option key={month} value={month}>
												{month}
											</option>
										))}
									</select>
									<select onChange={(e) => this.changeYear(e)}>
										{this.props.setYear().map((year) => (
											<option key={year} value={year}>
												{year}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className="row cardHolder">
								<input
									className={clns({
										input_cardHolder: true,
										input__error: this.state.errors.cardHolderName,
									})}
									onChange={(e) => this.changeCardHolderName(e)}
									value={this.state.cardInformation.cardHolderName.toUpperCase()}
									type="text"
									placeholder="CARDHOLDER NAME"
								/>
								<p
									className={clns({
										error: this.state.errors.cardHolderName,
									})}
								>
									{this.state.errors.cardHolderName}
								</p>
							</div>
						</div>
						<div className="payment_card second">
							<div className="row CVV">
								<label htmlFor="CVV">CVV code </label>
								<input
									className={clns({
										input_CVV: true,
										input__error: this.state.errors.CVV,
									})}
									name="CVV"
									onChange={(e) => this.changeCVV(e)}
									value={this.state.cardInformation.cardHolderNames}
									type="text"
									maxLength="4"
									placeholder="000"
								/>
								<p
									className={clns({
										error: this.state.errors.CVV,
									})}
								>
									{this.state.errors.CVV}
								</p>
							</div>
						</div>
					</div>
					<ul>
						<li className={clns({
							hidden : !this.state.errors.cardNumber,
							suggestion : true
						})}>{this.state.suggestions.cardNumber}</li>
						<li className={clns({
							hidden : !this.state.errors.cardHolderName,
							suggestion : true
						})}>{this.state.suggestions.cardHolderName}</li>
						<li className={clns({
							hidden : !this.state.errors.CVV,
							suggestion : true
						})}>{this.state.suggestions.CVV}</li>
					</ul>
					<button
						onClick={() => {
							this.validateCardHolderName()
							this.validateCardnumber()
							this.validateCVV();
							// ! Внимение, ниже костыльный костыль
							setTimeout(()=> {!this.state.errors.CVV && !this.state.errors.cardHolderName && !this.state.errors.cardNumber && alert("Card Added!!")} , 100)
						}}
					>
						Add Card
					</button>
				</form>
			</div>
		);
	}
}

export { PayCardManager };
