import {RefObject, useEffect} from "react";

export default function useClickOutside(ref: RefObject<HTMLDivElement>, callback: () => void) {
    useEffect(() => {

        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                const burger = document.getElementById("dropDown")
                if (burger && !burger.contains(event.target)) {
                    callback();
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}