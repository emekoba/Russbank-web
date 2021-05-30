import "./home.css";
import { useEffect, useState } from "react";
import "./home.css";
import checkbox from "../../Resources/checkbox.png";
import transfer from "../../Resources/transfer.png";
import deposit from "../../Resources/deposit.png";
import withdraw from "../../Resources/withdraw.png";
import admin from "../../Resources/admin.png";
import history from "../../Resources/history.png";
import bank from "../../Resources/bank.png";
import BankPanel from "./BankPanel/BankPanel";
import AdminPanel from "./AdminPanel/AdminPanel";
import russbankApi from "../../Services/russbank.api";
import { useLocation } from "react-router";
import Glass from "../../Components/Glass/Glass";
import HistoryPanel from "./HistoryPanel/HistoryPanel";
import { useMediaQuery } from "@react-hook/media-query";

function Home() {
	const [operation, setoperation] = useState({
		withdraw: false,
		transfer: false,
		deposit: true,
		admin: false,
		history: false,
	});

	const [isprocessing, setisprocessing] = useState(false);

	const { accountNumber, accountBalance, firstName, lastName, userRole } =
		useLocation().state;

	const [home, sethome] = useState({
		balance: accountBalance,
	});

	const matches = useMediaQuery("only screen and (min-width: 400px)");

	useEffect(() => {});

	function adjustOp(e) {
		if (!isprocessing) {
			let ohnoki = operation;

			Object.keys(operation).map((key, _) => {
				ohnoki[key] = key === e.target.id ? true : false;

				return null;
			});

			setoperation({ ...ohnoki });
		}
	}

	Object.filter = (obj, predicate) =>
		Object.keys(obj)
			.filter((key) => predicate(obj[key]))
			.reduce((res, key) => ((res[key] = obj[key]), key), {});

	let gojo = Object.filter(operation, (_Op) => _Op === true);

	const _glass_styles = {
		// width: 200,
		// display: "grid",
		// placeItems: "center",
		width: matches ? "95%" : 500,
		height: "100%",
	};

	return (
		<div className="home">
			<div className="home_left">
				<button onClick={adjustOp} id="deposit" className="home_left_item">
					<span onClick={(e) => (e.target.id = "deposit")}>
						{operation.deposit && (
							<img alt="" src={checkbox} className="home_item_checkbox" />
						)}
						<img alt="" src={deposit} className="home_item_icons" />
						Deposit
					</span>
				</button>

				<button onClick={adjustOp} id="withdraw" className="home_left_item">
					<span onClick={(e) => (e.target.id = "withdraw")}>
						{operation.withdraw && (
							<img alt="" src={checkbox} className="home_item_checkbox" />
						)}
						<img alt="" src={withdraw} className="home_item_icons" />
						Withdraw
					</span>
				</button>

				<button onClick={adjustOp} id="transfer" className="home_left_item">
					<span onClick={(e) => (e.target.id = "transfer")}>
						{operation.transfer && (
							<img alt="" src={checkbox} className="home_item_checkbox" />
						)}
						<img alt="" src={transfer} className="home_item_icons" />
						Transfer
					</span>
				</button>

				{userRole === "ADMIN" && (
					<button onClick={adjustOp} id="admin" className="home_left_item">
						<span onClick={(e) => (e.target.id = "admin")}>
							{operation.admin && (
								<img alt="" src={checkbox} className="home_item_checkbox" />
							)}
							<img alt="" src={admin} className="home_item_icons" />
							Admin
						</span>
					</button>
				)}

				<button onClick={adjustOp} id="history" className="home_left_item">
					<span onClick={(e) => (e.target.id = "history")}>
						{operation.history && (
							<img alt="" src={checkbox} className="home_item_checkbox" />
						)}
						<img alt="" src={history} className="home_item_icons" />
						History
					</span>
				</button>
			</div>

			<Glass styles={_glass_styles}>
				<div className="home_right">
					<div className="home_right_item_row1">
						<div style={{ display: "flex", alignItems: "center" }}>
							<img alt="" src={bank} className="home_item_icons" />

							<div className="acct_no">{accountNumber}</div>
						</div>

						<div className="acct_balance">
							<span>N</span>
							<span>{home.balance}</span>
						</div>
					</div>

					{operation.admin ? (
						<AdminPanel />
					) : operation.history ? (
						<HistoryPanel
							Op={gojo}
							firstName={firstName}
							lastName={lastName}
							isprocessing={isprocessing}
							setisprocessing={setisprocessing}
							home={home}
							sethome={sethome}
						/>
					) : (
						<BankPanel
							Op={gojo}
							firstName={firstName}
							lastName={lastName}
							isprocessing={isprocessing}
							setisprocessing={setisprocessing}
							home={home}
							sethome={sethome}
						/>
					)}
				</div>
			</Glass>
		</div>
	);
}

export default Home;
