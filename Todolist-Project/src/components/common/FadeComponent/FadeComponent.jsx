import React from "react";
import { Transition } from "react-transition-group";

const FadeComponent = ({ inProp, timeout, children , className}) => {
	const defaultStyle = {
		transition: `opacity ${timeout}ms ease-in-out`,
		opacity: 0,
	};

	const transitionStyles = {
		entering: { opacity: 0 },
		entered: { opacity: 1 },
		exiting: { opacity: 1 },
		exited: { opacity: 0 },
	};
	return (
		<Transition in={inProp}  timeout={timeout} appear unmountOnExit>
			{(state) => (
				<div className={className}  style={{ ...defaultStyle, ...transitionStyles[state] }}>
					{children}
				</div>
			)}
		</Transition>
	);
};

export { FadeComponent };
