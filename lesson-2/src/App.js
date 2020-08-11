import React from "react";
import "./App.css";
import { PropsItems } from "./components/BtnPropsItems/PropsItems";
import { SociaButton } from "./components/SocialButtons/SociaButton";
import { FacebookButton } from "./components/SocialButtons/FacebookButton";
import { TwitterButton } from "./components/SocialButtons/TwitterButton";
import { IconBar } from "./components/IconBar/IconBar";
import { Accountant } from "./components/Accountant/Accountant";
import { NavBar } from "./components/NavBar/NavBar";

const socials = ["facebook", "twitter", "youtube", "pinterest", "linkedin", "instagram"];
const orientation = ["horizontal", "vertical"];

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			btnContent: "facebook",
			iconBarOrientation: "horizontal",
		};
	}

	changeBtn = (value) => {
		this.setState({ btnContent: value });
	};
	changeOrientation = (value) => {
		this.setState({ iconBarOrientation: value });
	};

	render() {
		return (
			<>
				<div className="first point">
					<h1>Первый пункт</h1>
					<PropsItems changeProp={this.changeBtn} propsArr={socials} />
					<SociaButton type={this.state.btnContent} />
				</div>
				<div className="second point">
					<h1>Второй пункт</h1>
					<TwitterButton>
						<SociaButton type={'twitter'}/>
					</TwitterButton>
					<FacebookButton>
						<SociaButton type={'facebook'}/>
					</FacebookButton>
					
				</div>
				<div className="third point">
					<h1>Третий пункт</h1>
					<PropsItems
						changeProp={this.changeOrientation}
						propsArr={orientation}
					/>
					<IconBar orientation={this.state.iconBarOrientation} />
				</div>
				<div className="fourth point">
					<h1>Четверый пункт</h1>
					<Accountant />
				</div>
				<div className="fifth point">
					<h1>Пятый пункт</h1>
					<NavBar items={['Home','Search', 'About' ]} initialActiveItemId='Home' />
				</div>
			</>
		);
	}
}

export default App;
