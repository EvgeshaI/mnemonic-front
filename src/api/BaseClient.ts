import axios, {AxiosError, AxiosRequestConfig} from "axios";

export class BaseClient {
    static baseUrl = "http://api.mnemomemo.ru"
    static async get<T>(url: string, options?: AxiosRequestConfig) {
        try {
            const response = await axios.get<T>(`${this.baseUrl}/${url}`, options)
            return response.data
        }catch (error) {
            return this.mapError(error as AxiosError<T>)
        }
    }
    static async post<T> (url: string, data: any, options?: AxiosRequestConfig) {
        try {
            const response = await axios.post<T>(`${this.baseUrl}/${url}`, data, options)
            return response.data;
        } catch (error) {
            return this.mapError(error as AxiosError<T>)
        }
    }

    static async put<T> (url: string, data: any, options?: AxiosRequestConfig) {
        try {
            const response = await axios.put<T>(`${this.baseUrl}/${url}`, data, options)
            return response.data;
        } catch (error) {
            return this.mapError(error as AxiosError<T>)
        }
    }

    static async delete<T> (url: string, options?: AxiosRequestConfig) {
        try {
            const response = await axios.delete<T>(`${this.baseUrl}/${url}`, options)
            return response.data;
        }catch (error) {
            return this.mapError(error as AxiosError<T>)
        }
    }

    static mapError<T>(error: AxiosError<T>) {
        return Promise.reject({data: error.response})
    }
    static get defaultOptions(): AxiosRequestConfig {
        return {
            withCredentials: true
        };
    }
    static getOptions(options?: AxiosRequestConfig) {
        if (options) {
            options.withCredentials = true;

            return options;
        }

        return this.defaultOptions;
    }
}
