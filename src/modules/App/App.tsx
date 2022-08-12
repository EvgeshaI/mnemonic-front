import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom"
import EngWord from "../main/EngWord/EngWord";
import Alerts from "../main/Alert/Alerts";
import {LoginAndRegistration} from "../main/LoginAndRegistration/LoginAndRegistration";
import {Navbar} from "../main/Navbar/Navbar";
import {StartPage} from "../main/StartPage/StartPage";
import {useAppDispatch, useAppSelector} from "../../store";
import {initializedAppAsync} from "../../store/appSlice";
import {UserPageContainer} from "../main/User/UserPageContainer";
import {Preloader} from "../main/Preloader/Preloader";
import {ResetPassword} from "../main/LoginAndRegistration/ResetPassword";
import {ChangePassword} from "../main/LoginAndRegistration/ChangePassword";
import {Confirmation} from "../main/LoginAndRegistration/Confirmation";
import {Footer} from "../main/Footer/Footer";
import s from "./app.module.scss"
import {Privacy} from "../main/privacy/Privacy";
import {Consonance} from "../main/consonance/Consonance";

const App: React.FC<any> = () => {
    const {
        initialized
    } = useAppSelector((state) => state.appReducer);
    const dispatch =  useAppDispatch();
    useEffect(() => dispatch(initializedAppAsync()), [])
    const [theme, setTheme] = useState("theme-light")
    const toggleTheme = () => {
        setTheme(theme === "theme-light" ? "theme-dark" : "theme-light")
    }
    useEffect(() => {
        const backgroundColor = `var(--background-color-${theme})`
        const fontColor = `var(--font-color-${theme})`
        const darkGray = `var(--color-darkgray-${theme})`
        const shadowColor = `var(--shadow-${theme})`
        document.body.style.setProperty('--background-color', backgroundColor)
        document.body.style.setProperty('--font-color', fontColor)
        document.body.style.setProperty('--color-darkgray', darkGray)
        document.body.style.setProperty('--shadow', shadowColor)
    }, [theme])
    if (!initialized) {
        return <div>
            <Preloader/>
        </div>
    }
    return (
    <div>
        <div className={s.content}>
            <Navbar theme={theme} toggleTheme={toggleTheme}/>
            <Routes>
                <Route path = "/eng/:word" element={<EngWord/>}/>
                <Route path = "/login" element={<LoginAndRegistration/>}/>
                <Route path = "/" element={<StartPage theme={theme}/>}/>
                <Route path = "/user" element={<UserPageContainer/>}/>
                <Route path = "/reset" element={<ResetPassword/>}/>
                <Route path = "/changePassword" element={<ChangePassword/>}/>
                <Route path = "/confirmation" element={<Confirmation/>}/>
                <Route path="/privacy" element={<Privacy/>}/>
                <Route path = "/consonance" element={<Consonance/>}/>
            </Routes>
            <Alerts/>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
    )
};

export default App