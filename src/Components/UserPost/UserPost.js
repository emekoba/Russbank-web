import React from "react";
import "./userpost.css";
import bin from "../../Resources/bin.png";
import Loader from "../Loader/Loader";
import Glass from "../Glass/Glass";

export default function UserPost({
	id,
	firstName,
	lastName,
	email,
	accountNumber,
	amount,
	userRole,
	address,
	key,
	onDelete,
	deleting,
}) {
	const _glass_styles = { padding: "20px" };

	return (
		<div className="userpost" key={key} id={id}>
			<Glass styles={_glass_styles}>
				<div style={{ flex: 1 }}>
					<div className="userpost_row">
						{firstName} {lastName}
					</div>

					<div className="userpost_row">{email}</div>

					<div className="userpost_row">{accountNumber}</div>

					<div className="userpost_row">{address}</div>

					<div
						className="userpost_row center"
						style={{
							fontWeight: "bolder",
							color: userRole === "ADMIN" ? "limegreen" : "tomato",
							fontSize: 20,
							letterSpacing: 2,
						}}
					>
						{userRole}
					</div>

					<div className="userpost_row" style={{ fontSize: 20 }}>
						<span style={{ color: "white", marginRight: 8 }}>N</span> {amount}
					</div>
				</div>
				<div>
					{deleting.inProgress && deleting.id === id ? (
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							<Loader
								variant="grid"
								size={10}
								isloading={deleting.inProgress}
							/>
						</div>
					) : (
						<button className="userpost_btn" onClick={() => onDelete(id)}>
							<img src={bin} alt="" style={{ width: 40 }} />
						</button>
					)}
				</div>
			</Glass>
		</div>
	);
}
