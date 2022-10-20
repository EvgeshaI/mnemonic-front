import React, {FC, useEffect, useState} from "react";
import s from "./consonance.module.scss"
import {ReactComponent as Search} from "../../../import/icons/search.svg";
import {ReactComponent as Question} from "../../../import/icons/question.svg";
import {useAppDispatch, useAppSelector} from "../../../store";
import {findByRegexpAsync} from "../../../store/regexpSlice";
import {ConsonanceContent} from "./ConsonanceContent";
import './toggle.scss'
import Toggle from "react-toggle";
import useDebounce from "../../util/useDebounce";


type ConsonancePropsType = {
    locationContent: string | null
}

export const Consonance: FC<ConsonancePropsType> = (props) => {
    const {
        consonances
    } = useAppSelector((state) => state.regexpReducer);
    const [onlyInit, setOnlyInit] = useState(true)
    const [search, setSearch] = useState("")
    const [correct, setCorrect] = useState(true)
    const dispatch = useAppDispatch()
    const debouncedValue = useDebounce<string>(search, 200)

    useEffect(() => {
        correctText()
    }, [debouncedValue, onlyInit])
    const correctText = () => {
        const match = /^([а-яА-ЯёЁ?*]+)$/.test(search);
        if (search === '') {
            setCorrect(true)
            // dispatch(clearConsonance())
        } else if(match){
            setCorrect(true)
            dispatch(findByRegexpAsync(search, onlyInit))
        }else{
            setCorrect(false)
        }
    }
    const searchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    // useEffect(() => {
    //     return () => {
    //         dispatch(clearConsonance())
    //     }
    // }, []);


    return (
        <>
            <div className={s.consonances}>
                {props.locationContent === "navbar" &&
                    <div className={s.text}>
                        Поиск созвучий
                    </div>
                }
                {props.locationContent === "navbar" ?
                    <div className={s.instructionText}>
                        Данный раздел поможет вам подобрать русские слова, созвучные английским или содержащие созвучную часть. <br/>
                        Для этого введите в поиске на русском языке транслитерацию или ее часть. <br/>
                        Чтобы расширить поиск, добавляйте дополнительные буквы с помощью специальных символов "?" и "*".
                    </div>
                    :
                    <div className={s.instructionText}>
                        введите в поиске на русском языке транслитерацию или ее часть
                    </div>
                }

            </div>
            <div>
                <div className={s.search}>
                    <div className={correct ? s.inputAndIconSearch: s.inputAndIconSearchError}>
                        <div className={s.searchIcon}>
                            <Search/>
                        </div>
                        <input type="text"
                               placeholder="поиск..."
                               className={s.searchRegexp}
                               autoFocus={true}
                               value={search}
                               onChange={searchWord}
                        />
                    </div>
                <>
                    {!correct && <div className={s.errorText}>Некорректный формат поиска</div>}
                    <div className={s.toggle}>
                        <label>
                            <div className={s.toggleTextBox}>
                                <span className={s.toggleText}>Начальная форма</span>
                                <Toggle
                                    defaultChecked={onlyInit}
                                    onChange={() => setOnlyInit(!onlyInit)}/>
                            </div>
                        </label>
                    </div>
                    <div className={s.instructionBox}>
                        <div className={s.instructionIcon}><Question/></div>
                        <div className={s.instruction}>
                            ? - неизвестная буква
                            <br/>* - любое количество неизвестных букв
                            <br/>Например: *марк?
                        </div>
                    </div>
                </>
                </div>
            </div>
            <div className={s.contentBox}>
                {consonances.map((el, i) =>
                    <div className={s.content} key={i}>
                        <ConsonanceContent
                            key={i}
                            consonances={el}
                            locationContent={props.locationContent}
                        />
                    </div>
                )}
            </div>

            </>
            )
}