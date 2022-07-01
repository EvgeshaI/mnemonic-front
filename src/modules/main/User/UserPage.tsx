import React, {useEffect, useState} from "react";
import s from "./userPage.module.css"
import {useAppDispatch, useAppSelector} from "../../../store";
import {getMyPageAsync, searchMyMnemoAsync} from "../../../store/userSlice";
import {UserPageContainer} from "./UserPageContainer";
import {ReactComponent as Search} from "../../../import/icons/search.svg"

export const UserPage = () => {
    const {
        studies
    } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const [word, setWord] = useState('')
    const searchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value)
    };
    const pressHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            searchMnemo()
        }

    };
    const getMyMnemo = () => {
        dispatch(getMyPageAsync())
    }
    const searchMnemo = () => {
        dispatch(searchMyMnemoAsync(word))
        setWord('')
    }
    useEffect(() => {
        dispatch(getMyPageAsync())
    }, [])

    return (
        <>
            <div className={s.user}>
                <div onClick={getMyMnemo}
                    className={s.text}>
                    Мои мнемоники
                </div>
            </div>
            <div className={s.search}>
                <div className={s.inputAndIconSearch}>
                    <div className={s.searchIcon}
                         onClick={searchMnemo}>
                        <Search/>
                    </div>
                    <input type="text"
                           placeholder="поиск по словарю..."
                           className={s.searchMyMnemo}
                           value={word}
                           onChange={searchWord}
                           onKeyPress={pressHandler}
                    />
                </div>
            </div>

            <div>
                {studies &&
                    <div>
                        {studies.map(el =>
                            <div className={s.myPage} key={el.studyId}>
                                <UserPageContainer
                                    mnemonic = {el.mnemonic}
                                    engWord = {el.engWord}
                                    examples={el.examples}
                                    translations={el.translations}
                                    studyId={el.studyId}
                                />
                            </div>)}
                    </div>
                }
            </div>
        </>
    )
}