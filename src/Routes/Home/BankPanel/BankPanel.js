import React, { useContext, useState } from "react";
import "./bankpanel.css";
import bank from "../../../Resources/bank.png";
import { Brim } from "../../../State/Control";
import russbankApi from "../../../Services/russbank.api";
import { Chart } from "react-charts";
import RussButton from "../../../Components/RussButton/RussButton";

export default function BankPanel({ Op, accountNumber }) {
	const [control, setcontrol] = useContext(Brim);

	const [form, setform] = useState({
		sender: "",
		recipient: "",
		amount: "",
		account_number: "",
	});

	function updateForm(e, field) {
		setform({
			...form,
			[`${field}`]: e.target.value,
		});
	}

	async function go() {
		setcontrol({ ...control, loading: true });

		const resp =
			Op === "transfer"
				? await russbankApi.transfer(form)
				: await russbankApi.transfer(form);

		setcontrol({ ...control, loading: false });

		console.log(resp);
	}

	const data = React.useMemo(
		() => [
			{
				label: "Series 1",
				data: [
					[0, 1],
					[1, 2],
					[2, 4],
					[3, 2],
					[4, 7],
				],
			},
			{
				label: "Series 2",
				data: [
					[0, 3],
					[1, 1],
					[2, 5],
					[3, 6],
					[4, 4],
				],
			},
		],
		[]
	);

	const axes = React.useMemo(
		() => [
			{ primary: true, type: "linear", position: "bottom" },
			{ type: "linear", position: "left" },
		],
		[]
	);

	return (
		<>
			<div className="bank_panel_item_row2">
				<div>
					<div className="bank_input_row">
						<div>account number:</div>
						<input
							style={{ width: 180 }}
							value={form.account_number}
							className="form_input"
							type="number"
							autocomplete="off"
							onChange={(e) => updateForm(e, "account_number")}
						/>
					</div>

					<div className="bank_input_row">
						<div>amount</div>
						<input
							style={{ width: 80 }}
							value={form.amount}
							className="form_input"
							type="number"
							autocomplete="off"
							onChange={(e) => updateForm(e, "amount")}
						/>
					</div>
				</div>

				<div style={{ display: "grid", placeItems: "center" }}>
					<RussButton onClick={go} />
				</div>
			</div>

			<div
				style={{
					width: "100%",
					display: "grid",
					justifyContent: "center",
				}}
			>
				<div className="charts">
					<Chart data={data} axes={axes} type="bubble" />
				</div>
			</div>

			<div className="bank_panel_item_row1">
				<div className="acct_no">{accountNumber}Russell J Emekoba</div>
			</div>
		</>
	);
}
