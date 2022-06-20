import React from "react";
import s from './Alerts.module.css';
import {useAppDispatch, useAppSelector} from "../../../store";
import {removeAlert} from "../../../store/alertsSlise";
import {ReactComponent as CloseIcon} from "../../../import/icons/close-slim.svg"

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
                <div className={s.closeButtonBox} onClick={closeAlert}>
                    <div>
                        <CloseIcon/>
                    </div>
                </div >
                <div className={s.alertMessage}>
                    {alert.message}
                </div>
            </div>
            }
        </>
    )
};

export default Alerts