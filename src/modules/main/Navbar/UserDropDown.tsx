import React, {FC, useEffect, useRef} from "react";
import s from "./navbar.module.css"
import {useNavigate} from "react-router";
import {deleteUser, setShowProfileModal} from "../../../store/authSlice";
import {useAppDispatch} from "../../../store";

type ModalListPropsType = {
    setShowUserDropDown: (show: boolean) => void
}

export const UserDropDown: FC <ModalListPropsType> = (props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);
    function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
            props.setShowUserDropDown(false)
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const userPage = () => {
        navigate(`/user`)
        props.setShowUserDropDown(false)
    };
    const exit = () => {
        dispatch (deleteUser())
        navigate("/login")
        props.setShowUserDropDown(false)
    }
    const showProfileModal = () => {
        dispatch(setShowProfileModal(true))
        props.setShowUserDropDown(false)
    }
    return (
        <>
        <div className={s.modalList} ref={ref}>
               <div className={s.listStyle}><li onClick={userPage}>Мой словарь</li></div>
               <div className={s.listStyle}><li onClick={showProfileModal}>Мой профиль</li></div>
               <div className={s.listStyle}><li onClick={exit}>Выйти</li></div>
        </div>
        </>
    )
}
