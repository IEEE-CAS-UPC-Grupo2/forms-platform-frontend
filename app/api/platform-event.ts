import axios from 'axios';
import environment from '../environments/environments.prod';
import { Event } from '../models/event';

const BASE_URL = environment.apiBaseUrl + '/PlatformEvent';

interface Response<T> {
    status: boolean;
    value: T;
    msg?: string;
}

export const getPlatformEvents = async (): Promise<Event[]> => {
    try {
        const response = await axios.get<Response<Event[]>>(`${BASE_URL}/List`);
        if (response.data.status) {
            return response.data.value;
        } else {
            throw new Error(response.data.msg || 'Failed to fetch platform events');
        }
    } catch (error) {
        console.error('Error fetching platform events:', error);
        throw error;
    }
};

export const getPlatformEventById = async (id: number): Promise<Event> => {
    try {
        const response = await axios.get<Response<Event>>(`${BASE_URL}/${id}`);
        if (response.data.status) {
            return response.data.value;
        } else {
            throw new Error(response.data.msg || 'Failed to fetch platform event');
        }
    } catch (error) {
        console.error(`Error fetching platform event with ID ${id}:`, error);
        throw error;
    }
};


export const savePlatformEvent = async (event: Event): Promise<Event> => {
  try {
      const response = await axios.post<Response<Event>>(`${BASE_URL}/Save`, event);
      if (response.data.status) {
          return response.data.value;
      } else {
          throw new Error(response.data.msg || 'Failed to save platform event');
      }
  } catch (error) {
      console.error('Error saving platform event:', error);
      throw error;
  }
};

export const editPlatformEvent = async (event: Event): Promise<boolean> => {
  try {
      const response = await axios.put<Response<boolean>>(`${BASE_URL}/Edit`, event);
      if (response.data.status) {
          return response.data.value;
      } else {
          throw new Error(response.data.msg || 'Failed to edit platform event');
      }
  } catch (error) {
      console.error('Error editing platform event:', error);
      throw error;
  }
};

export const deletePlatformEvent = async (id: number): Promise<boolean> => {
  try {
      const response = await axios.delete<Response<boolean>>(`${BASE_URL}/Delete/${id}`);
      if (response.data.status) {
          return response.data.value;
      } else {
          throw new Error(response.data.msg || 'Failed to delete platform event');
      }
  } catch (error) {
      console.error(`Error deleting platform event with ID ${id}:`, error);
      throw error;
  }
};