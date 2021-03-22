/** @jsxImportSource @emotion/react */
import { faCheck, faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Button } from "../general/Button"
import { stopAllPropagation } from "../general/dom"
import { useUpdateEffect } from "../general/lifecycles"
import { styleCenterSingleChild } from "../general/style"
import { DRFC } from "../general/types"
import { driversMap } from "./data/driversMap"
import RowW, { ROW_STYLE_MODE } from "./RowW"

interface Props {
	driver?: string
	taskId: string
	subTasks: string[]
	handler?: () => unknown
	styleMode?: ROW_STYLE_MODE
	mode: TASK_ROW_MODE
}

export enum TASK_ROW_MODE {
	HEADER,
	ROW_CLICKABLE,
	NONE,
}

const TaskRow: DRFC<Props> = (props) => {
	const { driver, taskId, subTasks, mode, handler, ...otherProps } = props

	const [justChanged, setJustChnaged] = useState(false)

	useUpdateEffect(() => {
		setJustChnaged(true)
		setTimeout(() => setJustChnaged(false), 900)
	}, [driver])

	const driverTxt = driver || "Driver"

	const firstElement = (
		<div
			css={[
				{
					display: "flex",
					color: driver ? "unset" : "#777",
					fontWeight: driver ? "unset" : 600,
					alignItems: "center",
				},
			]}
		>
			<div
				css={[
					{
						width: 30,
					},
					styleCenterSingleChild,
				]}
			>
				{mode !== TASK_ROW_MODE.HEADER && (
					<FontAwesomeIcon
						icon={driver ? faCheck : faPlus}
						css={{
							color: driver ? "green" : "#777",
						}}
					/>
				)}
			</div>

			<div
				css={{
					marginLeft: 20,
				}}
			>
				{driverTxt}
			</div>
		</div>
	)

	return (
		<RowW
			handler={mode === TASK_ROW_MODE.ROW_CLICKABLE ? handler : undefined}
			{...otherProps}
			justChanged={justChanged}
		>
			<div
				css={{
					display: "flex",
				}}
			>
				<div
					css={{
						flexBasis: "25%",
						flexShrink: 0,
					}}
				>
					{driver ? (
						firstElement
					) : (
						<div // Not using a button not to create style inconsistencies betweein the rows.
							onClick={(e) => {
								stopAllPropagation(e)
								handler!()
							}}
							css={{
								cursor: "pointer",
								width: "min-content",
							}}
						>
							{firstElement}
						</div>
					)}
				</div>
				<div
					css={{
						flexBasis: "10%",
						flexShrink: 0,
					}}
				>
					{taskId}
				</div>
				{subTasks.map((sub, i) => (
					<div
						css={{
							flexBasis: "10%",
						}}
						key={i} // Rare case of static list. In dynamic lists index mustn't be used for key
					>
						{sub}
					</div>
				))}
			</div>
		</RowW>
	)
}

export default TaskRow
