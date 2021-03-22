/** @jsxImportSource @emotion/react */
import { DRFC } from "../general/types"

interface Props {
	name: string
	id: string
}

const DriverRow: DRFC<Props> = (props) => {
	const { name, id, ...otherProps } = props

	return (
		<div
			css={{
				display: "flex",
			}}
			{...otherProps}
		>
			<div
				css={{
					flexBasis: "45%",
					flexShrink: 0,
				}}
			>
				{name}
			</div>
			<div
				css={{
					flexBasis: "55%",
					flexShrink: 0,
				}}
			>
				{id}
			</div>
			<div
				css={{
					flexBasis: "5%",
					flexShrink: 0,
				}}
			>
				{id}
			</div>
		</div>
	)
}

export default DriverRow
