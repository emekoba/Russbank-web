import React, { useEffect, useContext, useState } from "react";
import TransactionPost from "../../../Components/TransactionPost/TransactionPost";
import russbankApi from "../../../Services/russbank.api";
import { Brim } from "../../../State/Control";
import "./historypanel.css";

export default function HistoryPanel() {
	const [control, setcontrol] = useContext(Brim);

	const [transactions, settransactions] = useState({});

	useEffect(() => {
		(async () => {
			let bertholdt = {};

			setcontrol({ ...control, loading: true });

			const resp = await russbankApi.getTransactions();

			if (resp.success) {
				setcontrol({ ...control, loading: false });

				resp.data.transactions.map((e) => {
					bertholdt[e._id] = {
						amount: e.amount,
						type: e.type,
						recipient: e.recipient,
						sender: e.sender,
						date: e.updatedAt,
					};
				});
			} else {
				setcontrol({
					...control,
					loading: false,
					popup: { isOpen: true, messages: resp.messages },
				});
			}

			settransactions(bertholdt);
		})();
	}, []);

	return (
		<div className="historypanel">
			{Object.keys(transactions).map((key, _) => (
				<TransactionPost
					key={key}
					amount={transactions[key].amount}
					type={transactions[key].type}
					recipient={transactions[key].recipient}
					date={transactions[key].date}
				/>
			))}
		</div>
	);
}
