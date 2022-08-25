//обращение к серверу
import {
    IAuthResponse,
    IAwait,
    IEngWord,
    IEngWordSuggest,
    IExample,
    IExampleHomePage,
    IMnemonic,
    IPageElements,
    IPractice,
    IStatistic,
    IStudy,
} from "../shared/models/engWordTypes";
import {BaseClient} from "./BaseClient";

export class MnemonicClient extends BaseClient {
    static async getEngWord (word: string) {
        const params = {
            word
        }
        return this.get<IEngWord>(`eng-word`, {params})
    }
    static async autoGetEngWord (word: string) {
        const params = {
            word
        }
        return this.get<Array<IEngWordSuggest>>(`eng-word/search`, {params})
    }

    static async getMnemonic (id: number, currentPage: number) {
        const params = {
            engWordId: id,
            page: currentPage,
            size: 5
        };
        return this.get<IPageElements<IMnemonic>>(`mnemonic`, {params})
    }
    static async getExample (id: number, currentExPage: number) {
        const params = {
            engWordId: id,
            page: currentExPage,
            size: 5
        };
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

    static async checkExample (exampleId: number | null, sentence: string, engWordId?: number, translationId?: number | null, mnemonicId?: number | null) {
        let body = {
            exampleId: exampleId,
            sentence: sentence,
            engWordId: engWordId,
            translationId: translationId,
            mnemonicId: mnemonicId
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

    static async myPage (currentPage: number, search?: string) {
        let params = {
            page: currentPage,
            size: 5,
            search: search
        }
        return this.get<IPageElements<IStudy>>(`study/my`, {params})
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

    static async googleLoginSuccess (token: string){
        let body = {
            token: token
        }
        return this.post<IAuthResponse>(`auth/login/google`, body)
    };
    static async vkLoginSuccess (code: string){
        let params = {
            code
        }
        return this.post<IAuthResponse>(`auth/login/vk`, null,{params})
    };

    static async emailConfirmation (token: string) {
        let params = {
            token
        }
        return this.get(`auth/registration-confirm`, {params})
    }

    static async findConsonance(regexp: string, onlyInit: boolean) {
        let params = {
            regexp,
            onlyInit
        }
        return this.get<Array<string>>(`rus-word/regexp`, {params})
    }
    static async updateNickname(nickname: string){
        let params = {
            nickname
        }
        return this.put<IAuthResponse>(`user/nickname`, null,{params})
    }
    static async getStatistic (){
        return this.get<IStatistic>(`user/statistics`)
    }
    static async getPractice () {
        return this.get<IPractice>(`practice`)
    }
    static async practiceGuessed (exampleId: number, guessed: boolean) {
        let params = {
            exampleId,
            guessed
        }
        return this.put(`practice/guessed`, null,{params})
    }

    static async tookHint (exampleId: number) {
        let params = {
            exampleId
        }
        return this.put(`practice/use-hint`, null, {params})
    }
    static async await () {
        return this.get<Array<IAwait>>(`practice/awaiting`)
    }
    static async exampleHomePage (excludeIds: Array<number>) {
        let params = {
            excludeIds: excludeIds.toString(),
            likes: 2,
            size: 4
        }
        return this.get<IExampleHomePage>(`example/home-page`, {params})
    }
}


