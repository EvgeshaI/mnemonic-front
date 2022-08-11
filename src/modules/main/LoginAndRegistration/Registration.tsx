import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form';
import s from "./login.module.scss"
import {useAppDispatch, useAppSelector} from "../../../store";
import {setError, signUpAsync} from "../../../store/authSlice";

type FormValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string
};

export const Registration: FC = () => {
    const {
        errorMessage
    } = useAppSelector((state) => state.authReducer);

    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors}  } = useForm<FormValues>({
        mode: "onChange"
    });
    useEffect(() => {
        return () => {
            dispatch(setError(null))
        }
    }, [])

    const [newPassword, setNewPassword] = useState('')

    let onSubmit = handleSubmit((data) =>
        dispatch(signUpAsync(data.username, data.email, data.password)));

    let passwordsAreEqual = (confirmPassword: string) => {
        return confirmPassword === newPassword
    }

    return (
        <>
            {errorMessage &&
                <div className={s.errorMessage}> {errorMessage} </div>
            }
        <div className={s.loginContainer}>
            <form onSubmit={onSubmit}>
                <div className = {errors.username ? s.formError : s.form}>
                    <input  {...register( "username", { required: true, maxLength: 30 } )}
                            aria-invalid={errors.username ? "true" : "false"}
                            placeholder="Имя пользователя" />
                    {errors.username && errors.username.type === "required" && (
                        <div className={s.errorMessage}>поле обязательно для заполнения</div>
                    )}
                    {errors.username && errors.username.type === "maxLength" && (
                        <div className={s.errorMessage}>имя должно содержать не более 30 символов </div>
                    )}
                </div>

                <div className = {errors.email ? s.formError : s.form}>
                    <input  {...register("email",
                        {
                                    required: true,
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: " Не корректный адрес электронной почты"
                                    }
                                })
                            }
                            aria-invalid={errors.email ? "true" : "false"}
                            placeholder="Email"  />
                    {errors.email && <div className={s.errorMessage}> {errors.email.message}</div>}
                    {errors.email && errors.email.type === "required" && (
                        <div className={s.errorMessage}>поле обязательно для заполнения</div>
                    )}
                </div>
                <div className = {errors.password ? s.formError : s.form}>
                    <input  {...register("password", { required: true, minLength: 6 })}
                            type={"password"}
                            aria-invalid={errors.password ? "true" : "false"}
                            placeholder="Пароль"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                    />
                    {errors.password && errors.password.type === "required" && (
                        <div className={s.errorMessage}>поле обязательно для заполнения</div>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                        <div className={s.errorMessage}> пароль должен содержать не менее 6 символов </div>
                    )}
                </div>
                <div className = {errors.password ? s.formError : s.form}>
                    <input  {...register("confirmPassword",
                        {
                                    required: true,
                                    validate: passwordsAreEqual
                                })
                            }
                            type="password"
                            aria-invalid={errors.confirmPassword ? "true" : "false"}
                            placeholder="Повторите пароль"
                    />
                    {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                        <div className={s.errorMessage}>поле обязательно для заполнения</div>
                    )}
                    {errors.confirmPassword && errors.confirmPassword.type === "validate" && (
                        <div className={s.errorMessage}>Пароли не совпадают</div>
                    )}
                </div>
                <div className = {s.formButtonBox}>
                    <button type="submit"
                            className = {s.formButton}>
                            Регистрация
                    </button>
                </div>
            </form>
        </div>
        </>
    )
};