import axios from "axios";
import { authHeader } from "./auth.header";

const API_URL = "https://localhost:3000/";

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
		.then((res, e) => {
			return {
				success: true,
				data: res.data,
			};
		})
		.catch((e) => {
			console.log(e);
			return { success: false };
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
			console.log(e);
			return { success: false };
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
			console.log(e);
			return { success: false };
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
			console.log(e);
			return { success: false };
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
			console.log(e);
			return { success: false };
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
			console.log(e);
			return { success: false };
		});
}

export default {
	register,
	transfer,
	deposit,
	getAllUsers,
	deleteUser,
};
