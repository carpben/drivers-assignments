/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect } from "react"
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
import TaskRow, { TASK_ROW_MODE } from "./TaskRow"

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
	})

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

					return (
						<RowW
							key={driver.id}
							handler={
								driversHeighlighted
									? () =>
											setSelection((draftSt) => {
												draftSt.driver = driver.id
											})
									: undefined
							}
							styleMode={
								selected
									? ROW_STYLE_MODE.HEIGHLIGHT
									: selection.driver
									? ROW_STYLE_MODE.BLUR
									: undefined
							}
						>
							<DriverRow
								{...driver}
								select={() => {
									setSelection((draftSt) => {
										draftSt.driver = driver.id
									})
								}}
							/>
						</RowW>
					)
				})}
			</TableW>

			<div css={styleTasksSection}>
				<TableW heighlight={tasksHeighlighted}>
					<TaskRow
						driver="Driver"
						taskId="TaskId"
						subTasks={getArr(7, (i) => `Day ${i + 1}`)}
						css={styleTableHeader}
						mode={TASK_ROW_MODE.HEADER}
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
								mode={tasksHeighlighted ? TASK_ROW_MODE.ROW_CLICKABLE : TASK_ROW_MODE.NONE}
							/>
						)
					})}
				</TableW>

				<Button css={styleResetButton} handler={() => assignedLiveData.set({})}>
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
