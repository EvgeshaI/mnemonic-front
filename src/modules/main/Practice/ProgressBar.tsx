import React, {FC} from "react";
import s from "./progress.module.scss"

type ProgressBarPropsType = {
    width: number
}
export const ProgressBar: FC<ProgressBarPropsType> = (props) => {
    return (
        <div className={s.meter}>
            <span style={{width: props.width + "%"}}> </span>
        </div>
    )
}