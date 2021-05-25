import "./App.css";
import Home from "./Routes/Home/Home";
import Register from "./Routes/Register/Register";
import Login from "./Routes/Login/Login";
import Particles from "react-particles-js";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Loader from "./Components/Loader/Loader";
import { Redirect, Route, Switch } from "react-router";
import Popup from "./Components/Popup/Popup";

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

	return (
		<div className="App">
			<Loader />

			<Popup />

			<Particles className="particles" params={particleOptions} />

			<Header />

			<div style={{ minHeight: 800 }}>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/home" component={Home} />

					<Redirect to="/login" />
				</Switch>
			</div>

			<Footer />
		</div>
	);
}

export default App;
