import React, {FC, useState} from "react";
import s from "../EngWord.module.css";
import s2 from "./mnemonic.module.css";
import {IMnemonic} from "../../../shared/models/engWordTypes";
import HighlightMnemonic from "./HighlightMnemonic";
import {useAppDispatch} from "../../../store";
import {
    addMeMnemonicAsync,
    addMnemonicLikeAsync,
    deleteMeMnemonicAsync,
    deleteMnemonicAsync,
    deleteMnemonicLikeAsync
} from "../../../store/engWordSlice";
import {ReactComponent as HeartNo} from "../../../import/icons/heart.svg"
import {ReactComponent as HeartYes} from "../../../import/icons/heart-clicked.svg"
import {ReactComponent as Pencil} from "../../../import/icons/pencil.svg"
import {ReactComponent as Trash} from "../../../import/icons/trash-bin.svg"
import {ReactComponent as Add} from "../../../import/icons/add.svg"
import {ReactComponent as Minus} from "../../../import/icons/minus.svg"
import {ReactComponent as Bold} from "../../../import/icons/bold1.svg"
import {ReactComponent as NotBold} from "../../../import/icons/bold2.svg"
import UpdateMnemonic from "./UpdateMnemonic";


type PropsType = {
    mnemonic: IMnemonic
}
const MnemonicComponent: FC<PropsType> = (props) => {
    const [bold, setBold] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    let pushBold = () => {
        setBold(!bold)
    };
    const dispatch = useAppDispatch();
    let addLikeMnemonic = () => {
        if (!props.mnemonic.isLiked) {
            dispatch(addMnemonicLikeAsync(props.mnemonic.mnemonicId))
        } else {
            dispatch(deleteMnemonicLikeAsync(props.mnemonic.mnemonicId))
        }
    };
    let deleteMnemonic = () => {
        dispatch(deleteMnemonicAsync(props.mnemonic.mnemonicId))
    };
    let addMeMnemonic = () => {
        if (!props.mnemonic.added) {
            dispatch(addMeMnemonicAsync(props.mnemonic.mnemonicId))
        }else {
            dispatch(deleteMeMnemonicAsync(props.mnemonic.mnemonicId))
        }
    };

    let editMnemo = () => {
        setEdit(true)
    };

    let Like = <HeartNo/>;
    if (props.mnemonic.isLiked) {
        Like = <HeartYes/>
    }
    let addDelete = <Add/>;
    if (props.mnemonic.added) {
        addDelete = <Minus/>;
    }

    let boldIcon = <NotBold/>;
        if(bold){
            boldIcon = <Bold/>
        }

    return (

        <div className={s.mnemonicComponent}>
            {!edit ?
                <>
                <div className={s.highlightWord}>
                    <b>{props.mnemonic.highlightWord}</b>
                </div>

                <div className={s.mnemo}>
                    {bold ? <HighlightMnemonic
                        highlight={props.mnemonic.highlight}
                        mnemonic={props.mnemonic.phrase}
                    /> : props.mnemonic.phrase}
                </div>

                <div className={s.mnemonicBottom}>
                    <span className={s.author}>автор: <> </>
                        {props.mnemonic.creator.nickname}
                    </span>
                    <div className={s.buttonIcons}>
                        <div onClick={pushBold}>  {boldIcon} </div>
                        {!props.mnemonic.isCreator &&
                        <div onClick={addMeMnemonic}> {addDelete} </div>
                        }
                        {props.mnemonic.isCreator && !props.mnemonic.exampleExists &&
                            <div onClick={deleteMnemonic} className={s2.deleteIcon}><Trash/></div>
                        }
                        {props.mnemonic.isCreator && !props.mnemonic.exampleExists &&
                            <div onClick={editMnemo}> <Pencil/> </div>
                        }
                        <div onClick={addLikeMnemonic}>{Like}</div>
                        <div className={s.likeCountContainer}>
                            <span className={s.likeCount}>{props.mnemonic.likes}</span>
                        </div>
                    </div>
                </div>
                </>
                :
                <>
                    <UpdateMnemonic
                        mnemonicId={props.mnemonic.mnemonicId}
                        mnemonicPhrase={props.mnemonic.phrase}
                        setEdit={setEdit}
                    />
                </>
            }
        </div>


    )
};

export default MnemonicComponent

