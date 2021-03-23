import { css } from "@emotion/react"

export const getStyleCol = (flexBasis: number | string) =>
	css({
		flex: 0,
		flexBasis,
	})
