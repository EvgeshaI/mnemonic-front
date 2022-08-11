import React, {FC} from "react";
import s from "./mnemonic.module.scss"


const HighlightMnemonic: FC<{highlight: Array<number>, mnemonic: string}> = (props) => {

    return (
        <>
            {props.mnemonic.split("")
                .map((letter, index) =>
                    props.highlight.indexOf(index) !== -1 ?
                        <b key={index} className={s.colorHighlight}>{letter}</b>
                        :
                        <span key={index}>{letter}</span>
                )}
        </>
    )
};

export default HighlightMnemonic