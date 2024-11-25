import axios from 'axios';
import environment from '../environments/environments.prod';
import { Section, UpdateSectionOrder } from '../models';
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
            throw new Error(response.data.message || 'Failed to fetch sections');
        }
    } catch (error) {
        console.error('Error fetching sections', error);
        throw error;
    }
};

export const updateOrderSections = async (data: UpdateSectionOrder): Promise<Section[]> => {
    try {
        const response = await axios.patch<Response<Section[]>>(`${BASE_URL}/update-orders`, data, {
          headers: {
            Authorization: `Bearer ${jwtCookie}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.status) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Failed to update orders');
        }
    } catch (error) {
        console.error('Error update orders', error);
        throw error;
    }
};