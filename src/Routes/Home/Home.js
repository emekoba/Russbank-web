import "./home.css";
import { useState } from "react";
import "./home.css";
import checkbox from "../../Resources/checkbox.png";
import transfer from "../../Resources/transfer.png";
import deposit from "../../Resources/deposit.png";
import withdraw from "../../Resources/withdraw.png";
import admin from "../../Resources/admin.png";
import bank from "../../Resources/bank.png";
import BankPanel from "./BankPanel/BankPanel";
import AdminPanel from "./AdminPanel/AdminPanel";

function Home({ accountNumber, firstName, lastName }) {
	const [operation, setoperation] = useState({
		withdraw: false,
		transfer: false,
		deposit: true,
		admin: false,
	});

	function adjustOp(e) {
		let ohnoki = operation;

		Object.keys(operation).map((key, _) => {
			ohnoki[key] = key === e.target.id ? true : false;

			return null;
		});

		setoperation({ ...ohnoki });
	}

	Object.filter = (obj, predicate) =>
		Object.keys(obj)
			.filter((key) => predicate(obj[key]))
			.reduce((res, key) => ((res[key] = obj[key]), key), {});

	let gojo = Object.filter(operation, (_Op) => _Op === true);

	return (
		<div className="home">
			<div className="home_left">
				<button onClick={adjustOp} id="deposit" className="home_left_item">
					{operation.deposit && (
						<img alt="" src={checkbox} className="home_item_checkbox" />
					)}
					<img alt="" src={deposit} className="home_item_icons" />
					Deposit
				</button>

				<button onClick={adjustOp} id="withdraw" className="home_left_item">
					{operation.withdraw && (
						<img alt="" src={checkbox} className="home_item_checkbox" />
					)}
					<img alt="" src={withdraw} className="home_item_icons" />
					Withdraw
				</button>

				<button onClick={adjustOp} id="transfer" className="home_left_item">
					{operation.transfer && (
						<img alt="" src={checkbox} className="home_item_checkbox" />
					)}
					<img alt="" src={transfer} className="home_item_icons" />
					Transfer
				</button>

				<button onClick={adjustOp} id="admin" className="home_left_item">
					{operation.admin && (
						<img alt="" src={checkbox} className="home_item_checkbox" />
					)}
					<img alt="" src={admin} className="home_item_icons" />
					Admin
				</button>

				<div className="admin_btn">
					<div></div>
				</div>
			</div>

			<div className="home_right">
				<div className="home_right_item_row1">
					<img alt="" src={bank} className="home_item_icons" />

					<div className="acct_no">{accountNumber}09076607130</div>
				</div>

				{operation.admin ? (
					<AdminPanel />
				) : (
					<BankPanel
						Op={gojo}
						firstName={firstName}
						lastName={lastName}
						accountNumber={accountNumber}
					/>
				)}
			</div>
		</div>
	);
}

export default Home;
