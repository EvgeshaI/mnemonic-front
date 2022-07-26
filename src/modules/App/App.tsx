import React, {useEffect} from "react";
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
import s from "./app.module.css"
import {Privacy} from "../main/privacy/Privacy";

const App: React.FC<any> = () => {
    const {
        initialized
    } = useAppSelector((state) => state.appReducer);
    const dispatch =  useAppDispatch();
    useEffect(() => dispatch(initializedAppAsync()), [])
    if (!initialized) {
        return <div>
            <Preloader/>
        </div>
    }
    return (
    <>
        <div className={s.content}>
            <Navbar/>
            <Routes>
                <Route path = "/eng/:word" element={<EngWord/>}/>
                <Route path = "/login" element={<LoginAndRegistration/>}/>
                <Route path = "/" element={<StartPage/>}/>
                <Route path = "/user" element={<UserPageContainer/>}/>
                <Route path = "/reset" element={<ResetPassword/>}/>
                <Route path = "/changePassword" element={<ChangePassword/>}/>
                <Route path = "/confirmation" element={<Confirmation/>}/>
                <Route path="/privacy" element={<Privacy/>}/>
            </Routes>
            <Alerts/>
        </div>
        <div>
            <Footer/>
        </div>
    </>
    )
};

export default App