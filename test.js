// функция сравнитель
const comparator = (a, b) => {
    return a-b
}

// функция перестановки
const swap = (arr, i, j) => {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

//пузырьковая сортировка

let bubbleSort = (arr) => {
    for(let i=0; i<arr.length; i++){
        for(let j=0; j<arr.length-1-i; j++){
            if(comparator(arr[j], arr[j+1]) > 0){
                swap(arr, j, j+1)
            }
        }
    }
}

//сортировка выбором

let selectionSort = (arr) => {
    for(let i=0; i<arr.length-1; i++){
        let min = i
        for(let j= i+1; j<arr.length; j++){
            if(comparator(arr[min], arr[j]) > 0){
                min = j
            }
        }
        if(min !== i) {
            swap(arr, i, min)
        }
    }
}