import React from "react";
import clsn from "classnames";

class PhoneNumberInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneInput: "",
			errorMessage: "",
		};
	}

	doPhoneValidation = (phoneNumber) => {
		for (let i = 0; i < this.props.operatorCode.length; i++) {
			let validator = this.props.countryCode + this.props.operatorCode[i];
			if (phoneNumber.includes(validator)) {
				this.setState((state) => ({ ...state, errorMessage: "" }));
				break;
			} else {
				this.setState((state) => ({
					...state,
					errorMessage: "Phone number format is incorrect",
				}));
			}
		}
	};

	changeNumber = (event) => {
		this.setState({ ...this.state, phoneInput: event.target.value }, () => {
			this.state.phoneInput.length >= 6 &&
				this.doPhoneValidation(this.state.phoneInput);
		});
	};

	render() {
		return (
			<div className="wrapper first_point">
				<h4>Phone number input</h4>
				<label>
					Phone number
					<input
						className={clsn({
							phone_input : true,
							"input__error": this.state.errorMessage,
						})}
						onChange={(event) => {
							this.changeNumber(event);
						}}
						value={this.state.phoneInput}
						type="text"
						maxLength="13"
						placeholder="+375 (__) _______ "
					/>
				</label>
				<div className={clsn({
					"error" : this.state.errorMessage
				})}> {this.state.errorMessage} </div>
			</div>
		);
	}
}

export { PhoneNumberInput };
