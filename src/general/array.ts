export const getArr = <T extends any>(length: number, func: (i: number) => T): T[] =>
	Array.from(new Array(length)).map((_, i) => func(i))
