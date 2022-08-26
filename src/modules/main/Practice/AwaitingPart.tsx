import React, {FC} from "react";
import TimeAgo from 'javascript-time-ago'
import s from "./awaiting.module.scss"
import en from 'javascript-time-ago/locale/en.json'
import moment from "moment";

// TimeAgo.addDefaultLocale(en)
TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)

type AwaitingPartPropsType = {
    sentence: string,
    waitTill: string
    index: number
}

export const AwaitingPart: FC<AwaitingPartPropsType> = (props) => {

    let opacityText = (100 - props.index * 10) / 100;
    let awaitDate = moment(props.waitTill, "DD-MM-YYYY HH:mm:ss").format("DD.MM - HH:mm" )
    return (
        <div className={s.sentenceAndDate} style={{opacity: opacityText}}>
            <div className={s.awaitSentence}>{props.sentence}</div>
            <div className={s.awaitDate}>{awaitDate}</div>
        </div>
    )
}