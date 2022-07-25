import React, {FC, useState} from "react";
import s from "../EngWord/EngWord.module.css";
import {IEngWord, IMnemonic} from "../../../shared/models/engWordTypes";
import HighlightMnemonic from "./HighlightMnemonic";
import {useAppDispatch} from "../../../store";
import {
    addMeMnemonicAsync,
    addMnemonicLikeAsync,
    deleteMeMnemonicAsync,
    deleteMnemonicAsync,
    deleteMnemonicLikeAsync
} from "../../../store/mnemonicSlice";
import {ReactComponent as HeartNo} from "../../../import/icons/heart.svg"
import {ReactComponent as HeartYes} from "../../../import/icons/heart-clicked.svg"
import {ReactComponent as GreyHeart} from "../../../import/icons/heart-grey.svg"
import {ReactComponent as Pencil} from "../../../import/icons/pencil.svg"
import {ReactComponent as Trash} from "../../../import/icons/trash-bin.svg"
import {ReactComponent as Add} from "../../../import/icons/add.svg"
import {ReactComponent as Minus} from "../../../import/icons/minus.svg"
import {ReactComponent as Bold} from "../../../import/icons/bold1.svg"
import {ReactComponent as NotBold} from "../../../import/icons/bold2.svg"
import UpdateMnemonic from "./UpdateMnemonic";
import {DateAgo} from "../DateAgo";
import {useNavigate} from "react-router";
import {DeleteModal} from "../Modal/DeleteModal";
import {isExpired} from "../../util/utilFunctions";

type PropsType = {
    mnemonic: IMnemonic
    auth: boolean
    engWord: IEngWord
}
const MnemonicComponent: FC<PropsType> = (props) => {
    const [bold, setBold] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    let pushBold = () => {
        setBold(!bold)
    };
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const closeDeleteModal = () => {
        setShowDeleteModal(false)
    }
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    let addLikeMnemonic = () => {
        if (props.mnemonic.isCreator) return
        if (props.auth) {
            if (!props.mnemonic.isCreator) {
                if (!props.mnemonic.isLiked) {
                    dispatch(addMnemonicLikeAsync(props.mnemonic.mnemonicId))
                } else {
                    dispatch(deleteMnemonicLikeAsync(props.mnemonic.mnemonicId))
                }
            }
        } else {
            navigate(`/login`)
        }
    };

    let deleteMnemonic = () => {
        dispatch(deleteMnemonicAsync(props.mnemonic.mnemonicId))
        setShowDeleteModal(false)
    };
    let addMeMnemonic = () => {
        if (!props.mnemonic.added) {
            dispatch(addMeMnemonicAsync(props.mnemonic.mnemonicId))
        } else {
            dispatch(deleteMeMnemonicAsync(props.mnemonic.mnemonicId))
        }
    };

    let editMnemo = () => {
        setEdit(true)
    };

    const addDelete = () => {
        return props.mnemonic.added ? <Minus/> : <Add/>;
    }
    const getBoldIcon = () => {
        return bold ? <Bold/> : <NotBold/>
    }
    const getLikeIcon = () => {
        if (props.mnemonic.isCreator) {
            return <div><GreyHeart/></div>
        }
        return props.mnemonic.isLiked ? <HeartYes/> : <HeartNo/>
    }

    const canBeEditOrDelete = () => {
        return props.mnemonic.isCreator && !props.mnemonic.exampleExists && !isExpired(props.mnemonic.created)
    }

    return (
        <div className={s.mnemonicComponent}>
            {!edit ?
                <>
                    <div className={s.mnemonicBottom}>
                        <div className={s.highlightWord}>
                            <b>{props.mnemonic.highlightWord}</b>
                        </div>
                        <div className={s.accuracy}>
                            {Math.round(props.mnemonic.accuracy)}%
                        </div>

                        <div className={s.likeIcon}>
                            <div className={s.likeCountContainer}>
                                <span className={s.likeCount}>{props.mnemonic.likes}</span>
                            </div>
                            <div onClick={addLikeMnemonic} className={s.myRedHeart}>
                                {getLikeIcon()}
                            </div>
                        </div>

                    </div>

                    <div className={s.mnemo}>
                        {bold ? <HighlightMnemonic
                            highlight={props.mnemonic.highlight}
                            mnemonic={props.mnemonic.phrase}
                        /> : props.mnemonic.phrase}
                    </div>
                    <div className={s.mnemonicBottom}>
                        <div className={s.creatorInfo}>
                            <div className={s.author}>
                                {props.mnemonic.creator.nickname}
                            </div>
                            <div className={s.dateFormat}>
                                <DateAgo date={props.mnemonic.created}/>
                            </div>
                        </div>
                        <div className={s.buttonIcons}>
                            <div className={s.boldIconBox} onClick={pushBold}>
                                <div  className={s.iconContainer}>{getBoldIcon()}</div>
                                <div> Выделить </div>
                            </div>
                            {!props.mnemonic.isCreator && props.auth && !props.mnemonic.myExampleExists &&
                                <div className={s.boldIconBox} onClick={addMeMnemonic}>
                                    <div  className={s.iconContainer}> {addDelete()} </div>
                                    <div>Избранное</div>
                                </div>
                            }
                            { canBeEditOrDelete() &&
                                <div className={s.boldIconBox} onClick={() => setShowDeleteModal(true)}>
                                    <div  className={s.iconContainer}><Trash/></div>
                                    <div>Удалить</div>
                                </div>
                            }
                            {canBeEditOrDelete() &&
                                <div className={s.boldIconBox} onClick={editMnemo}>
                                    <div  className={s.iconContainer}><Pencil/></div>
                                    <div>Редактировать</div>
                                </div>
                            }
                        </div>
                    </div>
                </>
                :
                <>
                    <UpdateMnemonic
                        mnemonicId={props.mnemonic.mnemonicId}
                        mnemonicPhrase={props.mnemonic.phrase}
                        setEdit={setEdit}
                        engWord={props.engWord}
                    />
                </>
            }
            <DeleteModal
                classElement={"мнемонику"}
                elementToDelete={props.mnemonic.phrase}
                show={showDeleteModal}
                close={closeDeleteModal}
                delete={deleteMnemonic}
            />
        </div>
    )
};

export default MnemonicComponent

