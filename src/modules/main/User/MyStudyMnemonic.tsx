import React, {FC, useState} from "react";
import s from "./userPage.module.scss";
import HighlightMnemonic from "../mnemonic/HighlightMnemonic";
import {ReactComponent as Heart} from "../../../import/icons/heart.svg"
import {ReactComponent as HeartYes} from "../../../import/icons/heart-grey.svg"
import {ReactComponent as Trash} from "../../../import/icons/trash-bin.svg";
import {StudyExample, StudyMnemonic} from "../../../shared/models/engWordTypes";
import {DeleteModal} from "../Modal/DeleteModal";
import {useAppDispatch} from "../../../store";
import {deleteThisMnemonicAsync} from "../../../store/userSlice";
import {isExpired} from "../../util/utilFunctions";

type MyStudyMnemonicPropsType = {
    mnemonic: StudyMnemonic,
    examples: Array<StudyExample>
}

export const MyStudyMnemonic: FC<MyStudyMnemonicPropsType> = (props) => {
    const dispatch = useAppDispatch()
    const [bold, setBold] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    let pushBold = () => {
        setBold(!bold)
    };
    const getLikeIcon = () => {
        return props.mnemonic.likes > 0 ? <HeartYes/> : <Heart/>
    }
    const closeDeleteModal = () => {
        setShowDeleteModal(false)
    }
    let deleteThisMnemonic = () => {
        dispatch(deleteThisMnemonicAsync(props.mnemonic.id))
        setShowDeleteModal(false)
    }

    return (
        <div className={s.myMnemonicBox}>
            {bold ?
                <div className={s.myMnemonic} onClick={pushBold}>
                     <HighlightMnemonic highlight={props.mnemonic.highlight} mnemonic={props.mnemonic.phrase}/>
                </div>
                :
                <div className={s.myMnemonic} onClick={pushBold}>
                     <div>{props.mnemonic.phrase}</div>
                </div>
            }
            <div className={s.icons}>
                {props.mnemonic.likes > 0 &&
                <>
                    <div className={s.likeCount}> {props.mnemonic.likes} </div>
                    <div className={s.likeIcon}> {getLikeIcon()} </div>
                </>
                }

                {!isExpired(props.mnemonic.created)  &&
                    <div className={s.iconStyle} onClick={() => setShowDeleteModal(true)}>
                        <Trash/>
                    </div>
                }
            </div>
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