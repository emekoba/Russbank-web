import React from "react";
import "./header.css";
import Logo from "./Logo/Logo";

function Header({ route, changeRoute }) {
	return (
		<div className="header">
			<Logo />

			<div className="header_text"></div>

			<div>
				<button className="nav_btn" onClick={changeRoute}>
					{route === "home" ? "sign out" : "register"}
				</button>
			</div>
		</div>
	);
}

export default Header;
