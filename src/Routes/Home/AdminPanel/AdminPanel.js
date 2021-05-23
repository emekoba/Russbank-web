import React, { useContext, useEffect, useState } from "react";
import UserPost from "../../../Components/UserPost/UserPost";
import russbankApi from "../../../Services/russbank.api";
import { Brim } from "../../../State/Control";
import "./adminpanel.css";

let dimitrescu = {
	users: [
		{
			balance: 900,
			currency: "NGN",
			_id: "60a6f41b7e6e402dc8095904",
			user: {
				role: "NORMAL",
				_id: "60a6f41b7e6e402dc8095905",
				firstName: "Eniola",
				lastName: "Olatunji",
				phoneNumber: 9076381763,
				address: "No. 2 street akure lagos",
				email: "klojett.re@gmail.com",
				createdAt: "2021-05-20T23:43:24.013Z",
				updatedAt: "2021-05-20T23:43:24.013Z",
			},
			password: "$2b$10$OFoIUTgvZIdDUbx13uJUGO/qKrfypcJ2ROYIa1KWLzPb40wdOS8i.",
			accountNumber: "09076381763",
			transactions: [
				{
					_id: "60a6ffa83c51e11b9461bedf",
					amount: "700",
					type: "TRANSFER",
					sender: "08076607130",
					createdAt: "2021-05-21T00:32:40.422Z",
					updatedAt: "2021-05-21T00:32:40.422Z",
				},
				{
					_id: "60a701cd5be3160ff438afb5",
					amount: "800",
					type: "DEPOSIT",
					sender: "08076607130",
					updatedAt: "2021-05-21T00:41:49.254Z",
					createdAt: "2021-05-21T00:41:49.254Z",
				},
				{
					_id: "60a701d05be3160ff438afb9",
					amount: "900",
					type: "DEPOSIT",
					sender: "08076607130",
					updatedAt: "2021-05-21T00:41:52.324Z",
					createdAt: "2021-05-21T00:41:52.324Z",
				},
				{
					_id: "60a701d45be3160ff438afbd",
					amount: "1000",
					type: "DEPOSIT",
					sender: "08076607130",
					updatedAt: "2021-05-21T00:41:56.010Z",
					createdAt: "2021-05-21T00:41:56.010Z",
				},
			],
			createdAt: "2021-05-20T23:43:24.014Z",
			updatedAt: "2021-05-21T00:41:56.447Z",
			__v: 14,
		},
		{
			balance: 100,
			currency: "NGN",
			_id: "60a7108b3422913670c6a1b4",
			user: {
				role: "ADMIN",
				_id: "60a7108b3422913670c6a1b5",
				firstName: "Eniola",
				lastName: "Olatunji",
				phoneNumber: 9299999999,
				address: "No. 2 street akure lagos",
				email: "klojett.re@gmail.com",
				createdAt: "2021-05-21T01:44:43.389Z",
				updatedAt: "2021-05-21T01:44:43.389Z",
			},
			password: "$2b$10$T7FbNJYGC5YTV2vF/4A5uuQ7gVkknPPlY3yS/.jIQ6a2J//Jv75ii",
			accountNumber: "09299999999",
			transactions: [],
			createdAt: "2021-05-21T01:44:43.391Z",
			updatedAt: "2021-05-23T01:13:19.235Z",
			__v: 0,
			token:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYW5rQWNjb3VudCI6IjA5Mjk5OTk5OTk5IiwidGltZSI6MTYyMTczMjM5OTIyMywiaWF0IjoxNjIxNzMyMzk5LCJleHAiOjE2MjE3MzMxMTl9.wTp-pMaQ8mSE4l0GQRC1z21ELTuOWYEOr1Jk3DTqvM4",
		},
	],
	description: "success",
	code: 0,
};

export default function AdminPanel() {
	const [users, setusers] = useState({});
	const [control, setcontrol] = useContext(Brim);

	useEffect(() => {
		(async () => {
			const resp = await russbankApi.getAllUsers();

			let onyankonpon = {};

			dimitrescu.users.map((e) => {
				dimitrescu[e.accountNumber] = {
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

			setusers({ ...onyankonpon });
		})();
	}, []);

	function deleteUser(id) {
		setcontrol({ ...control, loading: true });

		const resp = russbankApi.deleteUser(users[id].accountNumber);

		setcontrol({ ...control, loading: false });

		delete users[id];

		setusers({ ...users });
	}

	return (
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
				/>
			))}
		</div>
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
