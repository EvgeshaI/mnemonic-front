import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../store";
import s from "./vocabulary.module.scss"
import {Vocabulary} from "./Vocabulary";
import {getEngWordVocabulary} from "../../../store/engWordSlice";

export const EngWordVocabulary = () => {
    const dispatch = useAppDispatch()
    const {
        engWordVocabulary
    } = useAppSelector((state) => state.engWordReducer);
    useEffect(() => {
        dispatch(getEngWordVocabulary())
    })
    return (
        <div className={s.engWordVocabulary}>
            {engWordVocabulary.map((el, i) => <Vocabulary key={i} letter={el.letter} vocabularies={el.vocabularies}/>)}
        </div>
    )
}