import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../store";
import s from "./vocabulary.module.scss"
import {Vocabulary} from "./Vocabulary";
import {getEngWordVocabulary} from "../../../store/engWordSlice";
import {IVocabulary, LetterAndVocabulary} from "../../../shared/models/engWordTypes";

export const EngWordVocabulary = () => {
    const dispatch = useAppDispatch()
    const {
        engWordVocabulary
    } = useAppSelector((state) => state.engWordReducer);
    useEffect(() => {
        dispatch(getEngWordVocabulary())
    }, [])
    const vocabularies = () => {
        let map = new Map<string, Array<IVocabulary>>()
        if(engWordVocabulary){
            for (let vocabulary of engWordVocabulary.vocabulary){
                let key = vocabulary.engWord[0]
                if(map.has(key)){
                    map.get(key)!.push(vocabulary)
                }else{
                    map.set(key, [vocabulary])
                }
            }
        }
        let letterAndVocabulary = [] as Array<LetterAndVocabulary>
        map.forEach((value: Array<IVocabulary>, key: string) => {
            letterAndVocabulary.push({letter: key, vocabularies: value})
        });
        return letterAndVocabulary
    }

    return (
        <div className={s.engWordVocabulary}>
            {vocabularies().map((el, i) => <Vocabulary key={i} letter={el.letter} vocabularies={el.vocabularies}/>)}
        </div>
    )
}