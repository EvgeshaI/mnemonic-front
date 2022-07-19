import React, {FC, useEffect} from 'react'
import {useForm} from 'react-hook-form';
import s from "./login.module.css"
import {useAppDispatch} from "../../../store";
import {authUserAsync, setError} from "../../../store/authSlice";
import {useNavigate} from "react-router";


type FormValues = {
    username: string;
    email: string;
    password: string;
};
type LoginPropsType  = {
    isAuth: boolean
    errorMessage: string | null
    confirmed: boolean | null
}

export const Login: FC<LoginPropsType> = (props) => {
    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { errors}  } = useForm<FormValues>({
        mode: "onChange"
    });

    const clickResetPassword = () => {
        navigate("/reset")
    }

    let onSubmit = handleSubmit((data) => {
        dispatch(authUserAsync(data.email, data.password))
    });
    useEffect(() => {
        return () => {
            dispatch(setError(null))
        }
    }, [])

    const navigate = useNavigate();
    useEffect(() => {
        if (props.isAuth) {
            if(window.history.state && window.history.state.idx > 0) {
                navigate(-1)
            }else {
                navigate('/mnemosic', {replace: true})
            }

        }
    }, [props.isAuth])

    return (
        <>
            {props.errorMessage &&
                <div className={s.errorMessage}> {props.errorMessage} </div>
            }
            <div className={s.loginContainer}>
                <form onSubmit={onSubmit}>

                    <div className = {errors.email ? s.formError : s.form}>
                        <input  {...register( "email", { required: true} )}
                                aria-invalid={errors.email ? "true" : "false"}
                                placeholder="Email" />
                        {errors.email && errors.email.type === "required" && (
                            <div className={s.errorMessage}>поле обязательно для заполнения</div>
                        )}

                    </div>

                    <div className = {errors.password ? s.formError : s.form}>
                        <input  {...register("password", { required: true})}
                                type={"password"}
                                aria-invalid={errors.password ? "true" : "false"}
                                placeholder="Пароль"
                        />
                        {errors.password && errors.password.type === "required" && (
                            <div className={s.errorMessage}>поле обязательно для заполнения</div>
                        )}


                    </div>

                    <div className = {s.formButtonBox}>
                        <button type="submit"
                                className = {s.formButton}>
                            Вход
                        </button>
                    </div>
                    <div onClick={clickResetPassword}
                        className={s.passwordFound}> Забыли пароль?</div>

                </form>


            </div>
        </>
    )
};