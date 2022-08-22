import React, {FC} from "react";
import {IPracticeExample} from "../../../shared/models/engWordTypes";
import {SentenceFormat0} from "./SentenceFormat0";
import {SentenceFormat1} from "./SentenceFormat1";

type SentencePropsType = {
    count: number,
    currentExample: IPracticeExample
}

export const Sentence: FC<SentencePropsType> = (props) => {
    return (
        <div>
            {props.count === 2 ?
                <>{props?.currentExample?.sentence}</>
            : props.count === 1 ?
                <SentenceFormat1
                    parts={props?.currentExample.parts}
                    mnemonicInSentence={props.currentExample.mnemonicInSentence}
                    sentence={props?.currentExample.sentence}
                />
            :
                <SentenceFormat0
                    parts={props?.currentExample.parts}/>
            }
        </div>
    )
}