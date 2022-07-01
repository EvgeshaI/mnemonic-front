//обращение к серверу
import {IAuthResponse, IEngWord, IExample, IMnemonic, IPageElements, IStudy,} from "../shared/models/engWordTypes";
import {BaseClient} from "./BaseClient";

export class MnemonicClient extends BaseClient {
    static async getEngWord (word: string) {
        return this.get<IEngWord>(`eng-word/${word}`)
    }

    static async getMnemonic (id: number) {
        const params = { engWordId: id };
        return this.get<IPageElements<IMnemonic>>(`mnemonic`, {params})
    }
    static async getExample (id: number) {
        const params = { engWordId: id };
        return this.get<IPageElements<IExample>>(`example`, {params})
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
        return this.post<undefined> (`example/like/`, undefined, {params})
    }
    static async deleteExampleLike (id: number) {
        const params = {exampleId: id};
        return this.delete(`example/like/`, {params})
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
        return this.post<IExample> (`example`, newExample)
    }

    static async updateExample (example: IExample) {
        return this.put<IExample>(`example`, example)
    }

    static async checkExample (exampleId: number | null, engWordId: number, sentence: string, translationId?: number | null, mnemonicId?: number | null) {
        let body = {
            exampleId: exampleId,
            engWordId: engWordId,
            translationId: translationId,
            mnemonicId: mnemonicId,
            sentence: sentence
        };
        return this.post<IExample>(`example/check`, body)
    }

    static async deleteExample (id: number) {
        return this.delete(`example/${id}`)
    };

    static async signUp (nickName: string, email: string, password: string) {
        let body = {
            nickname: nickName,
            email: email,
            password: password
        }
        return this.post<IAuthResponse>(`auth/sign-up`, body)
    };
    static async authUser ( email: string, password: string) {
        let body = {
            email: email,
            password: password
        }
        return this.post<IAuthResponse>(`auth/login`, body)
    };

    static async myPage () {
        return this.get<IPageElements<IStudy>>(`study/my`)
    };

    static async searchMyMnemo (word: string) {
        return this.get<IPageElements<IStudy>>(`study/my?search=${word}`)
    };

    static async resetPassword (email: string) {
        return this.get(`auth/reset-password?email=${email}`)
    };
    static async changePassword (token: string, password: string) {
        let body = {
            password: password,
            token: token
        }
        return this.post(`auth/change-password`, body )
    };
}


