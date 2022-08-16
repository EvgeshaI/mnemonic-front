import React, {useEffect, useState} from "react";
import s from "./userPage.module.scss"
import {useAppDispatch, useAppSelector} from "../../../store";
import {getMyPageAsync, initUserPageState} from "../../../store/userSlice";
import {UserPage} from "./UserPage";
import {ReactComponent as Search} from "../../../import/icons/search.svg"
import useDebounce from "../../util/useDebounce";
import {Preloader} from "../Preloader/Preloader";
import {Statistics} from "./Statistics";

export const UserPageContainer = () => {
    const {
        studies,
        hasMore,
        createExampleMap
    } = useAppSelector((state) => state.userReducer);
    const {
        isFetching
    } = useAppSelector((state) => state.appReducer);
    const dispatch = useAppDispatch();
    const [word, setWord] = useState('')
    const searchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value)
    };
    const debouncedValue = useDebounce<string>(word, 200)

    const pressHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            loadMyMnemo()
        }
    };
    const loadMyMnemo = () => {
        if (/^(\s+)$/.test(word)) {
            return
        }
        dispatch(getMyPageAsync(word))
    }

    useEffect(() => {
        loadMyMnemo()
    }, [debouncedValue])
    useEffect(() => {
        return () => {dispatch(initUserPageState())}
    }, [])

    return (
        <>
            <div className={s.user}>
                <div
                    className={s.text}>
                    Мои мнемоники
                </div>
            </div>
            <Statistics/>
            {studies.length === 0 && debouncedValue === "" && !isFetching &&
                <div className={s.message}> У вас пока не добавлено ни одной мнемоники</div>
            }
                <>
                    {(studies.length > 0 || word !== "") &&
                        <div className={s.search}>
                            <div className={s.inputAndIconSearch}>
                                <div className={s.searchIcon} onClick={loadMyMnemo}>
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
                    }

                    {isFetching &&
                        <Preloader/>
                    }

                    {studies.length === 0 && word !== "" && !isFetching ?
                        <div className={s.message}>По вашему запросу ничего не найдено</div>
                        :
                        <div>

                            {studies.map(el =>
                                <div key={el.studyId}>
                                    <UserPage
                                        createExampleMap={createExampleMap}
                                        mnemonic={el.mnemonic}
                                        engWord={el.engWord}
                                        examples={el.examples}
                                        translations={el.translations}
                                        studyId={el.studyId}
                                        transcriptions={el.transcriptions}
                                        key={el.studyId}
                                    />
                                </div>
                            )}
                        </div>
                    }

                    {hasMore &&
                        <div className={s.hasMoreBox}>
                            <div className={s.hasMoreBtn} onClick={loadMyMnemo}>Загрузить еще</div>
                        </div>
                    }
                </>

        </>
    )
}