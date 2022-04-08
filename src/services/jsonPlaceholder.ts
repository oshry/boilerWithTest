import axios from "axios";
import { AxiosResponse } from 'axios'

export const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (): Promise<AxiosResponse> => {
    try {
        return await axios.get(`${BASE_URL}/posts`) as AxiosResponse;
    } catch (e) {
        const err = e as AxiosResponse
        return err
    }
};
