import React, {FC, useState} from "react";
import {ITranslation, StudyEngWord, StudyExample, StudyMnemonic} from "../../../shared/models/engWordTypes";
import s from "./userPage.module.css"
import {ReactComponent as Heart} from "../../../import/icons/heart.svg"
import {ReactComponent as HeartYes} from "../../../import/icons/heart-clicked.svg"
import {ReactComponent as Bold} from "../../../import/icons/bold1.svg"
import {ReactComponent as NotBold} from "../../../import/icons/bold2.svg"
import {useNavigate} from "react-router";
import {AddMyExample} from "./AddMyExample";
import {MyStudyExample} from "./MyStudyExample";
import HighlightMnemonic from "../mnemonic/HighlightMnemonic";

type UserPageContainerPropsType = {
    studyId: number,
    mnemonic: StudyMnemonic,
    engWord: StudyEngWord,
    examples: Array<StudyExample>
    translations: Array<ITranslation>
}
export const UserPageContainer: FC<UserPageContainerPropsType> = (props) => {
    let joinTranslation = (translations: Array<ITranslation>) => {
        return translations.map(t => t.translation).join(", ");
    };

    const [displayAddMyExample, isDisplayAddMyExample] = useState(false)
    const [bold, setBold] = useState<boolean>(false);
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
    if(props.mnemonic.likes>0){
        like = <HeartYes/>
    }
    return (
        <div className={s.userContainer}>
            <div className={s.engWord} onClick={clickWord}>{props.engWord.word}</div>
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
                    <div className={s.icon}> {like} </div>
                    <div className={s.boldIcon} onClick={pushBold}>  {boldIcon} </div>
                </div>


            </div>
            {props.examples.map(ex => <div>
                    <MyStudyExample
                        parts={ex.parts}
                        exampleId={ex.id}
                        exampleLikes={ex.likes}
                    />
                </div>
            )}

            {displayAddMyExample ?
                <AddMyExample
                    studyId={props.studyId}
                    engWordId={props.engWord.id}
                    mnemonicId={props.mnemonic.id}
                    translations={props.translations}
                    isDisplayAddMyExample={isDisplayAddMyExample}
                />
                :
                <div className={s.buttonStyle}
                     onClick={() => isDisplayAddMyExample(true)}>
                    Добавить пример
                </div>

            }
        </div>
    )
}