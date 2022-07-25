import React, {FC} from "react";
import {IExample} from "../../../shared/models/engWordTypes";
import s from "./Example.module.css";
import {ExampleFormat} from "./ExampleFormat";


type PropsType = {
    example: IExample
}
const NewExampleComponent: FC<PropsType> = (props) => {

    return (
        <div className={s.exampleContainer}>
            <div className={s.newExampleSentence}>
                <ExampleFormat parts={props.example.parts}/>
            </div>
        </div>
    )
};

export default NewExampleComponent