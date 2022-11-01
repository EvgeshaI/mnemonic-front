import React, {FC, useState} from "react";
import {
    ITranscription,
    ITranslation,
    NewStudyExample,
    StudyEngWord,
    StudyExample,
    StudyMnemonic
} from "../../../shared/models/engWordTypes";
import s from "./userPage.module.scss"
import {useNavigate} from "react-router";
import {MyStudyExample} from "./MyStudyExample";
import {AudioComponent} from "../EngWord/AudioComponent";
import {ReactComponent as Add} from "../../../import/icons/add.svg";
import {useAppDispatch} from "../../../store";
import {MyStudyMnemonic} from "./MyStudyMnemonic";
import {AddMyExample} from "./AddMyExample";

type UserPageContainerPropsType = {
    createExampleMap: Array<NewStudyExample>,
    // studyId: number,
    mnemonics: Array<StudyMnemonic>,
    engWord: StudyEngWord,
    examples: Array<StudyExample>
    translations: Array<ITranslation>
    transcriptions: Array<ITranscription>
}
export const UserPage: FC<UserPageContainerPropsType> = (props) => {
    const dispatch = useAppDispatch()
    const [displayAddMyExample, isDisplayAddMyExample] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const closeDeleteModal = () => {
        setShowDeleteModal(false)
    }
    const navigate = useNavigate()
    const clickWord = () => {
        let word = props.engWord.word
        navigate(`/eng/${word}`)
    }
    let findExample = (engWordId: number) => {
        const newStudyExample = props.createExampleMap.find(el => el.engWordId === engWordId);
        if (newStudyExample) {
            return newStudyExample.example
        }
        return null
    }
    let joinTranslation = (translations: Array<ITranslation>) => {
        return translations.filter((el, i)=> i < 4).map(t => t.translation).join(", ");
    };

    let findTranscription = () => {
        let transcript = props.transcriptions.find(el => el.location === "AMERICAN")
        if(transcript){
            return transcript
        }
        return props.transcriptions.find(el => el.location === "BRITISH")
    }

    let transcription = findTranscription()

    return (
        <div className={s.userContainer}>
            <div className={s.engWordBox}>
                <div className={s.engWord} onClick={clickWord}>{props.engWord.word}</div>
                {transcription &&
                    <div className={s.transcriptionsAudio}>
                        <AudioComponent audioFile={transcription.audioFile}/>
                    </div>
                }
            </div>

            <div className={s.translations}> {joinTranslation(props.translations)}</div>
            <div>
                {props.mnemonics.map(mnemo =>
                        <>
                            <MyStudyMnemonic mnemonic={mnemo} examples={props.examples}/>
                            <div>
                                {props.examples.filter(ex => ex.mnemonicId === mnemo.id).map(ex =>
                                    <MyStudyExample
                                        parts={ex.parts}
                                        exampleId={ex.id}
                                        exampleLikes={ex.likes}
                                        created={ex.created}
                                    />
                                )}
                            </div>
                        </>
                    )
                }
            </div>
            {displayAddMyExample ?
                <AddMyExample
                    engWordId={props.engWord.id}
                    translations={props.translations}
                    newExample={findExample(props.engWord.id)}
                    isDisplayAddMyExample={isDisplayAddMyExample}
                />
                :
                <div className={s.addEx}>
                    <div className={s.buttonStyle}
                         onClick={() => isDisplayAddMyExample(true)}>
                        <Add/>
                    </div>
                    <div className={s.prompt}> Добавить пример </div>
                </div>
            }

        </div>
    )
}