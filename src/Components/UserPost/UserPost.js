import React from "react";
import "./userpost.css";
import bin from "../../Resources/bin.png";

export default function UserPost({
	id,
	firstName,
	lastName,
	email,
	accountNumber,
	amount,
	transactions,
	userRole,
	address,
	key,
	onDelete,
}) {
	return (
		<div className="userpost" key={key} id={id}>
			<div style={{ flex: 1 }}>
				<div className="userpost_row">{firstName}</div>

				<div className="userpost_row">{lastName}</div>

				<div className="userpost_row">{email}</div>

				<div className="userpost_row">{accountNumber}</div>

				<div className="userpost_row">{address}</div>

				<div className="userpost_row">{userRole}</div>

				<div className="userpost_row" style={{ fontSize: 20 }}>
					N{amount}
				</div>
			</div>

			<div>
				<button className="userpost_btn" onClick={() => onDelete(id)}>
					<img src={bin} alt="" style={{ width: 40 }} />
				</button>
			</div>
		</div>
	);
}
