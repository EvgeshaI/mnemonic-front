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
    // theme: string,
    // toggleTheme: () => void
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
                // toggleTheme={props.toggleTheme}
                // theme={props.theme}
                isAuth={isAuth}
                user={user}
                startPage={startPage}
                login={login}
                invertShowDropDown={invertShowDropDown}
            />
            :
            <NavBarDesktop
                // theme={props.theme}
                // toggleTheme={props.toggleTheme}
                isAuth={isAuth}
                user={user}
                startPage={startPage}
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