import React, {FC} from "react";
import s from "./EngWord.module.scss";
import {ReactComponent as AudioIcon} from "../../../import/icons/audio.svg";

type AudioComponentPropsType = {
    audioFile: string
}

export const AudioComponent: FC<AudioComponentPropsType> =(props) => {
    let audio = new Audio(props.audioFile)

    const playAudio = () => {
        audio.play()
    }
    return (
        <div className={s.iconAudio} onClick={playAudio}>
            <AudioIcon/>
        </div>
    )
}