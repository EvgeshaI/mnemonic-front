import React, {useEffect, useState} from 'react'
import {Login} from "./Login";
import s from "./auth.module.scss";
import {useAppSelector} from "../../../store";
import {Registration} from "./Registration";
import {GoogleLogin} from "./GoogleLogin";
import {useNavigate} from "react-router";
import {VKLogin} from "./VKLogin";

export const LoginAndRegistration = () => {
    const {
        isAuth,
        errorMessage,
        confirmed
    } = useAppSelector((state) => state.authReducer);
    const [clickRegistration, setClickRegistration] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            if(window.history.state && window.history.state.idx > 0) {
                navigate(-1)
            }else {
                navigate('/', {replace: true})
            }
        }
    }, [isAuth])

    return (
        <div>
            {clickRegistration ?
                <div className={s.text}> Регистрация в Mnemology </div> :
                <div className={s.text}> Вход в Mnemology </div>
            }
            <div>
                {clickRegistration ?
                    <>
                        <Registration />
                        <div className={s.regText}> Уже есть аккаунт?</div>
                        <div className={s.formButtonBox}>
                            <div onClick={() => setClickRegistration (false)}
                                className={s.formButton}>
                                Войти
                            </div>
                        </div>
                    </>
                    :
                    <div>
                        <Login isAuth={isAuth}
                               errorMessage={errorMessage}
                               confirmed ={confirmed}/>
                        <GoogleLogin/>
                        <VKLogin/>
                        <div className={s.loginText}> Нет аккаунта?</div>
                        <div className={s.formButtonBox}>
                            <button
                                onClick={() => setClickRegistration(true)}
                                className={s.formButton}>
                                Зарегистрироваться
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
};
