import React from "react";
import {Route, Routes} from "react-router-dom"
import EngWordComponent from "../main/EngWord";
import Alerts from "../main/Alert/Alerts";
import {UserPage} from "../main/User/UserPage";
import {Navbar} from "../main/Navbar/Navbar";
import {StartPage} from "../main/StartPage/StartPage";


const App: React.FC<any> = () => {
    return (
    <div>
        <Navbar/>
        <Routes>
            <Route path = "/eng/:word" element={<EngWordComponent/>}>
            </Route>
            <Route path = "/user" element={<UserPage/>}>
            </Route>
            <Route path = "/mnemosic" element={<StartPage/>}>
            </Route>

        </Routes>
        <Alerts/>

    </div>

    )
};

export default App