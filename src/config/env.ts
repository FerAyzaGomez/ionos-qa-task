import 'dotenv/config';

export const BASE_URL = process.env.BASE_URL || 'http://localhost:4010';
export const TIMEOUT_MS = Number(process.env.TIMEOUT_MS || 15000);