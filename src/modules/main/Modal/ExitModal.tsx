import React, {FC} from "react";
import ReactModal from "react-modal";
import s from "./modal.module.css"
import {ReactComponent as CloseIcon} from "../../../import/icons/close-slim.svg";

type ExitModalPropsType = {
    show: boolean,
    close: () => void,
    exit: () => void
}

const customStyles = {
    content: {
        top: "10%",
        left: "60%",
        // transform: "translate(-50%, -50%)",
        padding: '0',
        width: "400px",
        height: "120px",
        borderRadius: "15px",
        backgroundColor: "lightsteelblue",
        opacity: ".9"
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
                <div className={s.closeButtonBox} onClick={() => props.close()}>
                    <div>
                        <CloseIcon/>
                    </div>
                </div>
                <div className={s.text}>
                   Вы действительно хотите выйти?
                </div>
                <div onClick={()=>props.exit()}
                     className={s.deleteButton}>
                    Выйти
                </div>
            </div>

        </ReactModal>
    )
}