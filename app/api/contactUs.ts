import axios from 'axios';
import environment from '../environments/environments.prod';
import { ContactUs, ContactUsResponse } from '../models';
import { getCookieValue } from '../utils/cookies/getCookie';

const BASE_URL = environment.apiBaseUrlWebsite + '/contact-us';
const jwtCookie = getCookieValue("jwt");

interface Response<T> {
    status: boolean;
    data: T;
    message?: string;
}

export const getContacts = async (page: number, limit: number): Promise<ContactUsResponse> => {
    try {
      const response = await axios.get<Response<ContactUsResponse>>(
        `${BASE_URL}?page=${page}&limit=${limit}`, 
        {
          headers: {
            Authorization: `Bearer ${jwtCookie}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  };
  