import React, {useEffect, useState} from "react";
import s from "./myProfile.module.scss"
import {useAppDispatch, useAppSelector} from "../../../store";
import {getUserRepetition, updateRepetitionType} from "../../../store/userSlice";
import {IPractices} from "../../../shared/models/engWordTypes";
import {RadioBtn} from "./RadioBtn";

export const TypeOfPractice = () => {
    const dispatch = useAppDispatch()
    const {
        userTypeRepetition
    } = useAppSelector((state) => state.userReducer);

    const [typePractice, setTypePractice] = useState<IPractices | null>(null)
    useEffect(() => {
        dispatch(getUserRepetition())
    }, [])
    useEffect(() => {
        if (userTypeRepetition) {
            changeRepetitionType(userTypeRepetition!.userRepetition)
        }
    }, [userTypeRepetition])
    const updateTypeRepetition = () => {
        if(userTypeRepetition?.userRepetition !== typePractice?.repetitionType){
            dispatch(updateRepetitionType(typePractice!.repetitionType))
        }
    }
    const changeRepetitionType = (type: string) => {
        setTypePractice(
            userTypeRepetition!.practices.find(el => el.repetitionType === type)!
        )
    }
    let saveButtonStyle = userTypeRepetition?.userRepetition === typePractice?.repetitionType ?
        s.saveTypeRepetitionDisable : s.saveTypeRepetition
    return(
        <div className={s.tableBox}>
            <div className={s.typesPractice}>
                {userTypeRepetition?.practices.map(el =>
                    <RadioBtn valueBtn={el.repetitionType}
                              active={el.repetitionType == typePractice?.repetitionType}
                              changeRepetitionType={changeRepetitionType}
                    />)}
            </div>
                <table className={s.table}>
                    <tr>
                        <th>этап</th>
                        <th>количество</th>
                        <th>единицы</th>
                    </tr>
                    {typePractice?.stages.filter((el, i) => i>0).map((el, i) =>
                    <tr>
                        <td>{i+1}</td>
                        <td>{el.amount}</td>
                        <td>{el.timeUnit.toLowerCase()}</td>
                    </tr>)}
                </table>
                <div className={saveButtonStyle} onClick={updateTypeRepetition}>Сохранить</div>
        </div>
    )
}