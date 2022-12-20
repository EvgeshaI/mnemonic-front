import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../store";
import s from "./vocabulary.module.scss"
import {Vocabulary} from "./Vocabulary";
import {getEngWordVocabulary, resetVocabulary} from "../../../store/engWordSlice";
import {IVocabulary} from "../../../shared/models/engWordTypes";

export const EngWordVocabulary = () => {
    const dispatch = useAppDispatch()
    const {
        engWordVocabulary,
        hasMore
    } = useAppSelector((state) => state.engWordReducer);

    useEffect(() => {
        dispatch(getEngWordVocabulary())
    }, [])
    useEffect(() => {
        return () => {dispatch(resetVocabulary())}
    }, [])
    const vocabularies = () => {
        let map = new Map<string, Array<IVocabulary>>()
        if(engWordVocabulary){
            for (let vocabulary of engWordVocabulary){
                let key = vocabulary.engWord[0]
                if(map.has(key)){
                    map.get(key)!.push(vocabulary)
                }else{
                    map.set(key, [vocabulary])
                }
            }
        }
        return map
    }
    let letterAndVocabulary = vocabularies()

    const loadMnemo = () => {
        dispatch(getEngWordVocabulary())
    }
    return (
        <div className={s.engWordVocabulary}>
            {Array.from(letterAndVocabulary.keys()).map(letter =>
                <Vocabulary key={letter} letter={letter} vocabularies={letterAndVocabulary.get(letter)!}/>)}
            {hasMore && <button onClick={loadMnemo}>load</button> }
        </div>
    )
}