/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React, { useEffect, useState } from "react"
import { useImmer } from "use-immer"
import { getArr } from "../general/array"
import { Button } from "../general/Button"
import { useMountEffect } from "../general/lifecycles"
import { DRFC } from "../general/types"
import { driversMap } from "./data/driversMap"
import { assignedLiveData } from "./data/liveData"
import drivers from "./data/ops-Exercise-drivers.json"
import tasks from "./data/ops-Exercise-tasks.json"
import DriverRow from "./DriverRow"
import RowW, { ROW_STYLE_MODE } from "./RowW"
import TableW from "./TableW"
import TaskRow from "./TaskRow"
import TaskRowTemplate from "./TaskRowTemplate"

interface Props {}

const initialSelection = {
	driver: undefined as string | undefined,
	task: undefined as string | undefined,
}

const useDriverAssignments = () => {
	const [assigned, setAssigned] = useState(null as null | Record<string, string>)
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
	})

	useMountEffect(() => {
		assignedLiveData.get().then((initialAssigned) => {
			setAssigned(initialAssigned)
		})

		assignedLiveData.on((newAssigned) => {
			setAssigned(newAssigned)
		})
	})

	return {
		setSelection,
		reset: () => assignedLiveData.set({}),
		assigned,
		selection,
	}
}

const App: DRFC<Props> = () => {
	const { assigned, selection, setSelection, reset } = useDriverAssignments()

	if (!assigned) {
		return null
	}

	const driversHeighlighted = Boolean(selection.task && !selection.driver)
	const tasksHeighlighted = Boolean(!selection.task && selection.driver)

	return (
		<div css={styleContainer} onClick={() => setSelection((draftSt) => ({}))}>
			<TableW css={styleDriverTable} heighlight={driversHeighlighted}>
				<RowW css={styleTableHeader}>
					<DriverRow name="Name" id="ID" />
				</RowW>

				{drivers.map((driver) => {
					const selected = driver.id === selection.driver
					const selectDriver = () =>
						setSelection((draftSt) => {
							draftSt.driver = driver.id
						})

					return (
						<RowW
							key={driver.id}
							handler={driversHeighlighted ? selectDriver : undefined}
							styleMode={
								selected
									? ROW_STYLE_MODE.HEIGHLIGHT
									: selection.driver
									? ROW_STYLE_MODE.BLUR
									: undefined
							}
						>
							<DriverRow {...driver} select={selectDriver} />
						</RowW>
					)
				})}
			</TableW>

			<div css={styleTasksSection}>
				<TableW heighlight={tasksHeighlighted}>
					<TaskRowTemplate
						driver="Driver"
						taskId="TaskId"
						subTasks={getArr(7, (i) => `Day ${i + 1}`)}
						css={styleTableHeader}
					/>

					{tasks.map((task) => {
						const selected = selection.task === task.lineId

						return (
							<TaskRow
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
								rowClickable={tasksHeighlighted}
							/>
						)
					})}
				</TableW>

				<Button css={styleResetButton} handler={reset}>
					Reset Assignments
				</Button>
			</div>
		</div>
	)
}

const styleTableHeader = css({
	fontWeight: 600,
	":hover": {
		backgroundColor: "unset",
	},
})

const styleContainer = css({
	display: "flex",
	padding: 40,
	alignItems: "baseline",
	fontSize: 15,
})

const styleDriverTable = css({
	flexBasis: 500,
	marginRight: 75,
	flexGrow: 1,
})

const styleTasksSection = css({
	flexBasis: 1050,
	flexGrow: 2,
})

const styleResetButton = css({
	marginTop: 20,
	padding: "14px 6px",
	border: "1px solid #aaa",
	backgroundColor: "#888",
	borderRadius: 3,
})

export default App
