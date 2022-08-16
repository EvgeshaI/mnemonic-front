import React, {useEffect} from "react";
import s from "./userPage.module.scss"
import {useAppDispatch, useAppSelector} from "../../../store";
import {getMyStatisticAsync} from "../../../store/userSlice";

export const Statistics = () => {
    const {
        statistic
    } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getMyStatisticAsync())
    }, [])
    return (
        <div className={s.statisticBox}>
            <div>
                <div className={s.title}>Слов:</div>
                <div>{statistic?.engWordAmount}</div>
            </div>
            <div>
                <div className={s.title}>Мнемоник:</div>
                <div>{statistic?.mnemonicAmount}</div>
            </div>
            <div>
                <div className={s.title}>Примеров:</div>
                <div>{statistic?.exampleAmount}</div>
            </div>
        </div>
    )
}