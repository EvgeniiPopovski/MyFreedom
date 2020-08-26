import React from 'react';
import { withLocalStorage } from "./HOC/withLocalStorage.jsx";
import {Input} from './components/Input.jsx'

let WithLocalStorageInput = withLocalStorage(Input , '123' , 'text' , 'Первый инпут');
let WithLocalStorageNumbers = withLocalStorage(Input ,  '10' , 'numbers' , "Второй инпут")

class  App extends React.Component {
  render ( ) {  return (
    <>
      <WithLocalStorageInput />
      <WithLocalStorageNumbers />
    </>
  );
  }
}

export {App};
