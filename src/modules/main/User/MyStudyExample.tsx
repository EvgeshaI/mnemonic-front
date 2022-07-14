import React, {FC, useState} from "react";
import s from "./userPage.module.css";
import {ReactComponent as HeartYes} from "../../../import/icons/heart-clicked.svg";
import {ReactComponent as Heart} from "../../../import/icons/heart.svg";
import {ReactComponent as Trash} from "../../../import/icons/trash-bin.svg"
import {ReactComponent as Bold} from "../../../import/icons/bold1.svg"
import {ReactComponent as NotBold} from "../../../import/icons/bold2.svg"
import {IPart} from "../../../shared/models/engWordTypes";
import {deleteMyExampleAsync} from "../../../store/userSlice";
import {useAppDispatch} from "../../../store";
import {DeleteModal} from "../Modal/DeleteModal";
import {ExampleFormat} from "../example/ExampleFormat";

type MyStudyExamplePropsType = {
    parts: Array<IPart>
    exampleId: number
    exampleLikes: number
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
    let like = <Heart/>
    if (props.exampleLikes > 0) {
        like = <HeartYes/>
    }
    let boldIcon = <NotBold/>;
    if (bold) {
        boldIcon = <Bold/>
    }
    return (
        <div className={s.myExampleBox}>
            {bold ?
                <div className={s.myExample}>
                    {props.parts.map(p => <ExampleFormat part={p}/>)}
                </div>
                :
                <div className={s.myExample}> - {props.parts.map(el => el.part)}</div>
            }

            <div className={s.icons}>
                <div className={s.likeCount}> {props.exampleLikes}</div>
                <div className={s.icon}> {like} </div>
                <div className={s.boldIcon} onClick={pushBold}>  {boldIcon} </div>
                <div className={s.trash}
                     onClick={showDeleteModal}><Trash/>
                </div>
            </div>


            <DeleteModal
                classElement={"пример"}
                elementMnemonic={null}
                elementExample={null}
                elementMyExample={props.parts}
                show={showModal}
                close={closeDeleteModal}
                delete={deleteExample}
            />
        </div>
    )
}