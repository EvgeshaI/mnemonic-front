import React, {FC, useState} from "react";
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../../store";
import {UserDropDown} from "./UserDropDown";
import {ProfileModal} from "../Modal/ProfileModal";
import {setShowProfileModal} from "../../../store/authSlice";
import useWindowDimensions from "../../util/windowDimensions";
import {NavBarMobile} from "./NavBarMobile";
import {NavBarDesktop} from "./NavBarDesktop";

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
    const { width } = useWindowDimensions();
    const isMobileScreen = width < 600

    const invertShowDropDown = () => {
        setShowUserDropDown(!showUserDropDown)
    }
    return (
    <>
        {isMobileScreen ?
            <NavBarMobile
                isAuth={isAuth}
                user={user}
                word={word}
                startPage={startPage}
                goToWord={goToWord}
                searchWord={searchWord}
                pressHandler={pressHandler}
                login={login}
                invertShowDropDown={invertShowDropDown}
            />
            :
            <NavBarDesktop
                isAuth={isAuth}
                user={user}
                word={word}
                startPage={startPage}
                goToWord={goToWord}
                searchWord={searchWord}
                pressHandler={pressHandler}
                searchConsonance={searchConsonance}
                invertShowDropDown={invertShowDropDown}
                login={login}
            />
        }
        {showUserDropDown &&
            <UserDropDown
                isAuth={isAuth}
                isMobileScreen={isMobileScreen}
                searchConsonance={searchConsonance}
                setShowUserDropDown={setShowUserDropDown}
                login={login}
            />
        }
        {showProfileModal && user &&
            <ProfileModal showProfileModal={showProfileModal}
                          close={closeDeleteModal}
                          user={user}
            />
        }
    </>
    )
};