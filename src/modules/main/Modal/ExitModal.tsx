import React, {FC} from "react";
import ReactModal from "react-modal";
import s from "./modal.module.css"
import {CloseBtn} from "../../util/CloseBtn";

type ExitModalPropsType = {
    show: boolean,
    close: () => void,
    exit: () => void
}

const customStyles = {
    content: {
        top: "10%",
        left: "60%",
        padding: '7px',
        width: "400px",
        height: "100px",
        borderRadius: "15px",
        backgroundColor: "#e6faff",
        opacity: ".9",
    }
}

export const ExitModal: FC<ExitModalPropsType> = (props) => {

    return (
        <ReactModal
            style={customStyles}
            isOpen={props.show}
            appElement={document.getElementById('root')!}
        >
            <div className={s.deleteModal}>
                <CloseBtn close={props.close}/>
                <div className={s.text}>
                   Вы действительно хотите выйти?
                </div>
                <div onClick={()=>props.exit()} className={s.deleteButton}>
                    Выйти
                </div>
            </div>
        </ReactModal>
    )
}