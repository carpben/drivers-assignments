/** @jsxImportSource @emotion/react */
import { getShadow } from "../general/style"
import { DRFC } from "../general/types"

interface Props {
	heighlight: boolean
}

const TableW: DRFC<Props> = (props) => {
	const { heighlight, ...otherProps } = props

	return (
		<div
			css={[
				{
					borderRadius: 3,
					backgroundColor: "#eee",
				},
				heighlight
					? [
							getShadow(3, 0.7),
							{
								backgroundColor: "white",
							},
					  ]
					: undefined,
			]}
			{...otherProps}
		/>
	)
}

export default TableW
