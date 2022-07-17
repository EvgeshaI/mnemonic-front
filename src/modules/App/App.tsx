import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom"
import EngWordComponent from "../main/EngWord/EngWord";
import Alerts from "../main/Alert/Alerts";
import {LoginAndRegistration} from "../main/LoginAndRegistration/LoginAndRegistration";
import {Navbar} from "../main/Navbar/Navbar";
import {StartPage} from "../main/StartPage/StartPage";
import {useAppDispatch, useAppSelector} from "../../store";
import {initializedAppAsync} from "../../store/appSlice";
import {UserPage} from "../main/User/UserPage";
import {Preloader} from "../main/Preloader/Preloader";
import {ResetPassword} from "../main/LoginAndRegistration/ResetPassword";
import {ChangePassword} from "../main/LoginAndRegistration/ChangePassword";
import {Confirmation} from "../main/LoginAndRegistration/Confirmation";


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
    <div>
        <Navbar/>
        <Routes>
            <Route path = "/eng/:word" element={<EngWordComponent/>}>
            </Route>
            <Route path = "/login" element={<LoginAndRegistration/>}>
            </Route>
            <Route path = "/" element={<StartPage/>}>
            </Route>
            <Route path = "/user" element={<UserPage/>}>
            </Route>
            <Route path = "/reset" element={<ResetPassword/>}>
            </Route>
            <Route path = "/changePassword" element={<ChangePassword/>}>
            </Route>
            <Route path = "/confirmation" element={<Confirmation/>}>
            </Route>
        </Routes>
        <Alerts/>
    </div>

    )
};

export default App