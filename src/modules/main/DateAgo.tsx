import React, {FC} from "react";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import moment from "moment";

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

type Props = {
    date: string
}
export const DateAgo:FC<Props> = (props) => {
    let turnedIntoDate = moment(props.date, "DD-MM-YYYY HH:mm:ss").fromNow()
    return (
        <div>
            {turnedIntoDate}

        </div>
    )
}