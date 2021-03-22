/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react"
import { useEffect, useState } from "react"
import { useImmer } from "use-immer"
import { getArr } from "../general/array"
import { Button } from "../general/Button"
import { useMountEffect, useUpdateEffect } from "../general/lifecycles"
import { DRFC } from "../general/types"
import { driversMap } from "./data/driversMap"
import { assignedLiveData } from "./data/liveData"
import drivers from "./data/ops-Exercise-drivers.json"
import tasks from "./data/ops-Exercise-tasks.json"
import DriverRow from "./DriverRow"
import RowW, { ROW_STYLE_MODE } from "./RowW"
import TableW from "./TableW"
import TaskRow from "./TaskRow"

interface Props {}

const initialSelection = {
	driver: undefined as string | undefined,
	task: undefined as string | undefined,
}

const App: DRFC<Props> = () => {
	const [assigned, setAssigned] = useImmer(null as null | Record<string, string>)
	const [selection, setSelection] = useImmer(initialSelection)

	useEffect(() => {
		if (selection.driver && selection.task) {
			assignedLiveData.set({
				...assigned,
				[selection.task]: selection.driver,
			})

			setTimeout(() => {
				setSelection(initialSelection)
			}, 1100)
		}
	}, [selection.driver, selection.task])

	useMountEffect(() => {
		assignedLiveData.get().then((initialAssigned) => {
			setAssigned(initialAssigned)
		})

		assignedLiveData.on((newAssigned) => {
			setAssigned(newAssigned)
		})
	})

	if (!assigned) {
		return null
	}

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
					flexBasis: 450,
					marginRight: 100,
					flexGrow: 1,
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

			<div
				css={{
					flexBasis: 1050,
					flexGrow: 2,
				}}
			>
				<TableW heighlight={Boolean(!selection.task && selection.driver)}>
					<TaskRow
						driver="Driver"
						taskId="TaskId"
						subTasks={getArr(7, (i) => `Day ${i + 1}`)}
						css={{
							fontWeight: 600,
						}}
					/>

					{tasks.map((task) => {
						const selected = selection.task === task.lineId
						return (
							<TaskRow
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
								key={task.lineId}
								driver={driversMap[assigned[task.lineId]]?.name}
								taskId={task.lineDisplayId}
								subTasks={task.tasks.map((subTask) => subTask.type)}
							/>
						)
					})}
				</TableW>

				<Button
					css={{
						marginTop: 20,
						padding: "14px 6px",
						border: "1px solid #aaa",
						backgroundColor: "#888",
						borderRadius: 3,
					}}
					handler={() => setAssigned({})}
				>
					Reset Assignments
				</Button>
			</div>
		</div>
	)
}

const styleRowData = css({
	":hover": {
		backgroundColor: "white",
	},
})

export default App
