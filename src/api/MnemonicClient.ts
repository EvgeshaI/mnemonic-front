//обращение к серверу
import {IEngWord, IExample, IMnemonic, IPageExample, IPageMnemonic, ITranslation} from "../shared/models/engWordTypes";
import {BaseClient} from "./BaseClient";

export class MnemonicClient extends BaseClient {
    static async getEngWord (word: string) {
        return this.get<IEngWord>(`eng-word/${word}`)
    }

    static async getMnemonic (id: number) {
        const params = { engWordId: id };
        return this.get<IPageMnemonic>(`mnemonic`, {params})
    }
    static async getExample (id: number) {
        const params = { engWordId: id };
        return this.get<IPageExample>(`mnemonic/example`, {params})
    }

    static async postMnemonicLike (id: number) {
        const params = { mnemonicId: id};
        return this.post<undefined>(`mnemonic/like/`, undefined,{params})
    }
    static async deleteMnemonicLike (id: number) {
        return this.delete(`mnemonic/like/?mnemonicId=${id}`)
    }

    static async postExampleLike (id: number) {
        const params = {exampleId: id};
        return this.post<undefined> (`mnemonic/example/like/`, undefined, {params})
    }
    static async deleteExampleLike (id: number) {
        const params = {exampleId: id};
        return this.delete(`mnemonic/example/like/`, {params})
    }

    static async addMnemonic (engWordId: number, phrase: string, hl:Array<number>) {
        let body = {
            engWordId: engWordId,
            phrase: phrase,
            highlight: hl
        };
        return this.post(`mnemonic/`, body)
    }
    static async deleteMnemonic (id: number) {
        return this.delete(`mnemonic/${id}`)
    };
    static async addMeMnemonic (id: number) {
        return this.post(`mnemonic/my/add/${id}`, null)
    }
    static async updateMnemonic(mnemonicId: number, mnemonicPhrase: string, highlight: Array<number>) {
        let body = {
            mnemonicId: mnemonicId,
            phrase: mnemonicPhrase,
            highlight: highlight
        };
        return this.put<IMnemonic>(`mnemonic/`, body)
    }

    static async deleteMeMnemonic (id: number) {
        return this.delete(`mnemonic/my/delete/${id}`)
    };

    static async saveExample (newExample: IExample) {
        return this.post (`mnemonic/example`, newExample)
    }

    static async updateExample (example: IExample) {
        return this.put<IExample>(`mnemonic/example`, example)
    }

    static async checkExample (exampleId: number | null, engWordId: number, sentence: string, translationId?: number | null, mnemonicId?: number | null) {
        let body = {
            exampleId: exampleId,
            engWordId: engWordId,
            translationId: translationId,
            mnemonicId: mnemonicId,
            sentence: sentence
        };
        return this.post<IExample>(`mnemonic/example/check`, body)
    }

    static async deleteExample (id: number) {
        return this.delete(`mnemonic/example/${id}`)
    };





   // getEngWord
   static async addTranslation (id: number, word:string) {
        return addTranslationResponse (word)
   }
   // static async addMnemonic (id: number, mnemo:string, hl:Array<number>){
   //      return addMnemonicResponse (mnemo, hl)
   // }
   // static async addExample (id: number, mnemonicId: number, translationId: number, sentence: string) {
   //      return addExampleResponse (mnemonicId, translationId, sentence)
   // }
   // static async checkExample(id: number, example: ICheckExample) {
   //     let translationId = example.translationId ? example.translationId : 666;
   //     let mnemonicId = example.mnemonicId ? example.mnemonicId : 666;
   //      return checkExampleResponse (example.sentence, translationId, mnemonicId)
   // }

}

const addTranslationResponse = (word: string) => {
    let iTranslation = exampleTranslations.get(word);
    return iTranslation ? iTranslation : {
        id: 11,
        translation: word
    }
}
let exampleTranslations = new Map<string, ITranslation>()
exampleTranslations.set('фото',{
    id: 11,
    translation: 'фото'
})
exampleTranslations.set('изображение',{
    id: 22,
    translation: 'изображение'
})

const addMnemonicResponse = (mnemo: string, hl: Array<number>) => {
    return {
        id: 123,
        phrase: mnemo,
        highlight: hl,
        creator : {
            id: 123,
            author : "Ivanov"
        }
    }
}

const translations = new Map<number, ITranslation>()
translations.set(11, {
    id: 11,
    translation: "фото"
})
translations.set(22, {
    id: 22,
    translation: "изображение"
})
