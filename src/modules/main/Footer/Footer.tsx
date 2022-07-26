import React from "react";
import s from "./footer.module.css"
import {useNavigate} from "react-router";

export const Footer = () => {
    const navigate = useNavigate()
    const goToPrivacy = () => {
        navigate("/privacy")
    }
    return (
        <div className={s.footerContainer}>
            <div className={s.mail}>info@mnemology.ru</div>
            <div className={s.confidBox}>
                <div className={s.confid} onClick={goToPrivacy}>Политика</div>
                <div className={s.agreement}>Соглашение</div>
            </div>
        </div>
    )
}