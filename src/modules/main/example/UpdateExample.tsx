import React, {FC, useState} from "react";
import {useAppDispatch} from "../../../store";
import s from "./Example.module.css";
import {IEngWord, IExample, IMnemonic} from "../../../shared/models/engWordTypes";
import ExampleTranslation from "./ExampleTranslationComponent";
import ExampleMnemonic from "./ExampleMnemonic";
import {
    checkExampleForUpdateAsync,
    checkExampleMnemonicForUpdateAsync,
    checkExampleTranslationForUpdateAsync,
    updateExampleAsync
} from "../../../store/engWordSlice";
import NewExampleComponent from "./NewExampleComponent";
import {ReactComponent as CloseIcon} from "../../../import/icons/close-slim.svg";

const UpdateExample: FC<{engWord: IEngWord | null, mnemonics: Array<IMnemonic>, newExample: IExample, setEdit: (b: boolean) => void}> = (props) => {
    const dispatch = useAppDispatch();
    let [exampleSentence, setExampleSentence] = useState(props.newExample.sentence);
    let [step, setStep] = useState(1);
    let [edit, setEdit] = useState(false);

    let updateExampleSentence = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setExampleSentence(e.target.value)
    };

    let editExample = () => {
        setEdit(true);
        setStep(1)
    };

    let updateExample = () => {
        dispatch(updateExampleAsync(props.newExample!));
        setExampleSentence("");
        setStep(1);
        props.setEdit(false)
    };
    let closeForm = () => {
        setExampleSentence("");
        setStep(1);
        props.setEdit(false)
    }
    let nextStep = () => {
        setStep(step + 1)
    };
    let selectTranslation = (translationId: number) => {
        dispatch(checkExampleTranslationForUpdateAsync(translationId));
    };

    let selectMnemonic = (mnemonicId: number) => {
        dispatch(checkExampleMnemonicForUpdateAsync(mnemonicId));
    };

    let initCheck = () => {
        checkExampleRequest();
        nextStep();
        setEdit(false)
    };
    let checkExampleRequest = () => {
        dispatch(checkExampleForUpdateAsync(exampleSentence));
    };
    let displayStepComponent = () => {
        if (step === 1 && exampleSentence.length > 0) {
            return <div>
                <div onClick={initCheck} className={s.updateCheckButton}>Проверить</div>
            </div>

        } else if (props.newExample?.translationInSentence === null && step !== 1) {
            return (
                <div>
                    <p className={s.chooseTranslationHeader}>Выберите перевод</p>
                    <div className={s.translationSelect}>
                        {props.engWord!.translations
                            .map(t =>
                                <ExampleTranslation selectTranslation={selectTranslation} translation={t}/>
                            )}
                    </div>
                </div>
            )
        } else if (props.newExample?.mnemonicInSentence === null && step !== 1) {
            return (
                <div>
                    <p className={s.chooseTranslationHeader}>Выберите мнемоники</p>
                    <div className={s.mnemonicSelect}>
                        {props.mnemonics.map(m =>
                            <ExampleMnemonic
                                selectMnemonic={selectMnemonic}
                                mnemonic={m}/>)}
                    </div>
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
            <div className={s.closeButtonBox} onClick={closeForm}>
                <div>
                    <CloseIcon/>
                </div>
            </div >
            <div className={s.inputNewExample}>
                    <div>
                        {edit ?
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