export const stopAllPropagation = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
	e.stopPropagation()
	// @ts-ignore
	e.nativeEvent.stopImmediatePropagation()
}
