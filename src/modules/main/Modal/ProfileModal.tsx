import React, {FC, useState} from "react";
import ReactModal from "react-modal";
import s from "./modal.module.css"
import {CloseBtn} from "../../util/CloseBtn";
import {IUser} from "../../../shared/models/engWordTypes";
import {useAppDispatch, useAppSelector} from "../../../store";
import {setNicknameError, updateUserName} from "../../../store/authSlice";

type ExitModalPropsType = {
    close: () => void,
    user: IUser
    showProfileModal:boolean
}

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        padding: '7px',
        width: "300px",
        borderRadius: "10px",
        backgroundColor: "white",
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: {
        zIndex: "2"
    }
}

export const ProfileModal: FC<ExitModalPropsType> = (props) => {
    const dispatch = useAppDispatch()
    const {
        nicknameError
    } = useAppSelector((state) => state.authReducer);
    const [nickName, setNickName] = useState(props.user.nickname)
    const updateNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickName(e.target.value)
        dispatch(setNicknameError(null))
    }
    const close = () => {
        dispatch(setNicknameError(null))
        setNickName(props.user.nickname)
        props.close()
    }
    const saveNewNickname = () => {
        if(nickName !== props.user.nickname){
            dispatch(updateUserName(nickName))
            dispatch(setNicknameError(null))
        }
    }


    return (
        <ReactModal
            style={customStyles}
            isOpen={props.showProfileModal}
            appElement={document.getElementById('root')!}
        >
            <div className={s.nickNameModalBox}>
                <CloseBtn close={close}/>
                <div className={s.profileModalText}>Мой профиль</div>
                <div className={s.emailModal}>
                   email:
                    <div className={s.email}>{props.user?.email}</div>
                </div>
                <div className={s.nickNameModal}>
                    nickname:
                    <div>
                        <input className={s.inputProfileModal}
                               value={nickName}
                               onChange={updateNickname}
                               type={"text"}
                        />
                    </div>
                </div>
                 <div className={s.errorMessage}>{nicknameError}</div>
                 <div className={s.buttonProfileModal} onClick={saveNewNickname}>Сохранить</div>
            </div>
        </ReactModal>
    )
}