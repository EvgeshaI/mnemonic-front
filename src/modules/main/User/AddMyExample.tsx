import React, {FC, useState} from "react";
import s from "./userPage.module.css"
import {
    checkMyExampleAsync,
    checkMyExampleTranslationAsync,
    deleteNewExample,
    saveMyExampleAsync,
    setMyExample
} from "../../../store/userSlice";
import {useAppDispatch} from "../../../store";
import {IExample, ITranslation} from "../../../shared/models/engWordTypes";
import NewExampleComponent from "../example/NewExampleComponent";
import ExampleTranslations from "../example/ExampleTranslations";
import {CloseBtn} from "../../util/CloseBtn";

type AddMyExamplePropsType = {
    newExample: IExample | null,
    studyId: number,
    engWordId: number,
    mnemonicId: number,
    translations: Array<ITranslation>
    isDisplayAddMyExample: (flag: boolean) => void
}
export const AddMyExample: FC<AddMyExamplePropsType> = (props) => {
    const dispatch = useAppDispatch();
    const [myExampleSentence, setMyExampleSentence] = useState('')
    const updateMyExample = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMyExampleSentence(e.target.value)
    }
    const [edit, setEdit] = useState(false)

    const checkMyExample = ()=> {
        dispatch(checkMyExampleAsync(props.engWordId, myExampleSentence, props.mnemonicId, props.studyId))
        setEdit(false)
    }
    let selectTranslation = (translationId: number) => {
        dispatch(checkMyExampleTranslationAsync(translationId, props.studyId));
    };

    const saveMyExample = () => {
        dispatch(saveMyExampleAsync(props.studyId, props.newExample!))
        props.isDisplayAddMyExample(false)
        dispatch(setMyExample({studyId: props.studyId, example:null}))
    }
    const editSentence = () => {
        setEdit(true)
        dispatch(setMyExample({studyId: props.studyId, example:null}))
    }
    const closeForm = () => {
        dispatch(deleteNewExample(props.studyId))
        setMyExampleSentence('');
        setEdit(true)
        props.isDisplayAddMyExample(false)
    }
    const displayCurrentStep = () => {
        if(!props.newExample && myExampleSentence.length > 0) {
            return <div className={s.addMyExample} onClick={checkMyExample}>Проверить</div>
        } else if (props.newExample && !props.newExample.translationInSentence){
            return (
                <div>
                    <p className={s.chooseTranslationHeader}>Выберите перевод:</p>
                    <ExampleTranslations
                        translations={props.translations}
                        selectTranslation={selectTranslation}
                    />
                </div>
            )
        }else if (props.newExample && props.newExample.translationInSentence) {
            return (
                <div className={s.saveButtonStyleBox}>
                    <div onClick={saveMyExample} className={s.saveButtonStyle}>Сохранить</div>
                </div>
            )
        }
    }
    return (
        <div>
            <CloseBtn close={closeForm}/>
            {props.newExample && !edit ?
                <div onClick={editSentence}>
                    <NewExampleComponent example={props.newExample}/>
                </div>
                :
                <div className={s.inputExample}>
                    <textarea placeholder={"добавьте пример"}
                              value={myExampleSentence}
                              autoFocus={true}
                              onChange={updateMyExample}/>
                </div>
            }
            {displayCurrentStep()}
        </div>
    )
}