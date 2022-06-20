import React, {FC, useState} from "react";
import s from "./navbar.module.css"
import {ReactComponent as User} from "../../../import/icons/user.svg"
import {ReactComponent as Search} from "../../../import/icons/search.svg"
import {useNavigate} from "react-router";

export const Navbar: FC = () => {

    const [word, setWord] = useState("")

    const searchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value)
    };
    const navigate = useNavigate();
    const goToWord = () => {
        navigate(`/eng/${word}`)
        setWord("")
    };
    const userPage = () => {
        navigate(`/user`)
    };
    const startPage = () => {
        navigate(`/mnemosic`)
    };
    const pressHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            goToWord()

        }
    };

    return (
        <div className={s.navbar}>
            <div className={s.logo}
                 onClick={startPage}
            > Logo
            </div>
            <div className={s.search}>
                <div className={s.inputAndIcon}>
                    <div className={s.searchIcon}
                    onClick={goToWord}>
                        <Search/>
                    </div>
                    <input type="text"
                           placeholder="поиск..."
                           className={s.searchInput}
                           value = {word}
                           onChange={searchWord}
                           onKeyPress={pressHandler}

                    />
                </div>
            </div>

            <div onClick={userPage}
                className={s.profile}>
                <User/>
            </div>
        </div>
    )
};