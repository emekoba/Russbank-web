import React, { useContext, useState } from "react";
import RussButton from "../../Components/RussButton/RussButton";
import "./register.css";
import russbankApi from "../../Services/russbank.api";
import { Brim } from "../../State/Control";

function Register({ changeRoute }) {
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

		console.log(resp);

		if (resp.success) {
			changeRoute("home", resp);
		}
	}

	return (
		<div className="register">
			<form className="form_field" autocomplete="off">
				<div className="left_field">
					<div className="left_field_col1">
						<div className="input_box">
							<div className="form_input_descriptor">firstname:</div>
							<input
								value={form.firstName}
								className="form_input"
								type="text"
								autocomplete="off"
								onChange={(e) => updateForm(e, "firstName")}
							/>
						</div>

						<div className="input_box">
							<div className="form_input_descriptor">lastname:</div>
							<input
								value={form.lastName}
								className="form_input"
								type="text"
								autocomplete="off"
								onChange={(e) => updateForm(e, "lastName")}
							/>
						</div>

						<div className="input_box">
							<div className="form_input_descriptor">phone number:</div>
							<input
								value={form.phoneNumber}
								className="form_input"
								type="number"
								autocomplete="off"
								onChange={(e) => updateForm(e, "phoneNumber")}
							/>
						</div>

						<div className="input_box">
							<div className="form_input_descriptor">email:</div>
							<input
								value={form.email}
								className="form_input"
								type="email"
								autocomplete="off"
								onChange={(e) => updateForm(e, "email")}
							/>
						</div>

						<div className="input_box">
							<div className="form_input_descriptor">address:</div>
							<input
								value={form.address}
								className="form_input"
								type="text"
								autocomplete="off"
								onChange={(e) => updateForm(e, "address")}
							/>
						</div>

						<div className="input_box">
							<div className="form_input_descriptor">password:</div>
							<input
								value={form.password}
								className="form_input"
								type="password"
								autocomplete="off"
								onChange={(e) => updateForm(e, "password")}
							/>
						</div>

						<div className="input_box">
							<div className="form_input_descriptor">confirm password:</div>
							<input
								value={form.cpassword}
								className="form_input"
								type="password"
								autocomplete="off"
								onChange={(e) => updateForm(e, "cpassword")}
							/>
						</div>
					</div>

					<div className="left_field_col2"></div>
				</div>

				<div className="divider"></div>

				<div className="right_field">
					<div>
						<input
							checked={form.userRole === "ADMIN" ? true : false}
							onChange={() => updateForm("", "userRole")}
							className="checkbox"
							type="checkbox"
							autocomplete="off"
						/>
					</div>

					<RussButton variant="submit" onClick={submit} />
				</div>
			</form>
		</div>
	);
}

export default Register;
