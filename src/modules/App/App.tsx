import React, {useEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom"
import EngWord from "../main/EngWord/EngWord";
import Alerts from "../main/Alert/Alerts";
import {LoginAndRegistration} from "../main/LoginAndRegistration/LoginAndRegistration";
import {Navbar} from "../main/Navbar/Navbar";
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
import useAppTheme from "../util/useAppTheme";
import {PracticeContainer} from "../main/Practice/PracticeContainer";
import {StartPageNew} from "../main/StartPage/StartPageNew";
import ReactGA from "react-ga4";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTIC_ID!);

const App: React.FC<any> = () => {
    const {
        isDarkTheme,
        initialized
    } = useAppSelector((state) => state.appReducer);
    const location = useLocation();
    const dispatch =  useAppDispatch();
    console.log(location.pathname + location.search)
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search});
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: location.pathname + location.search});
    }, [location]);
    useEffect(() => dispatch(initializedAppAsync()), [])
    useAppTheme(isDarkTheme)
    if (!initialized) {
        return <div>
            <Preloader/>
        </div>
    }
    return (
    <div>
        <div className={s.content}>
            <Navbar/>
            <Routes>
                <Route path = "/eng/:word" element={<EngWord/>}/>
                <Route path = "/login" element={<LoginAndRegistration/>}/>
                <Route path = "/" element={<StartPageNew isDarkTheme={isDarkTheme}/>}/>
                <Route path = "/user" element={<UserPageContainer/>}/>
                <Route path = "/reset" element={<ResetPassword/>}/>
                <Route path = "/changePassword" element={<ChangePassword/>}/>
                <Route path = "/confirmation" element={<Confirmation/>}/>
                <Route path="/privacy" element={<Privacy/>}/>
                <Route path = "/consonance" element={<Consonance locationContent={"navbar"}/>}/>
                <Route path = "/practice" element={<PracticeContainer/>}/>
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