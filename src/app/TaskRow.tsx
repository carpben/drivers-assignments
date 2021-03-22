/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react"
import { DRFC } from "../general/types"

interface Props {
	driver?: string
	taskId: string
	subTasks: string[]
}

const TaskRow: DRFC<Props> = (props) => {
	const { driver = "+ Driver", taskId, subTasks, ...otherProps } = props

	return (
		<div
			css={{
				display: "flex",
			}}
			{...otherProps}
		>
			<div
				css={{
					flexBasis: "15%",
					flexShrink: 0,
				}}
			>
				{driver}
			</div>
			<div
				css={{
					flexBasis: "15%",

					flexShrink: 0,
				}}
			>
				{taskId}
			</div>
			{subTasks.map((sub) => (
				<div
					css={{
						flexBasis: "10%",
					}}
				>
					{sub}
				</div>
			))}
		</div>
	)
}

export default TaskRow
