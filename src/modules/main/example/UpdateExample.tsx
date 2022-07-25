import React, {FC, useState} from "react";
import {useAppDispatch} from "../../../store";
import s from "./Example.module.css";
import common from "../common.module.css";
import {IEngWord, IExample, IMnemonic} from "../../../shared/models/engWordTypes";
import ExampleTranslations from "./ExampleTranslations";
import ExampleMnemonics from "./ExampleMnemonics";
import {
    checkExampleForUpdateAsync,
    checkExampleMnemonicForUpdateAsync,
    checkExampleTranslationForUpdateAsync,
    clearUpdateExample,
    updateExampleAsync
} from "../../../store/exampleSlice";
import NewExampleComponent from "./NewExampleComponent";
import {ReactComponent as CloseIcon} from "../../../import/icons/close-slim.svg";

type UpdateExamplePropsType = {
    engWord: IEngWord,
    mnemonics: Array<IMnemonic>,
    newExample: IExample,
    setEdit: (b: boolean) => void
}

const UpdateExample: FC<UpdateExamplePropsType> = (props) => {
    const dispatch = useAppDispatch();
    let [exampleSentence, setExampleSentence] = useState(props.newExample.sentence);
    let [edit, setEdit] = useState(false);

    let updateExampleSentence = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setExampleSentence(e.target.value)
    };

    let editExample = () => {
        setEdit(true);
    };

    let updateExample = () => {
        dispatch(updateExampleAsync(props.newExample!));
        setExampleSentence("");
        props.setEdit(false)
    };
    let closeForm = () => {
        setExampleSentence("");
        props.setEdit(false)
    }
    let selectTranslation = (translationId: number) => {
        dispatch(checkExampleTranslationForUpdateAsync(props.newExample.exampleId,translationId));
    };

    let selectMnemonic = (mnemonicId: number) => {
        dispatch(checkExampleMnemonicForUpdateAsync(props.newExample.exampleId, mnemonicId));
    };

    let initCheck = () => {
        checkExampleRequest();
        setEdit(false)
    };
    let checkExampleRequest = () => {
        dispatch(clearUpdateExample(props.newExample.exampleId))
        dispatch(checkExampleForUpdateAsync(props.newExample.exampleId, exampleSentence));
    };
    let displayStepComponent = () => {
        if ((!props.newExample || edit) && exampleSentence.length > 0) {
            return <div>
                <div onClick={initCheck} className={s.updateCheckButton}>Проверить</div>
            </div>

        } else if (props.newExample?.translationInSentence === null) {
            return (
                <div>
                    <p className={s.chooseTranslationHeader}>Выберите перевод</p>
                    <ExampleTranslations
                        translations={props.engWord.translations}
                        selectTranslation={selectTranslation}
                    />
                </div>
            )
        } else if (props.newExample?.mnemonicInSentence === null) {
            return (
                <div>
                    <p className={s.chooseTranslationHeader}>Выберите мнемоники</p>
                    <ExampleMnemonics mnemonics={props.mnemonics} selectMnemonic={selectMnemonic}/>
                </div>
            )
        } else if (props.newExample?.translationInSentence && props.newExample?.mnemonicInSentence) {
            return <div>
                <div  onClick={updateExample} className={s.updateCheckButton}>Сохранить</div>
            </div>
        }
    };

    return (
        <div className={s.updateExample}>
            <div className={common.closeButtonBox} onClick={closeForm}>
                <div>
                    <CloseIcon/>
                </div>
            </div >
            <div className={s.inputNewExample}>
                    <div>
                        {!props.newExample || edit ?
                            <textarea value={exampleSentence}
                                      onChange={updateExampleSentence}
                                      placeholder={"добавить пример"}
                                      className={s.newExampleTextArea}
                                      autoFocus={true}
                            /> :
                            <div onClick={editExample}>
                                <NewExampleComponent example={props.newExample}/>
                            </div>
                        }
                    </div>
            </div>
            <div>
                {displayStepComponent()}
            </div>
        </div>
    )
};


export default UpdateExample;