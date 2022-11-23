import React, {FC} from "react";
import s from "./vocabulary.module.scss"
import {useNavigate} from "react-router";
import {IVocabulary} from "../../../shared/models/engWordTypes";

type VocabularyPropsType = {
    letter: string,
    vocabularies: Array<IVocabulary>

}
export const Vocabulary: FC<VocabularyPropsType> = (props) => {
    const navigate = useNavigate()
    const goToWord = (word: string) => {
        navigate(`/eng/${word}`)
    }
    // let vocabulariesSort = [...props.vocabularies].sort((a, b) => a.engWord.length - b.engWord.length)
    return (
        <>
            <div className={s.vocabularyLetter}>{props.letter.toUpperCase()}</div>
            <div className={s.vocabularyWordsContainer}>{props.vocabularies.map(el =>
                <div className={s.vocabularyWords} key={el.engWord} onClick={() => goToWord(el.engWord)}>
                    {el.engWord}
                </div>)}
            </div>
        </>
    )
}