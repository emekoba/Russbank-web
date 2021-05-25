import React, { useContext } from "react";
import HashLoader from "react-spinners/HashLoader";
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/react";
import { Brim } from "../../State/Control";

export default function Loader({ isloading, variant, color, size }) {
	const [control] = useContext(Brim);

	const override = css`
		display: block;
		margin: 0 auto;
		border-color: red;
	`;

	return (
		<>
			{(control.loading || isloading) && (
				<>
					{variant === "grid" ? (
						<div
							style={{
								display: "grid",
								placeItems: "center",
								zIndex: 100,
							}}
						>
							<GridLoader
								color={color ?? "#1c3144"}
								loading={isloading}
								css={override}
								size={size ?? 150}
							/>
						</div>
					) : (
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
								color={color ?? "#1c3144"}
								loading={control.loading}
								css={override}
								size={size ?? 150}
							/>
						</div>
					)}
				</>
			)}
		</>
	);
}
