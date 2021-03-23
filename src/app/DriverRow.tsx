/** @jsxImportSource @emotion/react */
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "../general/Button"
import { DRFC } from "../general/types"
import { getStyleCol } from "./style"

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
			<div css={styleNameCol}>{name}</div>

			<div css={styleIdCol}>{id}</div>

			<div css={styleButtonCol}>
				{select && (
					<Button css={{ color: "#777" }} handler={select}>
						<FontAwesomeIcon icon={faPlus} />
					</Button>
				)}
			</div>
		</div>
	)
}

const styleNameCol = getStyleCol("40%")
const styleIdCol = getStyleCol("50%")
const styleButtonCol = [
	getStyleCol("10%"),
	{
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
	},
]

export default DriverRow
