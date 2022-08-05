import React, {FC, useState} from "react";
import {IEngWord, IExample, IMnemonic} from "../../../shared/models/engWordTypes";
import s from "./Example.module.css";
import st from "../EngWord/EngWord.module.css";
import {useAppDispatch} from "../../../store";
import {
    addExampleLikeAsync,
    addUpdateExample,
    deleteExampleAsync,
    deleteExampleLikeAsync,
} from "../../../store/exampleSlice";
import {ReactComponent as HeartNo} from "../../../import/icons/heart.svg"
import {ReactComponent as HeartYes} from "../../../import/icons/heart-clicked.svg"
import {ReactComponent as GreyHeart} from "../../../import/icons/heart-grey.svg"
import {ReactComponent as Pencil} from "../../../import/icons/pencil.svg"
import {ReactComponent as Trash} from "../../../import/icons/trash-bin.svg"
import {ReactComponent as Bold} from "../../../import/icons/bold1.svg"
import {ReactComponent as NotBold} from "../../../import/icons/bold2.svg"
import UpdateExample from "./UpdateExample";
import {DateAgo} from "../DateAgo";
import {useNavigate} from "react-router";
import {DeleteModal} from "../Modal/DeleteModal";
import {ExampleFormat} from "./ExampleFormat";
import {isExpired} from "../../util/utilFunctions";
import useWindowDimensions from "../../util/windowDimensions";


type PropsType = {
    example: IExample,
    engWord: IEngWord,
    mnemonics: Array<IMnemonic>
    updateExample: IExample | undefined
    auth: boolean
}
const ExampleComponent: FC<PropsType> = (props) => {
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false);
    const [textFormat, setTextFormat] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { height, width } = useWindowDimensions();
    const isMobileScreen = width < 600
    const closeDeleteModal = () => {
        setShowDeleteModal(false)
    }
    let editExample = () => {
        dispatch(addUpdateExample(props.example))
        setEdit(true)
    };
    let clickTextFormat = () => {
        setTextFormat(!textFormat)
    }
    const navigate = useNavigate()

    let addLikeExample = () => {
        if (props.example.isCreator) return
        if (props.auth) {
            if (!props.example.isCreator) {
                if (!props.example.liked) {
                    dispatch(addExampleLikeAsync(props.example.exampleId))
                } else {
                    dispatch(deleteExampleLikeAsync(props.example.exampleId))
                }
            }
        } else {
            navigate('/login')
        }
    };
    let deleteExample = () => {
        dispatch(deleteExampleAsync(props.example.exampleId))
        setShowDeleteModal(false)
    };

    const getBoldIcon = () => {
        return textFormat ? <Bold/> : <NotBold/>
    }

    const getLikeIcon = () => {
        if (props.example.isCreator) {
            return <div><GreyHeart/></div>
        }
        return props.example.liked ? <HeartYes/> : <HeartNo/>
    }

    const isEditable = () => {
        return props.example.isCreator && props.auth && !isExpired(props.example.created)
    }

    return (
        <div className={s.exampleComponent}>
            {!props.updateExample || !edit
                ?
                <>
                    <div className={s.exampleBox}>
                        <div className={s.example}>
                            {textFormat ?
                                <div>
                                    <ExampleFormat parts={props.example.parts} />
                                </div> :
                                <div>
                                    {props.example.sentence}
                                </div>
                            }
                        </div>
                        <div className={s.likeIcons}>
                            <div className={s.likeCount}>{props.example.likes}</div>
                            <div onClick={addLikeExample}>{getLikeIcon()}</div>
                        </div>
                    </div>

                    <div className={s.exampleBottom}>
                        <div className={st.creatorInfo}>
                            <div className={st.author}>
                                {props.example.creator.nickname}
                            </div>
                            <div className={st.dateFormat}>
                                <DateAgo date={props.example.created}/>
                            </div>
                        </div>
                        <div className={st.buttonIcons}>
                            <div className={st.boldIconBox} onClick={clickTextFormat}>
                                <div className={st.iconContainer}>{getBoldIcon()}</div>
                                {!isMobileScreen && <div className={st.prompt}>Выделить</div>}
                            </div>

                            {isEditable() &&
                                <div className={st.boldIconBox} onClick={() => setShowDeleteModal(true)}>
                                    <div className={s.deleteIcon}>
                                        <Trash/>
                                    </div>
                                    {!isMobileScreen &&  <div>Удалить</div>}
                                </div>
                            }
                            {isEditable() &&
                                <div className={st.boldIconBox} onClick={editExample}>
                                    <div className={st.iconContainer}><Pencil/></div>
                                    {!isMobileScreen &&  <div>Редактировать</div>}
                                </div>
                            }
                        </div>
                    </div>
                </>
                :
                <>
                    {props.updateExample &&
                        <UpdateExample engWord={props.engWord}
                                       mnemonics={props.mnemonics}
                                       newExample={props.updateExample}
                                       setEdit={setEdit}
                        />
                    }
                </>
            }
            <DeleteModal
                classElement={"пример"}
                elementToDelete={props.example.sentence}
                show={showDeleteModal}
                close={closeDeleteModal}
                delete={deleteExample}
            />
        </div>
    )
};

export default ExampleComponent