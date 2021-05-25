import axios from "axios";
import { authHeader } from "./auth.header";

const API_URL = "https://russbank-server.herokuapp.com/";

const LOCAL_API_URL = "http://localhost:9000/";

const ROUTES = {
	auth: "auth/",
	bank: "bank/",
	admin: "admin/",
};

const ENDPOINT = {
	signup: "signup",
	signin: "signin",
	deposit: "deposit",
	transfer: "transfer",
	withdraw: "withdraw",
	all: "all-users",
	delete: "delete-user",
};

const getToken = () => {
	return sessionStorage.getItem("user");
};

// function registers(form) {
// 	// return axios
// 	return fetch(API_URL + ROUTES.auth + ENDPOINT.signup, {
// 		method: "POST",
// 		body: JSON.stringify({
// 			first_name: form.firstName,
// 			user_role: form.userRole,
// 			last_name: form.lastName,
// 			phone_number: form.phoneNumber,
// 			address: form.address,
// 			email: form.email,
// 			password: form.password,
// 			confirm_password: form.cpassword,
// 		}),

// 		header: {
// 			"Content-Type": "application/json",
// 		},
// 	})
// 		.then((res, e) => {
// 			return {
// 				success: true,
// 				data: res.data,
// 			};
// 		})
// 		.catch((e) => {

// 			return { success: false, messages: [e.response.data.message] };
// 		});
// }

function login(form) {
	return axios
		.post(API_URL + ROUTES.auth + ENDPOINT.signin, {
			account_number: form.accountNumber,
			password: form.password,
		})
		.then((res) => {
			if (res.data.user.token) {
				const sessionObject = {
					expiresAt: 720,
					token: res.data.user.token,
				};

				sessionStorage.setItem("russbank-user", JSON.stringify(sessionObject));
			}

			return {
				success: true,
				data: res.data,
			};
		})
		.catch((e) => {
			return { success: false, messages: [e.response.data.message] };
		});
}

function register(form) {
	return axios
		.post(API_URL + ROUTES.auth + ENDPOINT.signup, {
			first_name: form.firstName,
			user_role: form.userRole,
			last_name: form.lastName,
			phone_number: form.phoneNumber,
			address: form.address,
			email: form.email,
			password: form.password,
			confirm_password: form.cpassword,
		})
		.then((res) => {
			return {
				success: true,
				data: res.data,
			};
		})
		.catch((e) => {
			return { success: false, messages: [e.response.data.message] };
		});
}

function transfer(form) {
	return axios
		.post(
			API_URL + ROUTES.bank + ENDPOINT.transfer,
			{
				sender: form.sender,
				recipient: form.recipient,
				amount: form.amount,
			},
			{ headers: authHeader() }
		)
		.then((res, e) => {
			return {
				success: true,
				data: res.data,
			};
		})
		.catch((e) => {
			return { success: false, messages: [e.response.data.message] };
		});
}

function deposit(form) {
	return axios
		.post(
			API_URL + ROUTES.bank + ENDPOINT.deposit,
			{
				amount_number: form.account_number,
				amount: form.amount,
			},
			{ headers: authHeader() }
		)
		.then((res, e) => {
			return {
				success: true,
				data: res.data,
			};
		})
		.catch((e) => {
			return { success: false, messages: [e.response.data.message] };
		});
}

function withdraw(form) {
	return axios
		.post(
			API_URL + ROUTES.bank + ENDPOINT.withdraw,
			{
				amount_number: form.account_number,
				amount: form.amount,
			},
			{ headers: authHeader() }
		)
		.then((res, e) => {
			return {
				success: true,
				data: res.data,
			};
		})
		.catch((e) => {
			return { success: false, messages: [e.response.data.message] };
		});
}

function getAllUsers() {
	return axios
		.get(API_URL + ROUTES.admin + ENDPOINT.all, {}, { headers: authHeader() })
		.then((res, e) => {
			return {
				success: true,
				data: res.data,
			};
		})
		.catch((e) => {
			return { success: false, messages: [e.response.data.message] };
		});
}

function deleteUser(account_number) {
	return axios
		.delete(
			API_URL + ROUTES.admin + ENDPOINT.delete,
			{
				account_number,
			},
			{ headers: authHeader() }
		)
		.then((res, e) => {
			return {
				success: true,
				data: res.data,
			};
		})
		.catch((e) => {
			return { success: false, messages: [e.response.data.message] };
		});
}

export default {
	register,
	transfer,
	deposit,
	withdraw,
	login,
	getAllUsers,
	deleteUser,
};
