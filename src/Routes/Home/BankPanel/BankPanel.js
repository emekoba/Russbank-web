import React, { useContext, useState } from "react";
import "./bankpanel.css";
import bank from "../../../Resources/bank.png";
import { Brim } from "../../../State/Control";
import russbankApi from "../../../Services/russbank.api";
import { Chart } from "react-charts";
import RussButton from "../../../Components/RussButton/RussButton";
import Loader from "../../../Components/Loader/Loader";

export default function BankPanel({
	isprocessing,
	setisprocessing,
	Op,
	firstName,
	lastName,
	home,
	sethome,
}) {
	const [control, setcontrol] = useContext(Brim);

	const [form, setform] = useState({
		sender: "",
		recipient: "",
		amount: "",
		amount_empty: false,
	});

	function updateForm(e, field) {
		if (!form.amount_empty && field === "amount") {
			setform({ ...form, amount_empty: false });
		}

		if (!isprocessing) {
			setform({
				...form,
				[`${field}`]: e.target.value,
			});
		}
	}

	async function go() {
		if (form.amount === "") {
			setform({ ...form, amount_empty: true });
		}

		if (form.amount !== "") {
			setisprocessing(true);

			const resp =
				Op === "deposit"
					? await russbankApi.deposit(form)
					: Op === "withdraw"
					? await russbankApi.withdraw(form)
					: Op === "transfer"
					? await russbankApi.transfer(form)
					: { success: false, error: "Invalid Operation" };

			if (resp.success) {
				setisprocessing(false);

				setform({ ...form, amount: "" });

				sethome({ ...home, balance: resp.data.account.balance });
			} else {
				setisprocessing(false);

				setcontrol({
					...control,
					loading: false,
					popup: { isOpen: true, messages: resp.messages },
				});
			}
		}
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
					{Op === "transfer" && (
						<div className="bank_input_row" style={{ marginBottom: 25 }}>
							<div>recipient:</div>
							<input
								style={{ width: 180 }}
								value={form.recipient}
								className="form_input"
								type="number"
								autoComplete="off"
								onChange={(e) => updateForm(e, "recipient")}
							/>
						</div>
					)}

					<div className="bank_input_row">
						<div>amount:</div>
						<input
							style={{
								width: 80,
								// background:
								// 	form.amount === "" && form.amount_empty ? "tomato" : "none",
								animation:
									form.amount === "" && form.amount_empty
										? "flash 1s infinite"
										: "none",
							}}
							value={form.amount}
							onFocus={() => setform({ ...form, amount_empty: false })}
							className="form_input"
							type="number"
							autoComplete="off"
							onChange={(e) => updateForm(e, "amount")}
						/>
					</div>
				</div>

				<div style={{ display: "grid", placeItems: "center" }}>
					{isprocessing ? (
						<Loader variant="scale" size={30} isloading={isprocessing} />
					) : (
						<RussButton
							bounce={form.amount === "" ? false : true}
							onClick={go}
						/>
					)}
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
				<div className="acct_no">
					{firstName} {lastName}
				</div>
			</div>
		</>
	);
}
