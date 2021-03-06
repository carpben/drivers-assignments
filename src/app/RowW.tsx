/** @jsxImportSource @emotion/react */
import { stopAllPropagation } from "../general/dom"
import { getShadow } from "../general/style"
import { DRFC } from "../general/types"

interface Props {
	handler?: () => unknown
	styleMode?: ROW_STYLE_MODE
	justChanged?: boolean
	hoverable?: boolean
}

export enum ROW_STYLE_MODE {
	HEIGHLIGHT,
	BLUR,
}

const RowW: DRFC<Props> = (props) => {
	const { handler, styleMode, justChanged, hoverable, ...otherProps } = props
	console.log(handler)
	const justChangedDecoration = justChanged && styleMode !== ROW_STYLE_MODE.HEIGHLIGHT

	return (
		<div
			css={[
				{
					padding: "5px 15px",
					borderTop: `1px solid #ddd`,
					cursor: handler ? "pointer" : "unset",
					":hover": {
						backgroundColor: justChangedDecoration ? "blue" : "white",
					},
				},

				styleMode === ROW_STYLE_MODE.HEIGHLIGHT
					? [
							getShadow(2, 1),
							{
								backgroundColor: "white",
								borderRadius: 3,
							},
					  ]
					: styleMode === ROW_STYLE_MODE.BLUR
					? {
							filter: "blur(5px)",
					  }
					: undefined,

				justChangedDecoration
					? {
							backgroundColor: "blue",
							color: "white",
					  }
					: undefined,
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

export default RowW
