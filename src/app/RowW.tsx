/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { stopAllPropagation } from "../general/dom"
import { getShadow } from "../general/style"
import { DRFC } from "../general/types"

interface Props {
	handler?: () => unknown
	justChanged?: boolean
	styleMode?: ROW_STYLE_MODE

	hoverable?: boolean
}

export enum ROW_STYLE_MODE {
	HEIGHLIGHT,
	BLUR,
}

const RowW: DRFC<Props> = (props) => {
	const { handler, styleMode, justChanged, hoverable, ...otherProps } = props
	const justChangedDecoration = justChanged && styleMode !== ROW_STYLE_MODE.HEIGHLIGHT

	return (
		<div
			css={[
				styleW,
				{
					cursor: handler ? "pointer" : "unset",
					":hover": {
						backgroundColor: justChangedDecoration ? "blue" : "white",
					},
				},

				styleMode === ROW_STYLE_MODE.HEIGHLIGHT
					? styleHeighlight
					: styleMode === ROW_STYLE_MODE.BLUR
					? { filter: "blur(5px)" }
					: undefined,

				justChangedDecoration ? styleJustChanged : undefined,
			]}
			{...otherProps}
			onClick={
				handler
					? (e) => {
							stopAllPropagation(e)
							handler()
					  }
					: undefined
			}
		/>
	)
}

const styleW = css({
	padding: "5px 15px",
	borderTop: `1px solid #ddd`,
})

const styleHeighlight = css([
	getShadow(2, 1),
	{
		backgroundColor: "white",
		borderRadius: 3,
	},
])

const styleJustChanged = css({
	backgroundColor: "blue",
	color: "white",
})

export default RowW
