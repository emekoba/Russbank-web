export function authHeader() {
	const russbank = JSON.parse(sessionStorage.getItem("russbank-user"));

	if (russbank && russbank.token) {
		return { Authorization: "Bearer " + russbank.token };
	} else {
		return {};
	}
}
