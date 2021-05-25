import React, { useContext, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";
import { Brim } from "../../State/Control";

export default function Loader({ color }) {
	const [control] = useContext(Brim);

	const override = css`
		display: block;
		margin: 0 auto;
		border-color: red;
	`;

	return (
		<>
			{control.loading && (
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
						color={color ?? "var(--textprimary)"}
						loading={control.loading}
						css={override}
						size={150}
					/>
				</div>
			)}
		</>
	);
}
