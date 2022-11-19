import React, {FC} from "react";
import s from "./finish.module.scss"
import {getPracticeAsync} from "../../../store/practiceSlice";
import {useAppDispatch} from "../../../store";
import {useNavigate} from "react-router";
import {ReactComponent as Book} from "../../../import/icons/book.svg";
import {ReactComponent as Repeat} from "../../../import/icons/repeat.svg";

type FinishComponent = {
    allPractice: number,
    rightCount: number,
    setCount: (count: number) => void
    setRightCount:(count: number) => void
}
export const FinishComponent: FC<FinishComponent> = (props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const backToPractice = () => {
        dispatch(getPracticeAsync())
        props.setCount(0)
        props.setRightCount(0)
    }
    const backToMyPage = () => {
        navigate(`/user`)
        props.setCount(0)
        props.setRightCount(0)
    }

    return (
        <div className={s.finishBox}>
           <div className={s.headFinish}>Результат:</div>
            <div className={s.statistic}>{`${props.rightCount}/${props.allPractice}`}</div>
            <div className={s.buttonsBox}>
                <div className={s.buttonFinish} onClick={backToPractice}>
                    <div className={s.iconFinish}><Repeat/></div>
                    <div className={s.buttonPractice}>повторить</div>
                </div>
                <div className={s.buttonFinish} onClick={backToMyPage}>
                    <div className={s.iconFinish}><Book/></div>
                    <div className={s.buttonPractice}>мой словарь</div>
                </div>

            </div>
        </div>
    )
}