function abbreviate(string) {
    let items = ["!", ",", "?", "."]
    let str = string.split(" ")
    let result = []
    for(let i=0; i<str.length; i++){
        let letter = str[i]
        if(items.includes(letter[letter.length-1])) letter = letter.substring(0, letter.length-1)
        if(letter.includes("-")){
            let st = letter.split("-")
            let a = st.map(el => {
                if(el.length>3){
                    return `${el[0]}${el.length-2}${el[el.length-1]}`
                }else{
                    return el
                }
            }).join("-")
            result.push(a)
        }else{
            if(letter.length>3){
                result.push(`${letter[0]}${letter.length-2}${letter[letter.length-1]}`)
            }else{
                result.push(letter)
            }
        }
    }
    return result.join(" ")
}