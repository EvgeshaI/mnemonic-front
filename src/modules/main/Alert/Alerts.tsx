import React from "react";
import s from './Alerts.module.css';
import {useAppDispatch, useAppSelector} from "../../../store";
import {removeAlert} from "../../../store/alertsSlise";
import {CloseBtn} from "../../util/CloseBtn";

const Alerts = () => {
    const dispatch = useAppDispatch();
    const {
        alert
    } = useAppSelector((state) => state.alertReducer);
    const closeAlert = () => {
        dispatch (removeAlert())
    };

    return (
        <>
            {alert &&
                <div className={s.alert}>
                    <CloseBtn close={closeAlert}/>
                    <div className={s.alertMessage}>
                        {alert.message}
                    </div>
                </div>
            }
        </>
    )
};

export default Alerts