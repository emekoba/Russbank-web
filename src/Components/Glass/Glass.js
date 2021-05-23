import React from "react";
import "./glass.css";

export default function Glass({ children, height, width }) {
	const _x = {
		background: "white",
		width: width ?? "100%",
		height: height ?? "100%",
	};

	return (
		<div style={_x.glass} className="glass">
			{children}
		</div>
	);
}
