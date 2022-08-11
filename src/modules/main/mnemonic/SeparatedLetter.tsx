import React, {FC, useState} from "react";
import s from './mnemonic.module.scss';

const SeparatedLetter: FC<{ letter: string, index: number, addNumber: (i: number) => void, deleteNumber: (i: number) => void }> = props => {
    let [entered, setEntered] = useState(false);

    let clickLetter = (e: any) => {
        if (props.letter === " ") {
            return
        }
        let currentValue = !entered;
        setEntered(currentValue);
        if (currentValue) {
            props.addNumber(props.index)
        } else {
            props.deleteNumber(props.index)
        }
    };

    let style = s.separatedLetter + " " + (entered ? s.separatedLetterActive : '');
    return (
        <>
            {props.letter === ' ' ?
                <span className={s.whitespace}/> :
                <div className={style} onClick={clickLetter}>
                    {props.letter}
                </div>
            }
        </>
    )
};

export default SeparatedLetter;