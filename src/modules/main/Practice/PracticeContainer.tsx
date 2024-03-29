import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../store";
import {Practice} from "./Practice";
import {AwaitPractice} from "./AwaitPractice";
import {awaitingAsync, getPracticeAsync} from "../../../store/practiceSlice";
import {Preloader} from "../Preloader/Preloader";
import s from "./practice.module.scss"

export const PracticeContainer = () => {
    const {
        examplesPractice,
        hasExamples,
        awaitingPractice
    } = useAppSelector((state) => state.practiceReducer);
    const {
        isFetching
    } = useAppSelector((state) => state.appReducer);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getPracticeAsync())
    }, [])

    useEffect(() => {
        if (hasExamples && examplesPractice.length === 0) {
            dispatch(awaitingAsync())
        }
    }, [examplesPractice])
    if (isFetching) {
        return <Preloader/>
    }
    return (
        <div>
            {examplesPractice.length > 0 &&
                <Practice practices={examplesPractice}/>
            }
            {examplesPractice.length === 0 && awaitingPractice.length>0 && examplesPractice.length === 0 &&
                <AwaitPractice
                    awaitingPractice={awaitingPractice}
                />
            }
            {examplesPractice.length === 0 && awaitingPractice.length === 0 &&
                <div className={s.notice}>
                    У вас пока нет примеров, чтобы тренироваться в запоминании английских слов!
                    <div className={s.noticeInstr}>придумывайте больше мнемоник и примеров с ними, чтобы включить их в свои тренировки
                    </div>
                </div>

            }
        </div>
    )
}