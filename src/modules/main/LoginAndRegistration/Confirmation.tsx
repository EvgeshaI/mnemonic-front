import React, {FC, useEffect} from "react";
import {useLocation} from "react-router-dom";
import s from "./confirmed.module.css"
import {emailConfirmationAsync} from "../../../store/authSlice";
import {useAppDispatch, useAppSelector} from "../../../store";
import {ReactComponent as Checked} from "../../../import/icons/checked.svg";
import {ReactComponent as Cancel} from "../../../import/icons/cancel.svg";
import {useNavigate} from "react-router";

export const Confirmation:FC = () => {
    const {
        confirmed,
        user
    } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch()
    const token = new URLSearchParams(useLocation().search).get('token') || '';
    const navigate = useNavigate()

    useEffect(() => {
        if(user && user.confirmed){
            navigate('/')
        } else {
            dispatch(emailConfirmationAsync(token))
        }
    }, [])


    const componentBody = () => {
        if(confirmed === null ){
            return <div> </div>
        }else if(confirmed){
            return (
                <div>Ваша почта успешно подтверждена!
                    <div className={s.checked}><Checked/></div>
                </div>
                )

        }else {
            return (
                <div> Не удалось подтвердить почту. Возможно, вы перешли по неправильной ссылке.
                    <div className={s.cancel}><Cancel/></div>
                </div>
                )
        }
    }
    return (
        <div className={s.text}>
            {componentBody()}

        </div>
    )
}