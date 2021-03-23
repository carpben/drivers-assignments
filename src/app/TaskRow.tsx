/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { stopAllPropagation } from "../general/dom"
import { useUpdateEffect } from "../general/lifecycles"
import { styleCenterSingleChild } from "../general/style"
import { DRFC } from "../general/types"
import RowW, { ROW_STYLE_MODE } from "./RowW"
import TaskRowTemplate from "./TaskRowTemplate"

interface Props {
	driver?: string
	taskId: string
	subTasks: string[]
	handler: () => unknown
	styleMode?: ROW_STYLE_MODE
	rowClickable: boolean
}

const useJustChanged = (driver?: string) => {
	const [justChanged, setJustChnaged] = useState(false)

	useUpdateEffect(() => {
		setJustChnaged(true)
		setTimeout(() => setJustChnaged(false), 900)
	}, [driver])

	return justChanged
}

const TaskRow: DRFC<Props> = (props) => {
	const { driver, taskId, subTasks, rowClickable, handler, ...otherProps } = props

	const justChanged = useJustChanged(driver)

	return (
		<TaskRowTemplate
			driver={
				<div
					css={[styleRowW, driver ? undefined : styleRowClickable]}
					onClick={
						driver
							? undefined
							: (e) => {
									stopAllPropagation(e)
									handler!()
							  }
					}
				>
					<div
						css={[
							{
								width: 30,
								color: driver ? "green" : "#777",
							},
							styleCenterSingleChild,
						]}
					>
						<FontAwesomeIcon icon={driver ? faCheck : faPlus} />
					</div>

					<div css={{ marginLeft: 20 }}>{driver || "Driver"}</div>
				</div>
			}
			taskId={taskId}
			subTasks={subTasks}
			handler={rowClickable ? handler : undefined}
			{...otherProps}
			justChanged={justChanged}
		/>
	)
}

const styleRowW = css({
	display: "flex",
	alignItems: "center",
})

const styleRowClickable = css({
	cursor: "pointer",
	width: "min-content",
	color: "#777",
	fontWeight: 600,
})

export default TaskRow
