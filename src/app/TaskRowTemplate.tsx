/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { ReactNode } from "react"
import { DRFC } from "../general/types"
import RowW from "./RowW"
import { getStyleCol } from "./style"

interface Props {
	driver?: ReactNode
	taskId: string
	subTasks: string[]
	handler?: () => unknown
	justChanged?: boolean
}

const TaskRowTemplate: DRFC<Props> = (props) => {
	const { driver, taskId, subTasks, ...otherProps } = props

	return (
		<RowW {...otherProps}>
			<div
				css={{
					display: "flex",
				}}
			>
				<div css={styleNameCol}>{driver}</div>
				<div css={styleCol}>{taskId}</div>
				{subTasks.map((sub, i) => (
					<div
						css={styleCol}
						key={i} // Rare case of static list. In dynamic lists index mustn't be used for key
					>
						{sub}
					</div>
				))}
			</div>
		</RowW>
	)
}

const styleNameCol = getStyleCol("25%")
const styleCol = getStyleCol("10%")
export default TaskRowTemplate
