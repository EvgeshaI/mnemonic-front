import {useEffect} from "react";

const useAppTheme = (isDarkTheme: boolean) => {
    const theme = isDarkTheme ? 'theme-dark' : 'theme-light'
    useEffect(() => {
        const backgroundColor = `var(--background-color-${theme})`
        const fontColor = `var(--font-color-${theme})`
        const icon = `var(--color-icon-${theme})`
        const shadowColor = `var(--shadow-${theme})`
        const error = `var(--errorColor-${theme})`
        const colorTextHeader = `var(--color-text-header-${theme})`
        const borderBottom = `var(--border-bottom-${theme})`
        const iconHover = `var(--color-icons-hover-${theme})`
        const navInput = `var(--nav-input-background-${theme})`
        const listBackground = `var(--list-background-${theme})`
        const borderRadius = `var(--border-radius-${theme})`
        const borderMobile = `var(--borderBottom-mobile-${theme})`
        document.body.style.setProperty('--background-color', backgroundColor)
        document.body.style.setProperty('--font-color', fontColor)
        document.body.style.setProperty('--color-icon', icon)
        document.body.style.setProperty('--shadow', shadowColor)
        document.body.style.setProperty('--errorColor', error)
        document.body.style.setProperty('--color-text-header', colorTextHeader)
        document.body.style.setProperty('--border-bottom', borderBottom)
        document.body.style.setProperty('--color-icons-hover', iconHover)
        document.body.style.setProperty('--nav-input-background', navInput)
        document.body.style.setProperty('--list-background', listBackground)
        document.body.style.setProperty('--border-radius', borderRadius)
        document.body.style.setProperty('--borderBottom-mobile', borderMobile)
    }, [isDarkTheme]);
};

export default useAppTheme