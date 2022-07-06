import React, {FC, useState} from "react";
import s from "./navbar.module.css"
import {ReactComponent as Logo} from "../../../import/icons/logo.svg"
import {ReactComponent as Login} from "../../../import/icons/enter.svg"
import {ReactComponent as Logout} from "../../../import/icons/logout.svg"
import {ReactComponent as Search} from "../../../import/icons/search.svg"
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../../store";
import {deleteUser} from "../../../store/authSlice";
import {getMyPageAsync} from "../../../store/userSlice";
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
        navigate(`/eng/${word}`)
        setWord("")
    };
    const login = () => {
        navigate(`/login`)
    };
    const startPage = () => {
        navigate(`/eng/picture`)
    };
    const userPage = () => {
        navigate(`/user`)
        dispatch(getMyPageAsync())
    };
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
            <div className={s.logout}>
                {isAuth
                    ?
                    <div className={s.logoutLoginIcon} >
                        {user &&
                            <div onClick={userPage}
                                className={s.nickname}>
                                {user.nickname}</div>
                        }
                        <div onClick={showDeleteModal}> <Logout/> </div>
                    </div>
                    :
                    <div onClick={login} className={s.logoutLoginIcon}>
                        <Login/>
                    </div>
                }
            </div>
            <ExitModal show={showModal} close={closeDeleteModal} exit={exit}/>
        </div>
    )
};