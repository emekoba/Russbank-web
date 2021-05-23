export function authHeader() {
	const user = JSON.parse(sessionStorage.getItem("user"));

	if (user && user.data.access_token) {
		return { Authorization: "Bearer " + user.data.access_token };
	} else {
		return {};
	}
}
