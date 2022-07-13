import React, {FC, useState} from 'react'
import {Login} from "./Login";
import s from "./auth.module.css";
import {useAppSelector} from "../../../store";
import {Registration} from "./Registration";
import {GoogleLogin} from "./GoogleLogin";

export const LoginAndRegistration: FC = () => {

    const {
        isAuth,
        errorMessage
    } = useAppSelector((state) => state.authReducer);
    const [clickRegistration, setClickRegistration] = useState(false)

    return (
        <div>

            {clickRegistration ?
                <div className={s.text}> Регистрация в Mnemology </div> :
                <div className={s.text}> Вход в Mnemology </div>
            }

            <div>
                {!clickRegistration &&
                    <div>
                        <Login isAuth={isAuth}
                               errorMessage={errorMessage}/>
                        <GoogleLogin/>

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
                {clickRegistration &&
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
                }
            </div>
        </div>
    )
};
