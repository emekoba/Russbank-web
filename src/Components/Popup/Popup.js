import React from "react";
import "./popup.css";
import { useContext } from "react";
import { Brim } from "../../State/Control";
import Glass from "../Glass/Glass";
import close from "../../Resources/close.png";

export default function Popup() {
	const [control, setcontrol] = useContext(Brim);

	const glass_styles = {
		height: "100vh",
		width: "100%",
		position: "fixed",
		zIndex: 100,
		display: "grid",
		placeItems: "center",
	};

	function closePressed() {
		setcontrol({
			...control,
			popup: {
				...control.popup,
				isOpen: false,
			},
		});
	}

	return (
		<>
			{control.popup.isOpen && (
				<Glass styles={glass_styles} noBounce>
					<Glass>
						<div className="popup">
							<div className="popup-row">
								<button onClick={closePressed}>
									<img src={close} className="close" alt="close" />
								</button>
							</div>

							{control.popup.messages?.map((e) => (
								<div
									className="popup_msg"
									style={{
										textAlign:
											control.popup.messages.length === 1 ? "center" : "left",
										marginTop: control.popup.messages.length === 1 ? 30 : 0,
									}}
								>
									{e}
								</div>
							))}
						</div>
					</Glass>
				</Glass>
			)}
		</>
	);
}
