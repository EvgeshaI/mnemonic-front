import React, {FC, useState} from "react";
import {IEngWord, IExample, IMnemonic} from "../../../shared/models/engWordTypes";
import s from "./Example.module.css";
import ExampleComponent from "./ExampleComponent";
import CreateExample from "./CreateExample";
import {useNavigate} from "react-router";

type PropsType = {
    engWord: IEngWord
    mnemonics: Array<IMnemonic>
    examples: Array<IExample>
    updateExample: IExample | null
    checkedExample: IExample | null
    isAuth: boolean
}

const ExampleContainer: FC<PropsType> = (props) => {

    let [clickCreateExample, setClickCreateExample] = useState(false);
    const navigate = useNavigate()
    let clickOnAddExample = () => {
        if(props.isAuth) {
            setClickCreateExample(!clickCreateExample)
        }else {
            navigate(`/login`)
        }

    }

    return (
        <div className={s.exampleContainer}>
            {props.examples.map(m => <ExampleComponent engWord={props.engWord}
                                                       mnemonics={props.mnemonics}
                                                       example={m}
                                                       auth={props.isAuth}
                                                       updateExample={props.updateExample}/>)}
            {clickCreateExample ?
                <CreateExample
                    engWord={props.engWord}
                    mnemonics={props.mnemonics}
                    newExample={props.checkedExample}
                    afterSaveClick={clickOnAddExample}
                />
                :<div>
                    {props.mnemonics.length > 0 &&

                        <div className={s.addExampleBox}>
                            <div className={s.addExampleButton} onClick={clickOnAddExample}>
                                +
                            </div>
                            <div className={s.addExample}> Добавить пример </div>
                        </div>

                    }

                </div>
            }
        </div>
    )
}
export default ExampleContainer