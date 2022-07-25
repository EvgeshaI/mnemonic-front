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
import moment from "moment";

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
    let isExpired = (created: string) => {
        let createdDate = moment(created, "DD-MM-YYYY HH:mm:ss")
        return createdDate.add(24, 'hours').isBefore(moment())
    }

    const getBoldIcon = () => {
        return bold ? <Bold/> : <NotBold/>
    }
    const getLikeIcon = () => {
        return props.exampleLikes > 0 ? <HeartYes/> : <Heart/>
    }

    return (
        <div className={s.myExampleBox}>
            {bold ?
                <div className={s.myExample}>
                    ● <ExampleFormat parts={props.parts}/>
                </div>
                :
                <div className={s.myExample}> ● {props.parts.map(el => el.part)}</div>
            }
            <div className={s.icons}>
                <div className={s.likeCount}> {props.exampleLikes}</div>
                <div className={s.icon}>{getLikeIcon()}</div>
                <div className={s.boldIcon} onClick={pushBold}>{getBoldIcon()}</div>
                {!isExpired(props.created) &&
                    <div className={s.trash}
                         onClick={showDeleteModal}><Trash/>
                    </div>
                }
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