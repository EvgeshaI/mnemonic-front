import React, {FC, useState} from "react";
import {IEngWord, IExample, IMnemonic, IPart, PartTypes} from "../../../shared/models/engWordTypes";
import s from "./Example.module.css";
import st from "../EngWord/EngWord.module.css";
import {useAppDispatch} from "../../../store";
import {
    addExampleLikeAsync,
    deleteExampleAsync,
    deleteExampleLikeAsync,
    setUpdateExample
} from "../../../store/engWordSlice";
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
import moment from "moment";


type PropsType = {
    example: IExample,
    engWord: IEngWord | null,
    mnemonics: Array<IMnemonic>
    updateExample: IExample | null
    auth: boolean
}
const ExampleComponent: FC<PropsType> = (props) => {
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false);
    const [textFormat, setTextFormat] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const closeDeleteModal = () => {
        setShowModal(false)
    }
    let editExample = () => {
        dispatch(setUpdateExample(props.example))
        setEdit(true)
    };
    let clickTextFormat = () => {
        setTextFormat(!textFormat)
    }
    const navigate = useNavigate()

    let addLikeExample = () => {
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
        setShowModal(false)
    };
    const showDeleteModal = () => {
        setShowModal(true)
    }

    let exampleFn = (part: IPart) => {
        if (part.type === PartTypes.PLAIN) {
            return <span>{part.part}</span>
        } else if (part.type === PartTypes.TRANSLATION) {
            return <span className={s.translationPart}>{part.part}</span>
        } else if (part.type === PartTypes.MNEMONIC) {
            return <span className={s.mnemonicPart}>{part.part}</span>
        }
    };

    let textFormatButton = <NotBold/>
    if (textFormat) {
        textFormatButton = <Bold/>
    }

    let Like = <HeartNo/>;
    if (props.example.liked) {
        Like = <HeartYes/>
    }
    let date = (date: string) => {
        return (
            <div>
                <DateAgo date={date}/>
            </div>
        )
    }
    let isExpired = (created: string) => {
        let createdDate = moment(created, "DD-MM-YYYY HH:mm:ss")
        return createdDate.add(24, 'hours').isBefore(moment())
    }

    return (
        <div className={s.exampleComponent}>
            {!edit
                ?
                <>
                    <div className={s.exampleBox}>
                        <div className={s.example}>
                            {textFormat ?
                                <div>
                                    {props.example.parts.map(p => exampleFn(p))}
                                </div> :
                                <div>
                                    {props.example.parts.map(p => p.part)}
                                </div>
                            }
                        </div>
                        <div className={s.likeIcons}>
                            <div className={s.likeCount}>{props.example.likes}</div>
                            {props.example.isCreator ?
                                <div><GreyHeart/></div>
                                :
                                <div onClick={addLikeExample}>{Like}</div>
                            }

                        </div>
                    </div>

                    <div className={s.exampleBottom}>
                        <div className={st.creatorInfo}>
                            <div className={st.author}>
                                {props.example.creator.nickname}
                            </div>
                            <div className={st.dateFormat}>
                                {date(props.example.created)}
                            </div>
                        </div>
                        <div className={st.buttonIcons}>
                            <div className={st.boldIconBox} onClick={clickTextFormat}>
                                <div> {textFormatButton} </div>
                                <div className={st.prompt}>Выделить</div>
                            </div>

                            {props.example.isCreator && props.auth && !isExpired(props.example.created) &&
                                <div className={st.boldIconBox} onClick={showDeleteModal}>
                                    <div className={s.deleteIcon}>
                                        <Trash/>
                                    </div>
                                    <div className={st.prompt}> удалить</div>
                                </div>
                            }
                            {props.example.isCreator && props.auth &&
                                <div className={st.boldIconBox} onClick={editExample}>
                                    <div><Pencil/></div>
                                    <div className={st.prompt}> редактировать</div>
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
                show={showModal}
                close={closeDeleteModal}
                delete={deleteExample}
            />
        </div>
    )
};


export default ExampleComponent