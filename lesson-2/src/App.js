import React from "react";
import "./App.css";
import { PropsItems } from "./components/BtnPropsItems/PropsItems";
import { SociaButton } from "./components/SocialButtons/SociaButton";
import { FacebookButton } from "./components/SocialButtons/FacebookButton";
import { TwitterButton } from "./components/SocialButtons/TwitterButton";
import { IconBar } from "./components/IconBar/IconBar";
import { Accountant } from "./components/Accountant/Accountant";

const  socials = ["facebook" , "twitter","youtube" , 'pinterest' , 'linkedin' , 'instagram']
const  orientation = ['horizontal' , 'vertical']



class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      btnContent: "facebook",
      iconBarOrientation : 'horizontal'
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
				<div className="first_point">
					<h2>Первый пункт</h2>
					<PropsItems changeProp={this.changeBtn}  propsArr={socials}/>
					<SociaButton type={this.state.btnContent} />
				</div>
				<div className="second_point">
					<h2>Второй пункт</h2>
          <TwitterButton />
          <FacebookButton />
				</div>
				<div className="third_point">
					<h2>Третий пункт</h2>
          <PropsItems changeProp={this.changeOrientation} propsArr={orientation}/>
          <IconBar orientation={this.state.iconBarOrientation} />
				</div>
				<div className="fourth_point">
					<h2>Четверый пункт</h2>
          <Accountant />
				</div>
			</>
		);
	}
}

export default App;
