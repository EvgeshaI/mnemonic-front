import React, {FC} from "react";
import ReactModal from "react-modal";
import s from "./modal.module.css"
import {CloseBtn} from "../../util/CloseBtn";

type DeleteModalPropsType = {
    show: boolean,
    classElement: string
    elementToDelete: string
    close: () => void,
    delete: () => void
}

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: '7px',
        width: "400px",
        height: "120px",
        borderRadius: "15px",
        backgroundColor: "#e6f7ff",
        opacity: ".9"
    }
}

export const DeleteModal: FC<DeleteModalPropsType> = (props) => {

    return (
        <ReactModal
            style={customStyles}
            isOpen={props.show}
            appElement={document.getElementById('root')!}
        >
            <div>
                <CloseBtn close={props.close}/>
                <div className={s.text}>
                    <div>
                        {`Вы действительно хотите удалить ${props.classElement} 
                        "${props.elementToDelete}"`}
                    </div>
                </div>
                <div onClick={()=>props.delete()}
                     className={s.deleteButton}>
                    удалить
                </div>
            </div>

        </ReactModal>
    )
}