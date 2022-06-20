import React, {FC} from "react";


const HighlightMnemonic: FC<{highlight: Array<number>, mnemonic: string}> = (props) => {

    return (
        <>
            {props.mnemonic.split("")
                .map((letter, index) =>
                    props.highlight.indexOf(index) !== -1 ?  <b>{letter}</b> :  <span>{letter}</span>)}
        </>
    )
};

export default HighlightMnemonic