import React, {FC, useEffect, useRef, useState} from "react";
import style from "./navbar.module.css";
import {useAppDispatch, useAppSelector} from "../../../store";
import {getEngWordSuggestAsync, setEngWordAuto} from "../../../store/engWordSlice";
import {useNavigate} from "react-router";
import {ReactComponent as Search} from "../../../import/icons/search.svg";
import useDebounce from "../../util/useDebounce";
import useClickOutside from "../../util/clickOutside";
import {ITranslation} from "../../../shared/models/engWordTypes";


export const EngWordAutosuggest: FC<{transWidth: number}> = ({transWidth}) => {
    const {
        suggestions
    } = useAppSelector((state) => state.engWordReducer);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [value, setValue] = useState("")
    const debouncedValue = useDebounce<string>(value, 200)
    const searchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            clearSuggestions()
        }
        setValue(e.target.value)
    };
    const goToWord = (engWord?: string) => {
        if (engWord) {
            navigate(`/eng/${engWord}`)
        } else {
            navigate(`/eng/${value.toLowerCase()}`)
        }
        setValue("")
    };
    const pressHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            goToWord()
        }
    };
    useEffect(() => {
        onSuggestionsFetchRequested()
    }, [debouncedValue])
    useEffect(() => {
        return () => {
            clearSuggestions()
        }
    }, [])

    const onSuggestionsFetchRequested = () => {
        if (value !== "") {
            dispatch(getEngWordSuggestAsync(value))
        }
    }
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => setValue(""))

    const joinTranslations = (translations: Array<ITranslation>) => {
        const transText = translations.map(el => el.translation).join(', ');
        if (transText.length > transWidth) {
            return transText.substring(0, transWidth) + '...'
        }
        return transText
    }
    const boldLetters = (word:string, search:string) => {
        let startIndex = word.indexOf(search)
        return (
            <>
                <span>{word.substring(0, startIndex)}</span>
                <span style={{fontWeight: '900'}}>{word.substring(startIndex, startIndex + search.length)}</span>
                <span>{word.substring(startIndex+search.length, word.length)}</span>
            </>
        )
    }

    const renderSuggestion = () => {
        return (
        <>
            {suggestions.map(suggest =>
                    <div key={suggest.id} className={style.suggestion} onClick={() => goToWord(suggest.engWord)}>
                        <>{boldLetters(suggest.engWord, value)}</> - <>{joinTranslations(suggest.translations)}</>
                   </div>)
            }
        </>
        )
    }

    const clearSuggestions = () => {
        dispatch(setEngWordAuto([]));
    }
    const inputBorderStyle = (suggestions.length > 0 && value.length > 0) ? style.inputAndIconBorderFocus : style.inputAndIconBorder;

    return (
        <div className={style.inputAndIcon + ' ' + inputBorderStyle}>
            <div className={style.searchIcon}
                 onClick={() => goToWord()}>
                <Search/>
            </div>
            <input type="text"
                   placeholder="поиск..."
                   className={style.searchInput}
                   value={value}
                   onChange={searchWord}
                   onKeyPress={pressHandler}
            />
            {value.length > 0  && suggestions.length > 0 &&
                <div className={style.suggestions} id={"autoSearch"} ref={ref}>
                    {renderSuggestion()}
                </div>
            }
        </div>
    );
}