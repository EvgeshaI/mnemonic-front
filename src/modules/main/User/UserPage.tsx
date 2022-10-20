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

import {useAppDispatch} from "../../../store";

import {MyStudyMnemonic} from "./MyStudyMnemonic";

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

    // let findExample = () => {
    //     const newStudyExample = props.createExampleMap.find(el => el.studyId === props.studyId);
    //     if (newStudyExample) {
    //         return newStudyExample.example
    //     }
    //     return null
    // }



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
                            {props.examples.map(ex => {
                                    if (ex.mnemonicId === mnemo.id) {
                                        return <div key={ex.id}>
                                            <MyStudyExample
                                                parts={ex.parts}
                                                exampleId={ex.id}
                                                exampleLikes={ex.likes}
                                                created={ex.created}
                                            />
                                        </div>
                                    }
                                    return <></>
                                }
                            )}
                        </div>
                    </>
                )
                }
            </div>



            {/*{displayAddMyExample ?*/}
            {/*    <AddMyExample*/}
            {/*        // studyId={props.studyId}*/}
            {/*        engWordId={props.engWord.id}*/}
            {/*        // mnemonicId={props.mnemonic.id}*/}
            {/*        translations={props.translations}*/}
            {/*        // newExample={findExample()}*/}
            {/*        isDisplayAddMyExample={isDisplayAddMyExample}*/}
            {/*    />*/}
            {/*    :*/}
            {/*    <div className={s.addEx}>*/}
            {/*        <div className={s.buttonStyle}*/}
            {/*             onClick={() => isDisplayAddMyExample(true)}>*/}
            {/*            <Add/>*/}
            {/*        </div>*/}
            {/*        <div className={s.prompt}> Добавить пример </div>*/}
            {/*    </div>*/}
            {/*}*/}

        </div>
    )
}