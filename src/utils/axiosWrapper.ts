import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export async function axiosGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axios.get<T>(url, config);
        return response.data;
    } catch (error) {
        // log the error
        throw error;
    }
}