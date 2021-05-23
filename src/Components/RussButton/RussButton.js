import React from "react";
import submit from "../../Resources/submit.png";
import Tilt from "react-tilt";
import "./russbutton.css";

export default function RussButton({ onClick }) {
	return (
		<Tilt
			className="Tilt"
			options={{ max: 25 }}
			style={{ height: 100, width: 100 }}
		>
			<button className="russbutton" onClick={onClick}>
				<div className="Tilt-inner">
					<img alt="submit" className="submit" src={submit} />
				</div>
			</button>
		</Tilt>
	);
}
