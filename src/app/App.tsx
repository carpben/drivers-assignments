/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react"
import { useEffect, useState } from "react"
import { useImmer } from "use-immer"
import { getArr } from "../general/array"
import { getShadow } from "../general/style"
import { DRFC } from "../general/types"
import drivers from "./data/ops-Exercise-drivers.json"
import tasks from "./data/ops-Exercise-tasks.json"
import DriverRow from "./DriverRow"
import RowW, { ROW_STYLE_MODE } from "./RowW"
import TableW from "./TableW"
import TaskRow from "./TaskRow"

interface Props {}

// const initState = {
//   assigned: {},
//   selected: {
//     driver: undefined,
//     task: undefined
//   }
// }
const driversMap = drivers.reduce((accum, driver) => {
	accum[driver.id] = driver
	return accum
}, {} as Record<string, typeof drivers[number]>)

const initialSelection = {
	driver: undefined as string | undefined,
	task: undefined as string | undefined,
}

const App: DRFC<Props> = () => {
	const [assigned, setAssigned] = useImmer({} as Record<string, string>)
	const [selection, setSelection] = useImmer(initialSelection)

	useEffect(() => {
		if (selection.driver && selection.task) {
			setAssigned((draftSt) => {
				draftSt[selection.task!] = selection.driver!
			})

			const timeout = setTimeout(() => {
				setSelection(initialSelection)
			}, 1500)
		}
	}, [selection.driver, selection.task])

	const selectionJustMade = Boolean(selection.task && selection.driver)

	return (
		<div
			css={{
				display: "flex",

				padding: 40,
				backgroundColor: "#ddd",
				alignItems: "baseline",
			}}
			onClick={() => setSelection((draftSt) => ({}))}
		>
			<TableW
				css={{
					flexBasis: 500,
					marginRight: 100,
				}}
				heighlight={Boolean(selection.task && !selection.driver)}
			>
				<RowW>
					<DriverRow
						name="Name"
						id="ID"
						css={{
							fontWeight: 600,
						}}
					/>
				</RowW>

				{drivers.map((driver) => {
					const selected = driver.id === selection.driver
					return (
						<RowW
							key={driver.id}
							handler={() =>
								setSelection((draftSt) => {
									draftSt.driver = driver.id
								})
							}
							css={styleRowData}
							styleMode={
								selected
									? ROW_STYLE_MODE.HEIGHLIGHT
									: selection.driver
									? ROW_STYLE_MODE.BLUR
									: undefined
							}
						>
							<DriverRow {...driver} />
						</RowW>
					)
				})}
			</TableW>

			<TableW
				css={[
					{
						flexBasis: 1000,
					},
				]}
				heighlight={Boolean(!selection.task && selection.driver)}
			>
				<RowW>
					<TaskRow
						driver="Driver"
						taskId="TaskId"
						subTasks={getArr(7, (i) => `Day ${i + 1}`)}
						css={{
							fontWeight: 600,
						}}
					/>
				</RowW>

				{tasks.map((task) => {
					const selected = selection.task === task.lineId
					return (
						<RowW
							css={styleRowData}
							handler={() =>
								setSelection((draftSt) => {
									draftSt.task = task.lineId
								})
							}
							styleMode={
								selected
									? ROW_STYLE_MODE.HEIGHLIGHT
									: selection.task
									? ROW_STYLE_MODE.BLUR
									: undefined
							}
						>
							<TaskRow
								driver={driversMap[assigned[task.lineId]]?.name}
								taskId={task.lineDisplayId}
								subTasks={task.tasks.map((subTask) => subTask.type)}
							/>
						</RowW>
					)
				})}
			</TableW>
		</div>
	)
}

const styleRowData = css({
	":hover": {
		backgroundColor: "white",
	},
})

export default App
