import React, {FC, useEffect, useState} from "react";
import s from './mnemonic.module.css';
import {ITransliteration} from "../../../shared/models/engWordTypes";

type PropsType = {
    word: string,
    highlight: Array<number>,
    trans: Array<ITransliteration>
    canSaveMnemonic: (accuracy: number) => void
}

const MyTranslit: FC<PropsType> = (props) => {
    let [myTranslit, setMyTranslit] = useState('')
    let [accuracy, setAccuracy] = useState(0)

    let myMnemo = () => {
        let highlight = props.highlight.sort((a,b) => a-b)
        let selected = []
        for (let i =0; i< highlight.length; i++){
            selected.push(props.word[highlight[i]])
        }
        setMyTranslit(selected.join(''))
    }

    useEffect(() => {
        myMnemo()
    },[props.highlight])
    useEffect(() => {
        setAccuracy(calculateAccuracy())
    },[myTranslit])
    useEffect(() => {
        props.canSaveMnemonic(accuracy)
    }, [accuracy])

    let calculateAccuracy = () => {
        let maxTranslit = findMaxTrans(myTranslit, props.trans)
        if (maxTranslit.tran) {
            return maxTranslit.tran!.accuracy/maxTranslit.tran!.transliteration.length * maxTranslit.count
        }
        return 0
    }

    let findMaxTrans = (highlightMnemo: string, trans: Array<ITransliteration>): {tran: ITransliteration | null, count: number} => {
        let max = 0
        let maxTran = null
        for (let i=0; i<trans.length; i++){
            let tran = trans[i];
            let count = amountOfMatches(tran.transliteration, highlightMnemo)
            if(count > max) {
                max = count
                maxTran = tran
            }
        }
        return {tran: maxTran, count: max}
    }
    let amountOfMatches = (trans: string, highlightMnemo: string) => {
        let count = 0
        let index
        for (let i=0; i< highlightMnemo.length; i++){
            if(trans.includes(highlightMnemo[i])) {
                index = trans.indexOf(highlightMnemo[i])
                trans = trans.substring(index + 1)
                count++
            }
        }
        return count
    }

    return (
            <li className={s.myTransliteration}>
                {`${myTranslit} ${Math.round(accuracy)}%`}
            </li>

    )
};

export default MyTranslit;