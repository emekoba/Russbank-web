import React, { useContext, useState } from "react";
import RussButton from "../../Components/RussButton/RussButton";
import "./register.css";
import russbankApi from "../../Services/russbank.api";
import { Brim } from "../../State/Control";
import { useHistory } from "react-router";
import Glass from "../../Components/Glass/Glass";

function Register() {
	const [control, setcontrol] = useContext(Brim);

	const [form, setform] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		address: "",
		password: "",
		cpassword: "",
		userRole: "NORMAL",
	});

	const history = useHistory();

	function updateForm(e, field) {
		setform((p) => ({
			...form,
			[`${field}`]:
				field === "userRole"
					? p.userRole === "ADMIN"
						? "NORMAL"
						: "ADMIN"
					: e.target.value,
		}));
	}

	async function submit(e) {
		e.preventDefault();

		setcontrol({ ...control, loading: true });

		const resp = await russbankApi.register(form);

		setcontrol({ ...control, loading: false });

		if (resp.success) {
			history.push({
				pathname: "/login",
				state: {
					accountNumber: form.phoneNumber,
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

	const _glass_styles = {
		borderRadius: 10,
	};

	return (
		<div className="register">
			<form className="form_field" autoComplete="off">
				<Glass styles={_glass_styles}>
					<div className="left_field">
						<div className="input_box">
							<div className="form_input_descriptor">firstname:</div>
							<input
								value={form.firstName}
								className="form_input"
								type="text"
								autoComplete="off"
								onChange={(e) => updateForm(e, "firstName")}
							/>
						</div>

						<div className="input_box">
							<div className="form_input_descriptor">lastname:</div>
							<input
								value={form.lastName}
								className="form_input"
								type="text"
								autoComplete="off"
								onChange={(e) => updateForm(e, "lastName")}
							/>
						</div>

						<div className="input_box">
							<div className="form_input_descriptor">phone number:</div>
							<input
								value={form.phoneNumber}
								className="form_input"
								type="number"
								autoComplete="off"
								onChange={(e) => updateForm(e, "phoneNumber")}
							/>
						</div>

						<div className="input_box">
							<div className="form_input_descriptor">email:</div>
							<input
								value={form.email}
								className="form_input"
								type="email"
								autoComplete="off"
								onChange={(e) => updateForm(e, "email")}
							/>
						</div>

						<div className="input_box">
							<div className="form_input_descriptor">address:</div>
							<input
								value={form.address}
								className="form_input"
								type="text"
								autoComplete="off"
								onChange={(e) => updateForm(e, "address")}
							/>
						</div>

						<div className="input_box">
							<div className="form_input_descriptor">password:</div>
							<input
								value={form.password}
								className="form_input"
								type="password"
								autoComplete="off"
								onChange={(e) => updateForm(e, "password")}
							/>
						</div>

						<div className="input_box">
							<div className="form_input_descriptor">confirm password:</div>
							<input
								value={form.cpassword}
								className="form_input"
								type="password"
								autoComplete="off"
								onChange={(e) => updateForm(e, "cpassword")}
							/>
						</div>
					</div>
					<div className="right_field">
						<div>
							<input
								checked={form.userRole === "ADMIN" ? true : false}
								onChange={() => updateForm("", "userRole")}
								className="checkbox"
								type="checkbox"
								autoComplete="off"
							/>
						</div>

						<RussButton variant="submit" onClick={submit} />
					</div>
				</Glass>
				{/* <div className="divider"></div>

				<Glass styles={_right_glass_styles}>
					<div className="right_field">
						<div>
							<input
								checked={form.userRole === "ADMIN" ? true : false}
								onChange={() => updateForm("", "userRole")}
								className="checkbox"
								type="checkbox"
								autoComplete="off"
							/>
						</div>

						<RussButton variant="submit" onClick={submit} />
					</div>
				</Glass> */}
			</form>
		</div>
	);
}

export default Register;
