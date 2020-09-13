import React from "react";
import "./App.css";
import { BrowserRouter} from "react-router-dom";

import { UserProvider } from "./component/context/UserContext";
import { AwesomeAccountant } from "./AwesomeAccountant";


function App() {
	return (
		<BrowserRouter >
			<UserProvider >
				{() => <AwesomeAccountant />}
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
