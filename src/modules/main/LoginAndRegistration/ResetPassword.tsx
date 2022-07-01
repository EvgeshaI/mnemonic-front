import React, {FC, useState} from "react";
import s from "./auth.module.css"
import {useAppDispatch} from "../../../store";
import {restorePasswordAsync} from "../../../store/authSlice";
import {useForm} from "react-hook-form";
import {ReactComponent as Checked} from "../../../import/icons/checked.svg";


type FormValues = {
    email: string;
};
export const ResetPassword: FC = () => {

    const [email, setEmail] = useState('')
    const [sendEmail, setSendEmail] = useState(false)
    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { errors}  } = useForm<FormValues>({
        mode: "onChange"
    });
    let onSubmit = handleSubmit  ((data ) => {
        dispatch(restorePasswordAsync(data.email))
        setEmail(data.email)
        setSendEmail (true)
    }
    )

    return (
        <>
                {!sendEmail ?
                    <div>
                    <div className={s.text}> Восстановление пароля</div>
                    <div className={s.resetForm}>
                        <form onSubmit={onSubmit}>
                            <div className = {errors.email ? s.inputResetError : s.inputReset}>
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
                            <button type="submit"
                                    className = {s.buttonReset}>
                                Восстановить пароль
                            </button>
                        </form>
                    </div>
                    </div>
                    :
                    <div>
                    <div className={s.sendText}>
                        На адрес электронной почты
                        <span className={s.emailText}> {email} </span> выслано письмо с инструкцией по смене пароля
                    </div>
                        <div className={s.icon}>
                            <Checked/>
                        </div>
                    </div>
                }

   </>

    )
}