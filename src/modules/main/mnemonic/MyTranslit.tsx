import React, {FC} from "react";
import s from './mnemonic.module.css';
import {ITransliteration} from "../../../shared/models/engWordTypes";

type PropsType = {
    word: string,
    highlight: Array<number>,
    trans: Array<ITransliteration>
}

const MyTranslit: FC<PropsType> = (props) => {
    let myTranslit = [] as Array<string>
    let myMnemo = (myWord: string, arrId: Array<number>) => {
        arrId = arrId.sort((a,b) => a-b)
        for (let i =0; i< arrId.length; i++){
            myTranslit.push(myWord[arrId[i]])
        }
        return `${myTranslit.join('')} ${Math.round(calculateAccuracy())}%`
    }

    let calculateAccuracy = () => {
        let highlightMnemo = myTranslit.join('')
        let maxTranslit = findMaxTrans(highlightMnemo, props.trans)
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
                {myMnemo(props.word, props.highlight)}
            </li>

    )
};

export default MyTranslit;