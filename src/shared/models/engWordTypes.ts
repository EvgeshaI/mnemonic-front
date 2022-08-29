export interface IEngWord {
    id: number,
    engWord: string,
    transcription: string,
    transcriptions: Array<ITranscription>
    translations: Array<ITranslation>
}
export interface ITransliteration {
    transliteration: string,
    accuracy: number
}

export interface ITranslation {
    id: number
    translation: string
}

export interface ITranscription {
    id: 0,
    transcription: string,
    location: string,
    audioFile: string,
    transliterations: Array<ITransliteration>
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
    added: boolean,
    myExampleExists: boolean,
    created: string,
    accuracy: number
}


export interface IExample {
    exampleId: number
    engWordId: number,
    translationId: number | null,
    translationInSentence: string,
    mnemonicId: number | null,
    mnemonicInSentence: string,
    likes: number,
    isLiked: boolean,
    isCreator: boolean,
    sentence: string,
    creator: ICreator
    parts: Array<IPart>
    created: string
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

export interface IUser {
    email: string,
    confirmed: boolean,
    nickname: string,
    role: string,
    token: string
}

export interface IAuthResponse {
    accessToken: string
}

export interface IPageElements<T> {
    elements: Array <T>,
    totalPages: number
}
export interface IStudy {
    studyId: number,
    engWord: StudyEngWord
    mnemonic: StudyMnemonic
    examples: Array<StudyExample>
    translations: Array <ITranslation>,
    transcriptions: Array<ITranscription>
}

export interface StudyEngWord {
    id: number,
    word: string
}
export interface StudyMnemonic {
    id: number,
    phrase: string,
    likes: number,
    highlight: Array<number>
    created: string
}

export interface StudyExample {
    id: number,
    likes: number,
    parts: Array<IPart>
    created: string
}

export interface NewStudyExample {
    studyId: number,
    example: IExample
}

export interface LengthAndWords {
    length: number,
    words: Array<string>
}

export interface IEngWordSuggest {
    id: number,
    engWord: string,
    translations: Array<ITranslation>
}
export interface IStatistic {
    engWordAmount: number,
    mnemonicAmount: number,
    exampleAmount: number
}

export interface IPracticeExample {
    exampleId: number,
    engWord: string,
    translationInSentence: string,
    translationInitForm: string,
    mnemonicInSentence: string,
    sentence: string,
    parts: Array<IPart>
}

export interface IPractice {
    practices: Array<IPracticeExample>
    hasExamples: boolean
}

export interface IAwait {
    sentence: string,
    waitTill: string,
    stage: string
}

export interface IExampleHomePage {
    hasMore: boolean,
    examples: Array<IExampleHome>
}
export interface IExampleHome{
    engWordId: number,
    engWord: string,
    transcription: string,
    transliteration: string,
    translationInitForm: string,
    mnemonicInitForm: string,
    highlight: Array<number>,
    sentence: string,
    parts: Array<IPart>
}


