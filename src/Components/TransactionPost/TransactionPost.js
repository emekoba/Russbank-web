import React from "react";
import Glass from "../Glass/Glass";
import "./transactionpost.css";

export default function TransactionPost({ amount, type, recipient, date }) {
	return (
		<Glass styles={{ borderRadius: 5 }}>
			<div className="transaction_post">
				<div className="transaction_row transaction_type">{type}</div>
				<div className="transaction_row">recipient: {recipient}</div>
				<div className="transaction_row">Date: {date}</div>
				<div className="transaction_row transaction_amount">
					amount:
					<span style={{ color: "white", marginRight: 8, marginLeft: 8 }}>
						N
					</span>
					{amount}
				</div>
			</div>
		</Glass>
	);
}
