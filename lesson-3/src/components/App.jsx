import React from 'react';
import './App.css';
import { PhoneNumberInput } from './PhoneNumberInput/PhoneNumberInpjut';
import { PayCardManager } from './PayCardManager/PayCardManager';


const countryCode = "+375";
const operatorCode = ["29", "44", "33", "25"];


let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
let setYear = () => {
	let yearArray = [];
	let initialYear = new Date().getFullYear() - 2000;
	for (let i = 0; i <= 10; i++) {
		yearArray.push(initialYear + i);
	}
	return yearArray;
};

function App() {
  return (
    <div className='container' >
      <h1>Первое задание </h1>
      <PhoneNumberInput countryCode={countryCode} operatorCode={operatorCode}/>
      <h1>Второе задание</h1>
      <PayCardManager months={months} setYear={setYear} />
    </div>
  );
}

export default App;
