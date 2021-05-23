import "./App.css";
import Home from "./Routes/Home/Home";
import Register from "./Routes/Register/Register";
import Login from "./Routes/Login/Login";
import Particles from "react-particles-js";
import Header from "./Header/Header";
import { useContext, useState } from "react";
import Footer from "./Footer/Footer";
import { Brim } from "./State/Control";
import Loader from "./Components/Loader/Loader";

function App() {
	let particleOptions = {
		polygon: {
			// enable: true,
			// type: "inside",
			// move: {
			// 	radius: 10,
			// },
			draw: { stroke: { color: "red" } },
		},
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 1000,
			},
		},
	};

	const [control] = useContext(Brim);

	const [route, setroute] = useState("home");

	function logout() {
		setroute("login");
	}

	function register() {
		setroute("register");
	}

	function changeRoute() {
		switch (route) {
			case "home":
				logout();
				break;

			case "login":
				register();
				break;

			default:
				break;
		}
	}

	return (
		<div className="App">
			{control.loading && <Loader />}

			<Particles className="particles" params={particleOptions} />

			<Header route={route} changeRoute={changeRoute} register={register} />

			<div style={{ minHeight: 800 }}>
				{route === "register" && <Register />}
				{route === "login" && <Login />}
				{route === "home" && <Home />}
			</div>

			<Footer />
		</div>
	);
}

export default App;
