import { EffectCallback, useEffect, useRef } from "react"

export const useMountEffect = (fun: EffectCallback) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useEffect(fun, [])
}

export const useUpdateEffect = (effect: () => unknown, dependencies: any[]) => {
	const hasMounted = useRef(false)
	useEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true
			return
		}
		effect()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies)
}
