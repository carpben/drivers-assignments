/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from "@emotion/react"
import { stopAllPropagation } from "./dom"
import { styleInputNormalize } from "./style"
import { DRFC } from "./types"

interface Props {
	handler: () => unknown
	stl?: Interpolation<Theme>
}

export const Button: DRFC<Props> = (props) => {
	const { handler, stl, ...otherProps } = props
	return (
		<button
			onClick={(e) => {
				stopAllPropagation(e)
				handler()
			}}
			css={[style, stl]}
			{...otherProps}
		/>
	)
}

const style = css(styleInputNormalize, { cursor: "pointer", fontSize: 16 })
