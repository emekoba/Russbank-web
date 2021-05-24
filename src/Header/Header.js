import React from "react";
import "./header.css";
import Logo from "./Logo/Logo";

function Header({ route, changeRoute }) {
	function onRouteChange() {
		{
			switch (route) {
				case "home":
					changeRoute("login");
					break;

				case "register":
					changeRoute("login");
					break;

				case "login":
					changeRoute("register");
					break;

				default:
					break;
			}
		}
	}

	return (
		<div className="header">
			<Logo />

			<div className="header_text"></div>

			<div>
				<button className="nav_btn" onClick={onRouteChange}>
					{route === "home"
						? "sign out"
						: route === "register"
						? "login"
						: "register"}
				</button>
			</div>
		</div>
	);
}

export default Header;
