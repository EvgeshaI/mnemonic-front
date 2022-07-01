import React, {ChangeEvent, useState} from "react";
import {useAppDispatch} from "../../../store";
import {useForm} from "react-hook-form";

import s from "./auth.module.css";
import {changePasswordAsync} from "../../../store/authSlice";
import {useLocation} from "react-router-dom";

type FormValues = {
    password: string;
    confirmPassword: string
};

export const ChangePassword = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors}  } = useForm<FormValues>({
        mode: "onChange"
    });
    const [newPassword, setNewPassword] = useState('')
    let passwordsAreEqual = (confirmPassword: string) => {
        return confirmPassword === newPassword
    }
    const token = new URLSearchParams(useLocation().search).get('token') || '';

    let onSubmit = handleSubmit((data) =>
        dispatch(changePasswordAsync(token, newPassword)));

    return (
        <div className={s.changeForm}>
            <div className={s.textNewPassword}> Придумайте новый пароль </div>
            <form onSubmit={onSubmit}>
                <div className = {errors.password ? s.inputResetError : s.inputReset}>
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
                <div className = {errors.password ? s.inputResetError : s.inputReset}>
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
                            className = {s.changeButton}>
                        Обновить пароль
                    </button>
                </div>

            </form>
        </div>
    )
}