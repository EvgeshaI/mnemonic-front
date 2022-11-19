import React, {FC, useState} from "react";
import s from "./myProfile.module.scss"
import {useAppDispatch} from "../../../store";
import {updateRepetitionType} from "../../../store/userSlice";
import {ITypeOfRepetition, repetitionType, RepetitionType} from "../../../shared/models/engWordTypes";
import {RadioBtn} from "./RadioBtn";

type TypeOfPracticePropsType = {
    userTypeRepetition: ITypeOfRepetition
}
export const TypeOfPractice:FC<TypeOfPracticePropsType> = (props) => {
    const dispatch = useAppDispatch()
    const [type, setType] = useState<RepetitionType>(props.userTypeRepetition.userRepetition)

    const updateTypeRepetition = () => {
        if(props.userTypeRepetition.userRepetition !== type){
            dispatch(updateRepetitionType(type))
        }
    }
    const changeRepetitionType = (type: RepetitionType) => {
        setType(type)
    }
    let saveButtonStyle = props.userTypeRepetition.userRepetition === type ?
        s.saveTypeRepetitionDisable : s.saveTypeRepetition
    const getPractice = () => {
        return props.userTypeRepetition.practices.find(el => el.repetitionType === type)
    }
    return(
        <div className={s.tableBox}>
            <div className={s.typesPractice}>
                {Object.keys(repetitionType).map(el =>
                    <RadioBtn valueBtn={el as RepetitionType}
                              active={el == type}
                              changeRepetitionType={changeRepetitionType}
                    />)}
            </div>
                <table className={s.table}>
                    <tr>
                        <th>этап</th>
                        <th>количество</th>
                        <th>единицы</th>
                    </tr>
                    {getPractice()?.stages.filter((el, i) => i>0).map((el, i) =>
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