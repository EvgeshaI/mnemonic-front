import {useEffect} from "react";

export default function usePressEnter(callback: (e: KeyboardEvent) => void) {
    useEffect(() => {

        document.addEventListener("keypress", callback);
        return () => {
            document.removeEventListener("keypress", callback);
        };
    }, []);
}

