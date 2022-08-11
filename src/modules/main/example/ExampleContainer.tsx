import React, {FC, useState} from "react";
import {IEngWord, IExample, IMnemonic} from "../../../shared/models/engWordTypes";
import s from "./Example.module.scss";
import ExampleComponent from "./ExampleComponent";
import CreateExample from "./CreateExample";
import {useNavigate} from "react-router";
import {useAppDispatch} from "../../../store";
import {getExampleAsync} from "../../../store/exampleSlice";

type PropsType = {
    engWord: IEngWord
    mnemonics: Array<IMnemonic>
    examples: Array<IExample>
    updateExample: IExample | null
    checkedExample: IExample | null
    updateExamples: Array<IExample>
    isAuth: boolean
    hasMoreExample: boolean
}

const ExampleContainer: FC<PropsType> = (props) => {
    const dispatch = useAppDispatch()
    let [clickCreateExample, setClickCreateExample] = useState(false);
    const navigate = useNavigate()
    let clickOnAddExample = () => {
        if(props.isAuth) {
            setClickCreateExample(!clickCreateExample)
        }else {
            navigate(`/login`)
        }
    }
    const loadExample = () => {
        dispatch(getExampleAsync(props.engWord.id))
    }
    const findUpdateExample = (exampleId: number) => {
       return props.updateExamples.find(ex => ex.exampleId === exampleId)
    }
    return (
        <div className={s.exampleContainer}>
            {props.examples.map(ex =>
                <ExampleComponent key={ex.exampleId}
                                  engWord={props.engWord}
                                  mnemonics={props.mnemonics}
                                  example={ex}
                                  auth={props.isAuth}
                                  updateExample={findUpdateExample(ex.exampleId)}/>)
            }
            {clickCreateExample ?
                <CreateExample
                    engWord={props.engWord}
                    mnemonics={props.mnemonics}
                    newExample={props.checkedExample}
                    afterSaveClick={clickOnAddExample}
                />
                :
                <div>
                    {props.mnemonics.length > 0 &&
                        <div className={s.addExampleBox}>
                            <div className={s.addExampleButton} onClick={clickOnAddExample}>
                                +
                            </div>
                            <div className={s.addTooltip}> Добавить пример </div>
                        </div>
                    }
                </div>
            }
            {props.hasMoreExample &&
                <div className={s.loadExample} onClick={loadExample}>Загрузить ещё</div>
            }
        </div>
    )
}
export default ExampleContainer