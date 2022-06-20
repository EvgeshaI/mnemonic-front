import React, {FC, useState} from "react";
import {IEngWord, IExample, IMnemonic} from "../../../shared/models/engWordTypes";
import s from "./Example.module.css";
import ExampleComponent from "./ExampleComponent";
import CreateExample from "./CreateExample";

type PropsType = {
    engWord: IEngWord
    mnemonics: Array<IMnemonic>
    examples: Array<IExample>
    updateExample: IExample | null
    checkedExample: IExample | null
}

const ExampleContainer: FC<PropsType> = (props) => {

    let [clickCreateExample, setClickCreateExample] = useState(false);

    let clickOnAddExample = () => {
        setClickCreateExample(!clickCreateExample)
    }

    return (
        <div className={s.exampleContainer}>
            {props.examples.map(m => <ExampleComponent engWord={props.engWord}
                                                 mnemonics={props.mnemonics}
                                                 example={m}
                                                 updateExample={props.updateExample}/>)}
            {clickCreateExample ?
                <CreateExample
                    engWord={props.engWord}
                    mnemonics={props.mnemonics}
                    newExample={props.checkedExample}
                    afterSaveClick={clickOnAddExample}
                />
                :
                <div className={s.addExampleButton} onClick={clickOnAddExample}>
                    Добавить пример
                </div>
            }
        </div>
    )
}
export default ExampleContainer