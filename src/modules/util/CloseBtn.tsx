import React, {FC} from "react";
import common from "../main/common.module.scss";
import {ReactComponent as CloseIcon} from "../../import/icons/close-slim.svg";

type Props = {
    close: () => void
}
export const CloseBtn:FC<Props> = (props) => {

    return (
        <div className={common.closeButtonBox} onClick={() => props.close()}>
            <div>
                <CloseIcon/>
            </div>
        </div>
    )
}