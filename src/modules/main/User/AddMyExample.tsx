import React, {FC, useState} from "react";
import s from "./userPage.module.css"
import {
    checkMyExampleAsync,
    checkMyExampleTranslationAsync,
    saveMyExampleAsync,
    setMyExample
} from "../../../store/userSlice";
import {useAppDispatch, useAppSelector} from "../../../store";
import {ITranslation} from "../../../shared/models/engWordTypes";
import NewExampleComponent from "../example/NewExampleComponent";
import ExampleTranslation from "../example/ExampleTranslationComponent";
import {ReactComponent as CloseIcon} from "../../../import/icons/close-slim.svg";

type AddMyExamplePropsType = {
    studyId: number,
    engWordId: number,
    mnemonicId: number,
    translations: Array<ITranslation>
    isDisplayAddMyExample: (flag: boolean) => void
}
export const AddMyExample: FC<AddMyExamplePropsType> = (props) => {
    const {
        createMyExample
    } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const [myExampleSentence, setMyExampleSentence] = useState('')
    const updateMyExample = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMyExampleSentence(e.target.value)
    }
    const [edit, setEdit] = useState(false)

    const checkMyExample = ()=> {
        dispatch(checkMyExampleAsync(props.engWordId, myExampleSentence, props.mnemonicId))
        setEdit(false)
    }
    let selectTranslation = (translationId: number) => {
        dispatch(checkMyExampleTranslationAsync(translationId));
    };

    const saveMyExample = () => {
        dispatch(saveMyExampleAsync(props.studyId, createMyExample!))
        props.isDisplayAddMyExample(false)
        dispatch(setMyExample(null))
    }
    const editSentence = () => {
        setEdit(true)
        dispatch(setMyExample(null))
    }
    const closeForm = () => {
        setMyExampleSentence("");
        setEdit(true)
        props.isDisplayAddMyExample(false)
    }
    const displayCurrentStep = () => {
        if(!createMyExample && myExampleSentence.length > 0) {
            return <div className={s.addMyExample} onClick={checkMyExample}>Проверить</div>
        } else if (createMyExample && !createMyExample.translationInSentence){
            return (
                <div>
                    <p className={s.chooseTranslationHeader}>Выберите перевод:</p>
                    <div>
                        <ul className={s.translationSelect}>
                            {props.translations
                                .map(t =>
                                    <ExampleTranslation selectTranslation={selectTranslation} translation={t}/>
                                )}
                        </ul>
                    </div>
                </div>
            )
        }else if (createMyExample && createMyExample.translationInSentence) {
            return (
                <div className={s.saveButtonStyleBox}>
                    <div onClick={saveMyExample} className={s.saveButtonStyle}>Сохранить</div>
                </div>
            )
        }
    }
    return (
        <div>
            <div className={s.closeButtonBox} onClick={closeForm}>
                <div>
                    <CloseIcon/>
                </div>
            </div >
            {createMyExample && !edit ?
                <div onClick={editSentence}>
                    <NewExampleComponent example={createMyExample}/>
                </div>
                :
                <div className={s.inputExample}>
                    <textarea placeholder={"добавьте пример"}
                              value={myExampleSentence}
                              onChange={updateMyExample}/>
                </div>

            }

            {displayCurrentStep()}

        </div>
    )
}