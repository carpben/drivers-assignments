/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { getShadow } from "../general/style"
import { DRFC } from "../general/types"

interface Props {
	heighlight: boolean
}

const TableW: DRFC<Props> = (props) => {
	const { heighlight, ...otherProps } = props

	return <div css={[styleBase, heighlight ? styleHeighlighted : undefined]} {...otherProps} />
}

const styleBase = css({
	borderRadius: 3,
	backgroundColor: "#eee",
})

const styleHeighlighted = css([
	getShadow(3, 0.7),
	{
		backgroundColor: "#f8f8f8",
	},
])

export default TableW
