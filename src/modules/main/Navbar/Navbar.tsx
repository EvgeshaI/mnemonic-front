import React, {FC, useState} from "react";
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../../store";
import {UserDropDown} from "./UserDropDown";
import {ProfileModal} from "../Modal/ProfileModal";
import {setShowProfileModal} from "../../../store/authSlice";
import useWindowDimensions from "../../util/windowDimensions";
import {NavBarMobile} from "./NavBarMobile";
import {NavBarDesktop} from "./NavBarDesktop";

type NavbarPropsType ={

}

export const Navbar: FC<NavbarPropsType>= (props) => {
    const {
        user,
        isAuth,
        showProfileModal
    } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch()

    const [showUserDropDown, setShowUserDropDown] = useState(false)
    const closeDeleteModal = () => {
        dispatch(setShowProfileModal(false))
    }
    const navigate = useNavigate();

    const login = () => {
        navigate(`/login`)
    };
    const startPage = () => {
        navigate(`/`)
    };
    const goToVocabulary= () => {
        navigate("/vocabulary")
        setShowUserDropDown(false)
    }
    const searchConsonance = () => {
        navigate(`/consonance`)
    }
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
                startPage={startPage}
                login={login}
                invertShowDropDown={invertShowDropDown}
            />
            :
            <NavBarDesktop
                isAuth={isAuth}
                user={user}
                startPage={startPage}
                goToVocabulary={goToVocabulary}
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
                goToVocabulary={goToVocabulary}
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