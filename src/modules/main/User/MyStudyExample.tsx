import React, {FC, useState} from "react";
import s from "./userPage.module.scss";
import {ReactComponent as HeartYes} from "../../../import/icons/heart-grey.svg";
import {ReactComponent as Heart} from "../../../import/icons/heart.svg";
import {ReactComponent as Trash} from "../../../import/icons/trash-bin.svg"
import {IPart} from "../../../shared/models/engWordTypes";
import {deleteMyExampleAsync} from "../../../store/userSlice";
import {useAppDispatch} from "../../../store";
import {DeleteModal} from "../Modal/DeleteModal";
import {ExampleFormat} from "../example/ExampleFormat";

type MyStudyExamplePropsType = {
    parts: Array<IPart>
    exampleId: number
    exampleLikes: number
    created: string
}
export const MyStudyExample: FC<MyStudyExamplePropsType> = (props) => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false)
    const [bold, setBold] = useState<boolean>(false);
    let pushBold = () => {
        setBold(!bold)
    };
    const closeDeleteModal = () => {
        setShowModal(false)
    }
    const showDeleteModal = () => {
        setShowModal(true)
    }
    const deleteExample = () => {
        dispatch(deleteMyExampleAsync(props.exampleId))
        setShowModal(false)
    }
    const getLikeIcon = () => {
        return props.exampleLikes > 0 ? <HeartYes/> : <Heart/>
    }

    return (
        <div className={s.myExampleBox}>
            {bold ?
                <div className={s.myExample} onClick={pushBold}>
                    ● <ExampleFormat parts={props.parts}/>
                </div>
                :
                <div className={s.myExample} onClick={pushBold}> ● {props.parts.map(el => el.part)}</div>
            }
            <div className={s.icons}>
                {props.exampleLikes > 0 &&
                    <>
                        <div className={s.likeCount}> {props.exampleLikes}</div>
                        <div>{getLikeIcon()}</div>
                    </>
                }

                    <div className={s.iconStyle}
                         onClick={showDeleteModal}>
                        <Trash/>
                    </div>

            </div>
            <DeleteModal
                classElement={"пример"}
                elementToDelete={props.parts.map(p => p.part).join('')}
                show={showModal}
                close={closeDeleteModal}
                delete={deleteExample}
            />
        </div>
    )
}