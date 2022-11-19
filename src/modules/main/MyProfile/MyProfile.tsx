import React, {useEffect, useState} from "react";
import s from "./myProfile.module.scss"
import {useAppDispatch, useAppSelector} from "../../../store";
import {ReactComponent as User} from "../../../import/icons/user.svg";
import {setIsUpdateNickname, updateUserName} from "../../../store/authSlice";
import {TypeOfPractice} from "./TypeOfPractice";
import {getUserRepetition} from "../../../store/userSlice";

export const MyProfile = () => {
    const dispatch = useAppDispatch()
    const {
        user,
        isUpdateNickname
    } = useAppSelector((state) => state.authReducer);
    const {
        userTypeRepetition
    } = useAppSelector((state) => state.userReducer);

    useEffect(() => {
        dispatch(getUserRepetition())
    }, [])

    const [nickname, setNickname] = useState(user?.nickname)

    const changeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value)
    }
    const setUpdateNickname = () => {
        dispatch(setIsUpdateNickname(true))
    }

    const saveNewNickname = () => {
        if (nickname !== user!.nickname) {
            dispatch(updateUserName(nickname!))
        } else {
            dispatch(setIsUpdateNickname(false))
        }
    }


    return (
        <div className={s.myPageBox}>
            <div className={s.myInfoContainer}>
                <div className={s.avatar}>
                    <User/>
                </div>
                <div className={s.myInfo}>
                    {isUpdateNickname ?
                            <div className={s.myInfoField}>
                               <div>nickname:</div>
                                <input className={s.updateNickname}
                                       value={nickname}
                                       placeholder={nickname}
                                       autoFocus={true}
                                       onChange={changeNickName}
                                       onBlur={saveNewNickname}
                                />
                            </div>
                        :
                        <div className={s.myInfoField}>
                            <div>nickname:</div>
                            <div
                                onClick={setUpdateNickname}
                                style={{cursor: "pointer"}}>{user?.nickname}
                            </div>
                        </div>
                    }
                    <div className={s.myInfoField}>
                        <div>e-mail:</div>
                        <div>{user?.email}</div>
                    </div>
                </div>
            </div>
            <div className={s.instruction}>
                Выберите тип интервального повторения для запоминания слов.
                В таблице указаны интервалы времени, через которое ваши примеры будут вновь доступны для тренировки.
            </div>
            {userTypeRepetition &&
                <TypeOfPractice userTypeRepetition={userTypeRepetition}/>
            }
        </div>
    )
}