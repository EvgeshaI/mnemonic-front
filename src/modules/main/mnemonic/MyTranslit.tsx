import React, {FC, useEffect, useState} from "react";
import s from './mnemonic.module.scss';
import {ITransliteration} from "../../../shared/models/engWordTypes";
import {useAppDispatch} from "../../../store";
import {updateAccuracy, updateCreateAccuracy} from "../../../store/mnemonicSlice";

type PropsType = {
    word: string,
    highlight: Array<number>,
    accuracy: number,
    trans: Array<ITransliteration>,
    isCreate: boolean
}

const MyTranslit: FC<PropsType> = (props) => {
    const dispatch = useAppDispatch()
    let [myTranslit, setMyTranslit] = useState('')

    let myMnemo = () => {
            let highlight = [...props.highlight].sort((a,b) => a-b)
            let selected = []
            for (let i =0; i< highlight.length; i++){
                const number = highlight[i];
                selected.push(props.word[number].toLowerCase())
            }
            setMyTranslit(selected.join(''))
    }

    useEffect(() => {
        myMnemo()
    },[props.highlight])
    useEffect(() => {
        if(props.isCreate) {
            dispatch(updateCreateAccuracy(calculateAccuracy()))
        }else {
            dispatch(updateAccuracy(calculateAccuracy()))
        }
    },[myTranslit])

    let calculateAccuracy = () => {
        return findMaxPoint(myTranslit, props.trans)
    }

    let findMaxPoint = (highlightMnemo: string, trans: Array<ITransliteration>): number => {
        let max = 0
        for (let i=0; i < trans.length; i++){
            let tran = trans[i];
            let points = amountOfPoint(tran, highlightMnemo)
            if(points >= max) {
                max = points
            }
        }
        return max
    }

    let amountOfPoint = (trans: ITransliteration, highlightMnemo: string) => {
        let transliteration = trans.transliteration
        let oneLetterPoint = trans.accuracy / transliteration.length
        let totalPoint = 0
        let index
        for (let i=0; i<highlightMnemo.length; i++){
            if(transliteration.includes(highlightMnemo[i])) {
                index = transliteration.indexOf(highlightMnemo[i])
                transliteration = transliteration.substring(index + 1)
                totalPoint += oneLetterPoint
            }
        }
        return totalPoint
    }

    return (
        <li className={s.myTransliteration}>
            {`${myTranslit} ${Math.round(props.accuracy)}%`}
        </li>
    )
};

export default MyTranslit;