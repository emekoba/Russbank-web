import React, { useContext, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";
import { Brim } from "../../State/Control";

export default function Loader({ color }) {
	let [control] = useContext(Brim);

	const override = css`
		display: block;
		margin: 0 auto;
		border-color: red;
	`;

	return (
		<div
			style={{
				height: "100vh",
				width: "100%",
				position: "fixed",
				display: "grid",
				placeItems: "center",
				zIndex: 100,
			}}
		>
			<HashLoader
				color={color ?? "#1C3144"}
				loading={control.loading}
				css={override}
				size={150}
			/>
		</div>
	);
}
