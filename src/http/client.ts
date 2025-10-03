import axios from 'axios';
import { API_URL, TIMEOUT_MS } from '../config/env';

export const api = axios.create({
  baseURL: API_URL,
  timeout: TIMEOUT_MS,
  validateStatus: () => true,
});
