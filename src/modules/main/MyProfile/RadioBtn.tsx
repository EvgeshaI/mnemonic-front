import React, {FC} from "react";
import s from "./myProfile.module.scss";

type RadioBtnPropsType = {
    valueBtn: string,
    active: boolean,
    changeRepetitionType: (type: string) => void
}

export const RadioBtn:FC<RadioBtnPropsType> = (props) => {
    const changeTypeRepetition = () => {
        props.changeRepetitionType(props.valueBtn)
    }
    const classStyle = props.active ? s.radio_active : s.radio
    return(
        <div className={s.radioBtnBox}>
            <div className={classStyle} onClick={changeTypeRepetition}> </div>
            <div className={s.nameRadio}>{props.valueBtn}</div>
        </div>
    )
}