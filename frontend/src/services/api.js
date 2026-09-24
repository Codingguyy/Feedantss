import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Points at the deployed Render backend. Swap back to a LAN IP
// (e.g. http://192.168.1.23:5000/api) for local backend development -
// "localhost" only resolves correctly for the iOS simulator, never for a
// physical device or the Vercel web build.
export const API_BASE_URL = 'https://feedants-3ry7.onrender.com/api';

const client = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });

client.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function unwrapError(err) {
  const message =
    err?.response?.data?.message || err?.message || 'Something went wrong. Please try again.';
  const code = err?.response?.data?.code || 'UNKNOWN';
  const status = err?.response?.status || 0;
  return { message, code, status };
}

export async function login(email, password) {
  try {
    const { data } = await client.post('/auth/login', { email, password });
    await AsyncStorage.setItem('auth_token', data.token);
    await AsyncStorage.setItem('auth_user', JSON.stringify(data.user));
    return data;
  } catch (err) {
    throw unwrapError(err);
  }
}

export async function logout() {
  await AsyncStorage.multiRemove(['auth_token', 'auth_user']);
}

export async function getCurrentUser() {
  const raw = await AsyncStorage.getItem('auth_user');
  return raw ? JSON.parse(raw) : null;
}

export async function fetchCompetitions() {
  try {
    const { data } = await client.get('/competitions');
    return data;
  } catch (err) {
    throw unwrapError(err);
  }
}

export async function fetchCompetition(competitionId) {
  try {
    const { data } = await client.get(`/competitions/${competitionId}`);
    return data;
  } catch (err) {
    throw unwrapError(err);
  }
}

export async function registerForCompetition(competitionId) {
  try {
    const { data } = await client.post(`/competitions/${competitionId}/register`);
    return data;
  } catch (err) {
    throw unwrapError(err);
  }
}

export async function withdrawFromCompetition(competitionId) {
  try {
    const { data } = await client.delete(`/competitions/${competitionId}/register`);
    return data;
  } catch (err) {
    throw unwrapError(err);
  }
}

export default client;
