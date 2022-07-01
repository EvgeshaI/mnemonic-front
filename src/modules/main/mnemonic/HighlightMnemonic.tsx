import React, {FC} from "react";
import s from "./mnemonic.module.css"


const HighlightMnemonic: FC<{highlight: Array<number>, mnemonic: string}> = (props) => {

    return (
        <>
            {props.mnemonic.split("")
                .map((letter, index) =>
                    props.highlight.indexOf(index) !== -1 ?  <b className={s.colorHighlight}>{letter}</b> :  <span>{letter}</span>)}
        </>
    )
};

export default HighlightMnemonic