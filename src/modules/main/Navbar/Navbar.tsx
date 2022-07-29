import React, {FC, useState} from "react";
import s from "./navbar.module.css"
import {ReactComponent as Logo} from "../../../import/icons/logo.svg"
import {ReactComponent as Login} from "../../../import/icons/login.svg"
import {ReactComponent as Logout} from "../../../import/icons/logout.svg"
import {ReactComponent as User} from "../../../import/icons/user.svg"
import {ReactComponent as Search} from "../../../import/icons/search.svg"
import {ReactComponent as Sound} from "../../../import/icons/sound.svg"
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../../store";
import {deleteUser} from "../../../store/authSlice";
import {ExitModal} from "../Modal/ExitModal";

export const Navbar: FC = () => {
    const {
        user,
        isAuth
    } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false)
    const closeDeleteModal = () => {
        setShowModal(false)
    }
    const showDeleteModal = () => {
        setShowModal(true)
    }
    const [word, setWord] = useState("")

    const searchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value)
    };
    const navigate = useNavigate();
    const goToWord = () => {
        navigate(`/eng/${word.toLowerCase()}`)
        setWord("")
    };
    const login = () => {
        navigate(`/login`)
    };
    const startPage = () => {
        navigate(`/`)
    };
    const userPage = () => {
        navigate(`/user`)
    };
    const searchConsonance = () => {
        navigate(`/consonance`)
    }
    const pressHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            goToWord()
        }
    };
    const exit = () => {
        dispatch (deleteUser())
        navigate("/login")
        setShowModal(false)
    }

    return (
        <div className={s.navbar}>
            <div className={s.logo} onClick={startPage}>
                <Logo/>
            </div>
            <div className={s.search}>
                <div className={s.inputAndIcon}>
                    <div className={s.searchIcon}
                    onClick={goToWord}>
                        <Search/>
                    </div>
                    <input type="text"
                           placeholder="поиск..."
                           className={s.searchInput}
                           value = {word}
                           onChange={searchWord}
                           onKeyPress={pressHandler}
                    />
                </div>
            </div>
            <div className={s.nicknameAndLogout}>
                <div className={s.Box} onClick={searchConsonance}>
                    <div>Созвучия</div>
                    <div className={s.userIcon}>
                        <Sound/>
                    </div>
                </div>
                {isAuth ?
                    <>
                        <div onClick={userPage} className={s.Box}>
                            <div>{user!.nickname}</div>
                            <div className={s.userIcon}>
                                <User/>
                            </div>
                        </div>
                        <div onClick={showDeleteModal} className={s.logText}>
                            <div className={s.logout}>Выйти</div>
                            <div className={s.logIcon}><Logout/></div>
                        </div>
                    </>
                    :
                    <div onClick={login} className={s.logText}>
                        <div className={s.logout}>Войти</div>
                        <div className={s.logIcon}><Login/></div>
                    </div>
                }
            </div>

            <ExitModal show={showModal} close={closeDeleteModal} exit={exit}/>
        </div>
    )
};