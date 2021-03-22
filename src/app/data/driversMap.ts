import drivers from "./ops-Exercise-drivers.json"

export const driversMap = drivers.reduce((accum, driver) => {
	accum[driver.id] = driver
	return accum
}, {} as Record<string, typeof drivers[number]>)
