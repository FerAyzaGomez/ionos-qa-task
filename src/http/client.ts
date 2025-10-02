import axios from 'axios';
import { BASE_URL, TIMEOUT_MS } from '../config/env'

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT_MS,
    validateStatus: () => true
});