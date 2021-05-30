import React from "react";
import { useHistory, useLocation } from "react-router";
import "./header.css";
import Tilt from "react-tilt";
import russbank from "../Resources/russbank.png";

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
			<Tilt className="Tilt" options={{ max: 25 }}>
				<div className="logo">
					<div className="Tilt-inner">
						<img alt="russbank" src={russbank} />
					</div>
				</div>

				<div className="nav_btn_container">
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
			</Tilt>
		</div>
	);
}

export default Header;
