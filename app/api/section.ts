import axios from 'axios';
import environment from '../environments/environments.prod';
import { Section } from '../models';
import { getCookieValue } from '../utils/cookies/getCookie';

const BASE_URL = environment.apiBaseUrlWebsite + '/sections';
const jwtCookie = getCookieValue("jwt");

interface Response<T> {
    status: boolean;
    data: T;
    message?: string;
}

export const getSections = async (): Promise<Section[]> => {
    try {
        const response = await axios.get<Response<Section[]>>(`${BASE_URL}`, {
          headers: {
            Authorization: `Bearer ${jwtCookie}`,
            "Content-Type": "application/json",
          }
        });
        if (response.data.status) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Failed to fetch platform events');
        }
    } catch (error) {
        console.error('Error fetching platform events:', error);
        throw error;
    }
};