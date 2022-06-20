export interface IEngWord {
    id: number,
    engWord: string,
    transcription: string
    translations: Array<ITranslation>
}

export interface IPageMnemonic {
    mnemonics: Array<IMnemonic>,
    totalPages: number
}

export interface ITranslation {
    id: number
    translation: string
}

export interface IMnemonic {
    mnemonicId: number
    phrase: string
    highlight: Array<number>
    highlightWord: string
    likes: number,
    isLiked: boolean
    creator: ICreator,
    exampleExists: boolean,
    isCreator: boolean,
    added: boolean
}

export interface IPageExample {
    examples: Array<IExample>
    totalPages: number
}

export interface IExample {
    exampleId: number
    engWordId: number,
    translationId: number | null,
    translationInSentence: string,
    mnemonicId: number | null,
    mnemonicInSentence: string,
    likes: number,
    liked: boolean,
    sentence: string,
    creator: ICreator
    parts: Array<IPart>
}
export interface IPart {
    part: string,
    type: PartType
}

export enum PartTypes {
    PLAIN="PLAIN",
    TRANSLATION = "TRANSLATION",
    MNEMONIC = "MNEMONIC"
}
export type PartType = PartTypes.PLAIN | PartTypes.MNEMONIC | PartTypes.TRANSLATION


export interface ICreator {
    creatorId: number
    nickname: string
}

export interface IMnemonicCreate {
    engWordId: number,
    phrase: string,
    highlight: Array<number>
}

