import React, {FC, useState} from "react";
import {
    ITranscriptions,
    ITranslation,
    NewStudyExample,
    StudyEngWord,
    StudyExample,
    StudyMnemonic
} from "../../../shared/models/engWordTypes";
import s from "./userPage.module.css"
import {ReactComponent as Heart} from "../../../import/icons/heart.svg"
import {ReactComponent as HeartYes} from "../../../import/icons/heart-clicked.svg"
import {ReactComponent as Bold} from "../../../import/icons/bold1.svg"
import {ReactComponent as NotBold} from "../../../import/icons/bold2.svg"
import {ReactComponent as Add} from "../../../import/icons/add.svg"
import {useNavigate} from "react-router";
import {AddMyExample} from "./AddMyExample";
import {MyStudyExample} from "./MyStudyExample";
import HighlightMnemonic from "../mnemonic/HighlightMnemonic";
import {AudioComponent} from "../EngWord/AudioComponent";
import moment from "moment";
import {ReactComponent as Trash} from "../../../import/icons/trash-bin.svg";
import {useAppDispatch} from "../../../store";
import {deleteThisMnemonicAsync} from "../../../store/userSlice";
import {DeleteModal} from "../Modal/DeleteModal";

type UserPageContainerPropsType = {
    createExampleMap: Array<NewStudyExample>,
    studyId: number,
    mnemonic: StudyMnemonic,
    engWord: StudyEngWord,
    examples: Array<StudyExample>
    translations: Array<ITranslation>
    transcriptions: Array<ITranscriptions>
}
export const UserPageContainer: FC<UserPageContainerPropsType> = (props) => {
    const dispatch = useAppDispatch()
    let joinTranslation = (translations: Array<ITranslation>) => {
        return translations.map(t => t.translation).join(", ");
    };

    const [displayAddMyExample, isDisplayAddMyExample] = useState(false)
    const [bold, setBold] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(false);
    const closeDeleteModal = () => {
        setShowModal(false)
    }
    const showDeleteModal = () => {
        setShowModal(true)
    }
    let pushBold = () => {
        setBold(!bold)
    };
    const navigate = useNavigate()
    const clickWord = () => {
        let word = props.engWord.word
        navigate(`/eng/${word}`)
    }
    let boldIcon = <NotBold/>;
    if (bold) {
        boldIcon = <Bold/>
    }
    let like = <Heart/>
    if (props.mnemonic.likes > 0) {
        like = <HeartYes/>
    }
    let isExpired = (created: string) => {
        let createdDate = moment(created, "DD-MM-YYYY HH:mm:ss")
        return createdDate.add(24, 'hours').isBefore(moment())
    }
    let findExample = () => {
        const newStudyExample = props.createExampleMap.find(el => el.studyId === props.studyId);
        if (newStudyExample) {
            return newStudyExample.example
        }
        return null
    }

    let deleteThisMnemonic = () => {
        dispatch(deleteThisMnemonicAsync(props.mnemonic.id))
    }
    let findTranscription = () => {
        let transcript = props.transcriptions.find(el => el.location === "AMERICAN")
        if(transcript){
            return transcript
        }
        return props.transcriptions.find(el => el.location === "BRITAIN")
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
            <div className={s.myMnemonicBox}>
                {bold ?
                    <div className={s.myMnemonic}>
                        <HighlightMnemonic highlight={props.mnemonic.highlight} mnemonic={props.mnemonic.phrase}/>
                    </div>
                    :
                    <div className={s.myMnemonic}>
                        {props.mnemonic.phrase}
                    </div>
                }
                <div className={s.icons}>
                    <div className={s.likeCount}> {props.mnemonic.likes} </div>
                    <div className={s.likeIcon}> {like} </div>
                    <div className={s.boldIcon} onClick={pushBold}>  {boldIcon} </div>
                    {!isExpired(props.mnemonic.created) &&
                        <div className={s.trash}
                            onClick={showDeleteModal}
                        ><Trash/>
                        </div>
                    }
                </div>
            </div>

            <div>
                {props.examples.map(ex => <div>
                        <MyStudyExample
                            key={ex.id}
                            parts={ex.parts}
                            exampleId={ex.id}
                            exampleLikes={ex.likes}
                            created = {ex.created}
                        />
                    </div>
                )}
            </div>

            {displayAddMyExample ?
                <AddMyExample
                    studyId={props.studyId}
                    engWordId={props.engWord.id}
                    mnemonicId={props.mnemonic.id}
                    translations={props.translations}
                    newExample={findExample()}
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
            <DeleteModal
                classElement={"мнемонику"}
                elementToDelete={props.mnemonic.phrase}
                show={showModal}
                close={closeDeleteModal}
                delete={deleteThisMnemonic}
            />

        </div>
    )
}