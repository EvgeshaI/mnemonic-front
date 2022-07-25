import React, {FC, useEffect, useState} from "react";
import {useAppDispatch} from "../../../store";
import s from "./Example.module.css";
import {IEngWord, IExample, IMnemonic} from "../../../shared/models/engWordTypes";
import ExampleTranslations from "./ExampleTranslations";
import ExampleMnemonics from "./ExampleMnemonics";
import {
    checkExampleForCreateAsync,
    checkExampleMnemonicAsync,
    checkExampleTranslationAsync,
    clearCheckedExample,
    saveExampleAsync
} from "../../../store/exampleSlice";
import NewExampleComponent from "./NewExampleComponent";
import {CloseBtn} from "../../util/CloseBtn";

type PropsType = {
    engWord: IEngWord,
    mnemonics: Array<IMnemonic>,
    newExample: IExample | null
    afterSaveClick: () => void
}

const CreateExample: FC<PropsType> = (props) => {
    const dispatch = useAppDispatch();
    let [exampleSentence, setExampleSentence] = useState("");
    let [edit, setEdit] = useState(false);

    let updateExample = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setExampleSentence(e.target.value)
    };

    let editExample = () => {
        setEdit(true);
    };

    useEffect( () => {
        return () => {
            dispatch(clearCheckedExample())
        }
    }, [])

    let saveExample = () => {
        dispatch(saveExampleAsync(props.newExample!));
        setExampleSentence("");
        props.afterSaveClick()
    };

    let closeForm = () => {
        setExampleSentence("");
        props.afterSaveClick()
    }

    let selectTranslation = (translationId: number) => {
        dispatch(checkExampleTranslationAsync(translationId));
    };

    let selectMnemonic = (mnemonicId: number) => {
        dispatch(checkExampleMnemonicAsync(mnemonicId));
    };

    let initCheck = () => {
        checkExampleRequest();
        setEdit(false)
    };
    let checkExampleRequest = () => {
        dispatch(clearCheckedExample())
        dispatch(checkExampleForCreateAsync(props.engWord.id, exampleSentence));
    };
    let displayStepComponent = () => {
        if ((!props.newExample || edit) && exampleSentence.length > 0) {
            return <div>
                    <div onClick={initCheck} className={s.buttonStyle}>Проверить</div>
                </div>

        } else if (props.newExample?.translationInSentence === null) {
            return (
                <div>
                    <p className={s.chooseTranslationHeader}>Выберите перевод:</p>
                    <ExampleTranslations
                        translations={props.engWord.translations}
                        selectTranslation={selectTranslation}
                    />
                </div>
            )
        } else if (props.newExample?.mnemonicInSentence === null) {
            return (
                <div>
                    <p className={s.chooseTranslationHeader}>Выберите мнемонику:</p>
                    <ExampleMnemonics mnemonics={props.mnemonics} selectMnemonic={selectMnemonic}/>
                </div>
            )
        } else if (props.newExample?.translationInSentence && props.newExample?.mnemonicInSentence) {
            return <div>
                <div onClick={saveExample} className={s.buttonStyle}>Сохранить</div>
            </div>
        }
    };

    return (
        <div className={s.createExample}>
            <CloseBtn close={closeForm}/>
            <div className={s.inputNewExample}>
                {!props.newExample || edit ?
                    <textarea value={exampleSentence}
                              onChange={updateExample}
                              placeholder={"добавить пример"}
                              className={s.newExampleTextArea}
                              autoFocus={true}
                    /> :
                    <div onClick={editExample}>
                        <NewExampleComponent example={props.newExample}/>
                    </div>
                }
            </div>
            <div>
                {displayStepComponent()}
            </div>
        </div>
    )
};

export default CreateExample;