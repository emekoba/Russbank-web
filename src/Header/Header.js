import React from "react";
import { useHistory, useLocation } from "react-router";
import "./header.css";
import Logo from "./Logo/Logo";

function Header() {
	const pathName = useLocation().pathname;

	const history = useHistory();

	function changeRoute(page) {
		history.push(`/${page}`);
	}

	function logout() {
		history.push("/login");
	}

	return (
		<div className="header">
			<Logo />

			<div className="header_text"></div>

			<div>
				{(pathName === "/login" || pathName === "/") && (
					<button className="nav_btn" onClick={() => changeRoute("register")}>
						sign up
					</button>
				)}

				{pathName === "/register" && (
					<button className="nav_btn" onClick={() => changeRoute("signout")}>
						sign in
					</button>
				)}

				{pathName === "/home" && (
					<button className="nav_btn" onClick={logout}>
						sign out
					</button>
				)}
			</div>
		</div>
	);
}

export default Header;
