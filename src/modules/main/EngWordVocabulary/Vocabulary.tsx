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
    return (
        <>
            <div className={s.vocabularyLetter}>{props.letter.toUpperCase()}</div>
            <div className={s.vocabularyWordsContainer}>{props.vocabularies.map((el, i) =>
                <div className={s.vocabularyWords} key={i} >
                    <div className={s.vocabularyWord} onClick={() => goToWord(el.engWord)}>{el.engWord}</div>
                </div>)}
            </div>
        </>
    )
}