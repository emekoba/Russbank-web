import React, { createContext, useState } from "react";

export const Brim = createContext();

export const Control = (props) => {
	const [control, setcontrol] = useState({
		loading: false,
		popup: {
			isOpen: true,
			messages: ["The You dont have suffient balance to process this request"],
		},
	});

	return (
		<Brim.Provider value={[control, setcontrol]}>
			{props.children}
		</Brim.Provider>
	);
};
