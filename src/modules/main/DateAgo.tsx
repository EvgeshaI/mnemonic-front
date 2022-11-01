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

    let result = moment(props.date, "DD-MM-YYYY HH:mm:ss").subtract(3, "hours")
    const offset = new Date().getTimezoneOffset();
    result = result.add(-1 * offset, 'minutes')
    return (
        <div>
            {result.fromNow()}
        </div>
    )
}