import React, {FC, useState} from "react";
import {IEngWord, IExample, IMnemonic, IPart, PartTypes} from "../../../shared/models/engWordTypes";
import s from "./Example.module.css";
import {useAppDispatch} from "../../../store";
import {
    addExampleLikeAsync,
    deleteExampleAsync,
    deleteExampleLikeAsync,
    setUpdateExample
} from "../../../store/engWordSlice";
import {ReactComponent as HeartNo} from "../../../import/icons/heart.svg"
import {ReactComponent as HeartYes} from "../../../import/icons/heart-clicked.svg"
import {ReactComponent as Pencil} from "../../../import/icons/pencil.svg"
import {ReactComponent as Trash} from "../../../import/icons/trash-bin.svg"
import UpdateExample from "./UpdateExample";


type PropsType = {
    example: IExample,
    engWord: IEngWord | null,
    mnemonics: Array<IMnemonic>
    updateExample: IExample | null
}
const ExampleComponent: FC<PropsType> = (props) => {
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false);
    let editExample = () => {
        dispatch(setUpdateExample(props.example))
        setEdit(true)
    };

    let addLikeExample = () => {
        if (!props.example.liked) {
            dispatch(addExampleLikeAsync(props.example.exampleId))
        } else {
            dispatch(deleteExampleLikeAsync(props.example.exampleId))
        }
    };
    let deleteExample = () => {
        dispatch(deleteExampleAsync(props.example.exampleId))
    };

    let exampleFn = (part: IPart) => {
        if (part.type === PartTypes.PLAIN) {
            return <span>{part.part}</span>
        } else if (part.type === PartTypes.TRANSLATION) {
            return <span className={s.translationPart}>{part.part}</span>
        } else if (part.type === PartTypes.MNEMONIC) {
            return <span className={s.mnemonicPart}>{part.part}</span>
        }
    };

    let Like = <HeartNo/>;
    if (props.example.liked) {
        Like = <HeartYes/>
    }


    return (
        <div className={s.exampleComponent}>
            {!edit
                ?
                <>
                    <div className={s.example}>
                        <div>
                            {props.example.parts.map(p => exampleFn(p))}
                        </div>
                    </div>
                    <div className={s.b}>
                        <div className={s.author}> автор: <> </>
                            {props.example.creator.nickname}
                        </div>
                        <div className={s.buttonIcons}>
                            <div onClick={deleteExample} className={s.deleteIcon}><Trash/></div>
                            <div onClick={editExample}><Pencil/></div>
                            <div onClick={addLikeExample}>{Like}</div>
                            <div className={s.likeCountContainer}>
                                <span className={s.likeCount}>{props.example.likes}</span>
                            </div>

                        </div>
                    </div>
                </>
                :
                <>
                    {props.updateExample &&
                        <UpdateExample engWord={props.engWord}
                                       mnemonics={props.mnemonics}
                                       newExample={props.updateExample}
                                       setEdit={setEdit}
                        />
                    }
                </>
            }
        </div>
    )
};


export default ExampleComponent