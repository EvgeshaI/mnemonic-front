import React from 'react';
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./store";
import {BrowserRouter} from 'react-router-dom';
import App from "./modules/App/App";
import './index.css'
import axios from "axios";
import {IUser} from "./shared/models/engWordTypes";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store} >
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

axios.interceptors.request.use((req) => {
    let user = JSON.parse(localStorage.getItem("user") || "null") as IUser
    if(user) {
        if (req.headers) {
            req.headers['Authorization'] = `Bearer ${user.token}`
        } else {
            req.headers = {'Authorization': `Bearer ${user.token}`}
        }
    }
    return req
})

