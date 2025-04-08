import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api';
const API_TIMEOUT = 5000; 

export const fetchCharacters = async (page = 1, filters = {}, name = '') => {
  try {
    const params = { page, ...filters, name };
    const response = await axios.get(`${API_URL}/character`, {
      params,
      timeout: API_TIMEOUT
    });
    return response.data;
  } catch (error) {
    console.error('API Error - fetchCharacters:', error);
    throw error;
  }
};

export const fetchCharacterById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/character/${id}`, {
      timeout: API_TIMEOUT
    });
    return response.data;
  } catch (error) {
    console.error(`API Error - fetchCharacterById(${id}):`, error);
    throw error;
  }
};