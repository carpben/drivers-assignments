/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react"
import { faCheck, faQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useUpdateEffect } from "../general/lifecycles"
import { styleCenterSingleChild } from "../general/style"
import { DRFC } from "../general/types"
import RowW, { ROW_STYLE_MODE } from "./RowW"

interface Props {
	driver?: string
	taskId: string
	subTasks: string[]
	handler?: () => unknown
	styleMode?: ROW_STYLE_MODE
}

const TaskRow: DRFC<Props> = (props) => {
	const { driver, taskId, subTasks, ...otherProps } = props

	const [justChanged, setJustChnaged] = useState(false)

	useUpdateEffect(() => {
		setJustChnaged(true)
		setTimeout(() => setJustChnaged(false), 900)
	}, [driver])

	return (
		<RowW {...otherProps} justChanged={justChanged}>
			<div
				css={{
					display: "flex",
				}}
			>
				<div
					css={[
						{
							flexBasis: "5%",
							flexShrink: 0,
							color: driver ? "green" : "#888",
						},
						styleCenterSingleChild,
					]}
				>
					<FontAwesomeIcon icon={driver ? faCheck : faQuestion} />
				</div>
				<div
					css={{
						flexBasis: "20%",
						flexShrink: 0,
					}}
				>
					{driver}
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
