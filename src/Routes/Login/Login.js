import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Glass from "../../Components/Glass/Glass";
import RussButton from "../../Components/RussButton/RussButton";
import russbankApi from "../../Services/russbank.api";
import { Brim } from "../../State/Control";
import "./login.css";

function Login() {
	const [control, setcontrol] = useContext(Brim);

	const history = useHistory();

	const state = useLocation().state;

	const [form, setform] = useState({
		accountNumber: state?.accountNumber,
		password: "",
	});

	const [popup, setpopup] = useState({
		isOpen: true,
		messages: [],
	});

	function updateForm(e, field) {
		setform({
			...form,
			[`${field}`]: e.target.value,
		});
	}

	async function login() {
		setcontrol({ ...control, loading: true });

		const resp = await russbankApi.login(form);

		if (resp.success) {
			setcontrol({ ...control, loading: false });

			const { user } = resp.data;

			history.push({
				pathname: "/home",
				state: {
					firstName: user.owner.first_name,
					lastName: user.owner.last_name,
					accountNumber: user.account_number,
					accountBalance: 0,
				},
			});
		} else {
			setcontrol({
				...control,
				loading: false,
				popup: { isOpen: true, messages: resp.messages },
			});
		}
	}

	return (
		<div className="login">
			<Glass>
				<div className="login_form_field">
					<div className="input_box">
						<div className="form_input_descriptor">Account Number:</div>

						<input
							value={form.accountNumber}
							className="form_input login_input"
							type="number"
							autocomplete="off"
							onChange={(e) => updateForm(e, "accountNumber")}
						/>
					</div>

					<div className="input_box">
						<div className="form_input_descriptor">password:</div>

						<input
							value={form.password}
							className="form_input login_input"
							type="password"
							autocomplete="off"
							onChange={(e) => updateForm(e, "password")}
						/>
					</div>

					<div className="login_row3">
						<RussButton onClick={login} />
					</div>
				</div>
			</Glass>
		</div>
	);
}

export default Login;
