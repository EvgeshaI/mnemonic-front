import React, {FC, useEffect, useState} from "react";
import s from "./consonance.module.scss"
import {ReactComponent as Search} from "../../../import/icons/search.svg";
import {ReactComponent as Question} from "../../../import/icons/question.svg";
import {useAppDispatch, useAppSelector} from "../../../store";
import {
    addSelectedWords,
    clearConsonance,
    deleteConsonanceWords,
    findByRegexpAsync,
    setSearchConsonance
} from "../../../store/regexpSlice";
import {ConsonanceContent} from "./ConsonanceContent";
import './toggle.scss'
import Toggle from "react-toggle";
import useDebounce from "../../util/useDebounce";
import {ITransliteration, SelectedWord} from "../../../shared/models/engWordTypes";
import {HighlightLetter} from "./HighlightLetter";


type ConsonancePropsType = {
    locationContent: string | null
    transliterations?: Array<ITransliteration>
}

export const Consonance: FC<ConsonancePropsType> = (props) => {
    const {
        consonances,
        searchConsonances,
        consonanceWords
    } = useAppSelector((state) => state.regexpReducer);
    const [onlyInit, setOnlyInit] = useState(true)
    let [correct, setCorrect] = useState(true)
    const dispatch = useAppDispatch()
    const debouncedValue = useDebounce<string>(searchConsonances, 200)

    useEffect(() => {
        correctText()
    }, [debouncedValue, onlyInit])

    const correctText = () => {
        const match = /^([а-яА-ЯёЁ?*]+)$/.test(searchConsonances);
        if (searchConsonances === '') {
            setCorrect(true)
            dispatch(clearConsonance())
        } else if (match) {
            setCorrect(true)
            dispatch(findByRegexpAsync(searchConsonances, onlyInit))
        } else {
            setCorrect(false)
        }
    }
    const searchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchConsonance(e.target.value))
    }
    const deleteConsWord = (word: string) => {
        dispatch(deleteConsonanceWords(word))
    }

    const skipSymbols = (word: string) => {
        const syllables = searchConsonances.split('*')
        let highlight = Array<number>()
        let wordPart = word
        let initIndex = 0
        for (let i = 0; i < syllables.length; i++) {
            let searchPart = syllables[i];
            if (searchPart.length === 0) {
                continue
            }
            let splitSearchPart = searchPart.split("?")
            if (splitSearchPart.length > 1) {
                for (let k = 0; k < splitSearchPart.length; k++) {
                    let splitSearchPartElement = splitSearchPart[k];
                    let index = wordPart.indexOf(splitSearchPartElement)
                    wordPart = wordPart.substring(index)
                    highlight = [...highlight, ...getHighlight(splitSearchPartElement, initIndex + index)]
                    initIndex += index
                }
                continue
            }
            let index = wordPart.indexOf(searchPart)
            wordPart = wordPart.substring(index + searchPart.length)
            highlight = [...highlight, ...getHighlight(searchPart, initIndex + index)]
            initIndex += index + searchPart.length
        }
        dispatch(addSelectedWords({word, regexp: searchConsonances, highlight}))
    }

    const getHighlight = (word: string, index: number) => {
        let highlight = Array<number>()
        for (let i = 0; i < word.length; i++) {
            highlight.push(index + i)
        }
        return highlight
    }

    const groupSelectedWords = () => {
        const map = new Map<string, Array<SelectedWord>>()
        consonanceWords.map(el => {
            if (map.has(el.regexp)) {
                map.get(el.regexp)!.push(el)
            } else {
                map.set(el.regexp, [el])
            }
        })
        return Array.from(map.values())
    }

    return (
        <>
            <div className={s.consonances}>
                {props.locationContent === "navbar" &&
                    <div className={s.text}>
                        Поиск созвучий
                    </div>
                }
                <div className={s.instructionContainer}>
                    {consonanceWords.length > 0 ?
                        <div className={s.consonanceWordsBox}>
                            <div style={{paddingRight: "10px", width: '30%'}}>отложенные слова:</div>
                            <div style={{width: '70%'}}>
                                <>
                                    {groupSelectedWords().map(wordGroup =>
                                        <div className={s.words}>
                                            {wordGroup.map((el, i) =>
                                                <div
                                                    key={i}
                                                    style={{paddingRight: "10px", cursor: "pointer"}}
                                                    onClick={() => deleteConsWord(el.word)}>
                                                    <HighlightLetter word={el}/>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            </div>
                        </div>
                        :
                        <div className={s.instructionTextBox}>
                            {props.locationContent === "navbar" ?
                                <div className={s.instructionText}>
                                    Данный раздел поможет вам подобрать русские слова, созвучные английским или содержащие
                                    созвучную часть. <br/>
                                    Для этого введите в поиске на русском языке транслитерацию или ее часть. <br/>
                                    Чтобы расширить поиск, добавляйте дополнительные буквы с помощью специальных символов
                                    "?" и "*".
                                </div>
                                :
                                <div className={s.instructionText}>
                                    введите в поиске на русском языке транслитерацию или ее часть
                                    [{props.transliterations && props.transliterations[0].transliteration}]<br/>
                                    Чтобы расширить поиск, используйте специальные символы "?" и "*".
                                </div>
                            }
                        </div>
                    }
                </div>

            </div>
            <div>
                <div className={s.search}>
                    <div className={correct ? s.inputAndIconSearch : s.inputAndIconSearchError}>
                        <div className={s.searchIcon}>
                            <Search/>
                        </div>
                        <input type="text"
                               placeholder="поиск..."
                               className={s.searchRegexp}
                               autoFocus={true}
                               value={searchConsonances}
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
                            skipSymbols={skipSymbols}
                        />
                    </div>
                )}
            </div>

        </>
    )
}