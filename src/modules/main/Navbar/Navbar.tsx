import React, {FC, useState} from "react";
import s from "./navbar.module.css"
import {ReactComponent as Logo} from "../../../import/icons/logo.svg"
import {ReactComponent as Login} from "../../../import/icons/login.svg"
import {ReactComponent as User} from "../../../import/icons/user.svg"
import {ReactComponent as Search} from "../../../import/icons/search.svg"
import {ReactComponent as Sound} from "../../../import/icons/sound.svg"
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../../store";
import {UserDropDown} from "./UserDropDown";
import {ProfileModal} from "../Modal/ProfileModal";
import {setShowProfileModal} from "../../../store/authSlice";

export const Navbar: FC= (props) => {
    const {
        user,
        isAuth,
        showProfileModal
    } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch()
    const [word, setWord] = useState("")
    const [showUserDropDown, setShowUserDropDown] = useState(false)
    const closeDeleteModal = () => {
        dispatch(setShowProfileModal(false))
    }
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
    const searchConsonance = () => {
        navigate(`/consonance`)
    }
    const pressHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            goToWord()
        }
    };

    return (
    <>
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
                    <div onClick={()=> setShowUserDropDown(!showUserDropDown)}
                         className={s.usernameBox}>
                        <div>{user!.nickname}</div>
                        <div className={s.userIcon}>
                            <User/>
                        </div>

                    </div>
                    :
                    <div onClick={login} className={s.logText}>
                        <div className={s.logout}>Войти</div>
                        <div className={s.logIcon}><Login/></div>
                    </div>
                }
                {showUserDropDown &&
                    <UserDropDown setShowUserDropDown={setShowUserDropDown}
                                  />
                }
            </div>

        </div>
        {showProfileModal && user &&
            <ProfileModal showProfileModal={showProfileModal}
                          close={closeDeleteModal}
                          user={user}
            />
        }
    </>
    )
};