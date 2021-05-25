import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import russbankApi from "../../Services/russbank.api";
import "./login.css";

function Login() {
	const history = useHistory();

	const state = useLocation().state;

	const [form, setform] = useState({
		accountNumber: state.phoneNumber,
		password: "",
	});

	function login() {
		const resp = russbankApi.login(form);

		console.log(resp);

		if (resp.success) {
			// history.pushState({
			// 	pathname: "/home",
			// 	state: {
			// 		firstName: state.firstName,
			// 		lastName: state.lastName,
			// 		accountNumber: form.accountNumber,
			// 		accountBalance: 0,
			// 	},
			// });
		}
	}
	return (
		<div className="login">
			<div className="form_field"></div>
		</div>
	);
}

export default Login;
