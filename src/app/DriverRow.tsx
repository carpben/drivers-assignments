/** @jsxImportSource @emotion/react */
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "../general/Button"
import { styleCenterSingleChild } from "../general/style"
import { DRFC } from "../general/types"

interface Props {
	name: string
	id: string
	select?: () => unknown
}

const DriverRow: DRFC<Props> = (props) => {
	const { name, id, select, ...otherProps } = props

	return (
		<div
			css={{
				display: "flex",
			}}
			{...otherProps}
		>
			<div
				css={{
					flexBasis: "40%",
					flexShrink: 0,
				}}
			>
				{name}
			</div>
			<div
				css={{
					flexBasis: "50%",
					flexShrink: 0,
				}}
			>
				{id}
			</div>
			<div
				css={{
					flexBasis: "10%",
					flexShrink: 0,
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
				}}
			>
				{select && (
					<Button
						css={{
							color: "#777",
						}}
						handler={select}
					>
						<FontAwesomeIcon icon={faPlus} />
					</Button>
				)}
			</div>
		</div>
	)
}

export default DriverRow
