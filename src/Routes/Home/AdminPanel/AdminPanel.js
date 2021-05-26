import React, { useContext, useEffect, useState } from "react";
import UserPost from "../../../Components/UserPost/UserPost";
import russbankApi from "../../../Services/russbank.api";
import { Brim } from "../../../State/Control";
import Loader from "../../../Components/Loader/Loader";
import "./adminpanel.css";

export default function AdminPanel() {
	const [users, setusers] = useState({});

	const [control, setcontrol] = useContext(Brim);

	const [isloading, setisloading] = useState(false);

	const [deleting, setdeleting] = useState({
		inProgress: true,
		id: "",
	});

	useEffect(() => {
		(async () => {
			let onyankonpon = {};

			setisloading(true);

			const resp = await russbankApi.getAllUsers();

			setisloading(false);

			if (resp.success) {
				console.log(resp);

				resp.data.users.map((e) => {
					onyankonpon[e.accountNumber] = {
						userRole: e.user.role,
						firstName: e.user.firstName,
						lastName: e.user.lastName,
						accountNumber: e.accountNumber,
						address: e.user.address,
						email: e.user.email,
						key: e.user.key,
						amount: e.balance,
						transactions: e.transactions,
					};
				});
			} else {
				setcontrol({
					...control,
					loading: false,
					popup: { isOpen: true, messages: resp.messages },
				});
			}

			setusers({ ...onyankonpon });
		})();
	}, []);

	async function deleteUser(id) {
		setdeleting({ ...deleting, inProgress: true, id: id });

		const resp = await russbankApi.deleteUser(users[id].accountNumber);

		setdeleting({ ...deleting, inProgress: false });

		if (resp.success) {
			delete users[id];

			setusers({ ...users });
		} else {
			setcontrol({
				...control,
				loading: false,
				popup: { isOpen: true, messages: resp.messages },
			});
		}
	}

	return (
		<>
			{isloading ? (
				<div style={{ display: "grid", placeItems: "center", marginTop: 90 }}>
					<Loader variant="grid" size={40} isloading={isloading} />
				</div>
			) : (
				<div className="admin">
					{Object.keys(users).map((key, _) => (
						<UserPost
							key={key}
							id={key}
							accountNumber={users[key].accountNumber}
							firstName={users[key].firstName}
							lastName={users[key].lastName}
							userRole={users[key].userRole}
							amount={users[key].amount}
							address={users[key].address}
							email={users[key].email}
							transactions={users[key].transactions}
							onDelete={deleteUser}
							deleting={deleting}
						/>
					))}
				</div>
			)}
		</>
	);
}

{
	/* <UserPost
firstName="Russell"
lastName="Emekoba"
email="rjemekoba@gmail.com"
accountNumber="0065180934"
amount="10000"
onDelete={() => deleteUsers(0)}
/>,
<UserPost onDelete={() => deleteUsers(1)} />,
<UserPost onDelete={() => deleteUsers(2)} />,
<UserPost onDelete={() => deleteUsers(3)} />, */
}
