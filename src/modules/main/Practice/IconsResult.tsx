import React, {FC} from "react";
import s from "./practice.module.scss";
import {ReactComponent as Ok} from "../../../import/icons/ok.svg";
import {ReactComponent as Error} from "../../../import/icons/error.svg";


type IconsResultPropsType = {
    engWordCorrect: boolean,
    translateCorrect: boolean,
    checkedCount: number,
    wrongEngWord: boolean,
    wrongTranslation: boolean
}
export const IconsResult: FC<IconsResultPropsType> = (props) => {

    return (
    <div className={s.iconResultBox}>
        {props.engWordCorrect && props.translateCorrect &&
            <div className={s.rightIcon}><Ok/></div>
        }
        {(props.checkedCount > 0 && (props.wrongEngWord || props.wrongTranslation)) &&
            <div className={s.rightIcon}><Error/></div>
        }
    </div>
    )
}