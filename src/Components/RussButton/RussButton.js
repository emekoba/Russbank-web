import React from "react";
import submit from "../../Resources/submit.png";
import Tilt from "react-tilt";
import "./russbutton.css";

export default function RussButton({ bounce, onClick }) {
	const _x = {
		// russ_button: {
		// 	transition: bounce ? "0.1s ease-in-out" : "none",
		// 	animation: bounce ? "0.1s ease-in-out" : "none",
		// },
	};

	return (
		<Tilt
			className="Tilt"
			options={{ max: 25 }}
			style={{ height: 100, width: 100 }}
		>
			<button className="russbutton" style={_x.russ_button} onClick={onClick}>
				<div className="Tilt-inner">
					<img alt="submit" className="submit" src={submit} />
				</div>
			</button>
		</Tilt>
	);
}
