import React, {FC, useState} from "react";
import {
    ITranscription,
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
import {ReactComponent as Trash} from "../../../import/icons/trash-bin.svg";
import {useAppDispatch} from "../../../store";
import {deleteThisMnemonicAsync} from "../../../store/userSlice";
import {DeleteModal} from "../Modal/DeleteModal";
import {isExpired} from "../../util/utilFunctions";

type UserPageContainerPropsType = {
    createExampleMap: Array<NewStudyExample>,
    studyId: number,
    mnemonic: StudyMnemonic,
    engWord: StudyEngWord,
    examples: Array<StudyExample>
    translations: Array<ITranslation>
    transcriptions: Array<ITranscription>
}
export const UserPage: FC<UserPageContainerPropsType> = (props) => {
    const dispatch = useAppDispatch()

    const [displayAddMyExample, isDisplayAddMyExample] = useState(false)
    const [bold, setBold] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const closeDeleteModal = () => {
        setShowDeleteModal(false)
    }
    let pushBold = () => {
        setBold(!bold)
    };
    const navigate = useNavigate()
    const clickWord = () => {
        let word = props.engWord.word
        navigate(`/eng/${word}`)
    }

    const getBoldIcon = () => {
        return bold ? <Bold/> : <NotBold/>
    }
    const getLikeIcon = () => {
        return props.mnemonic.likes > 0 ? <HeartYes/> : <Heart/>
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
                    <div className={s.likeIcon}> {getLikeIcon()} </div>
                    <div className={s.boldIcon} onClick={pushBold}>{getBoldIcon()}</div>
                    {!isExpired(props.mnemonic.created) && props.examples.length === 0 &&
                        <div className={s.trash} onClick={() => setShowDeleteModal(true)}>
                            <Trash/>
                        </div>
                    }
                </div>
            </div>

            <div>
                {props.examples.map(ex =>
                    <div key={ex.id}>
                        <MyStudyExample
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
                show={showDeleteModal}
                close={closeDeleteModal}
                delete={deleteThisMnemonic}
            />
        </div>
    )
}