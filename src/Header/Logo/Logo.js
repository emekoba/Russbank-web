import React from "react";
import "./logo.css";
import Tilt from "react-tilt";
import russbank from "../../Resources/russbank.png";

function Logo() {
	return (
		<Tilt
			className="Tilt"
			options={{ max: 25 }}
			style={{ height: 100, width: 100 }}
		>
			<div className="logo">
				<div className="Tilt-inner">
					<img alt="russbank" src={russbank} />
				</div>
			</div>
		</Tilt>
	);
}

export default Logo;
