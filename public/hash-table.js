class Entry {
    constructor(key, value) {
        this.key = key
        this.value = value
    }
}

class HashTable {
    store = new Array(10)
    hash (key) {
        let hashCode = 0
        for (let i=0; i<key.length; i++){
              hashCode +=  key.charCodeAt(i)
        }
        return hashCode
    }
    add (key, value) {
        let index = this.hash(key) % this.store.length
        let subArray = this.store[index] || []
        let entry = subArray.find(el => el.key === key)
        if(entry){
            entry.value = value
        }else {
            subArray.push(new Entry(key, value))
        }
        this.store[index] = subArray
    }
    get (key) {
        let index = this.hash(key)% this.store.length
        let value = this.store[index].find(el => el.key === key).value
        return value
    }
}

// const map = new HashTable();
// map.add("ab", 1)
// map.add("ab", 5)
// map.add("ba", 2)
// console.log(map.get("ab"))
// console.log(map.get("ba"))

const map = {}
map['ab'] = 1
map['ab'] = 5
map['ba'] = 2
console.log(map["ab"])
console.log(map["ba"])