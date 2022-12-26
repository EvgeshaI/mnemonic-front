import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../store";
import s from "./vocabulary.module.scss"
import {Vocabulary} from "./Vocabulary";
import {getEngWordVocabulary, resetVocabulary} from "../../../store/engWordSlice";
import {IVocabulary} from "../../../shared/models/engWordTypes";
import InfiniteScroll from "react-infinite-scroll-component";
import {Preloader} from "../Preloader/Preloader";

export const EngWordVocabulary = () => {
    const dispatch = useAppDispatch()
    const {
        engWordVocabulary,
        hasMore
    } = useAppSelector((state) => state.engWordReducer);

    useEffect(() => {
        dispatch(getEngWordVocabulary())
    }, [])


    useEffect(() => {
        return () => {dispatch(resetVocabulary())}
    }, [])
    //
    // const checkPosition = () =>  {
    //     const height = document.body.offsetHeight
    //     const screenHeight = window.innerHeight
    //     const scrolled = window.scrollY
    //     const threshold = height - screenHeight / 4
    //     const position = scrolled + screenHeight
    //     if (position >= threshold) {
    //         dispatch(getEngWordVocabulary())
    //     }
    // }

    const vocabularies = () => {
        let map = new Map<string, Array<IVocabulary>>()
        if(engWordVocabulary){
            for (let vocabulary of engWordVocabulary){
                let key = vocabulary.engWord[0]
                if(map.has(key)){
                    map.get(key)!.push(vocabulary)
                }else{
                    map.set(key, [vocabulary])
                }
            }
        }
        return map
    }
    let letterAndVocabulary = vocabularies()

    const loadMnemo = () => {
        dispatch(getEngWordVocabulary())
    }
    return (
        <div className={s.engWordVocabulary}>
                <InfiniteScroll dataLength={letterAndVocabulary.size}
                                next={loadMnemo}
                                hasMore={hasMore}
                                loader={<Preloader/>}
                >
                    {Array.from(letterAndVocabulary.keys()).map((letter, i) =>
                        <Vocabulary key={i} letter={letter} vocabularies={letterAndVocabulary.get(letter)!}/>)}
                </InfiniteScroll>
        </div>
    )
}