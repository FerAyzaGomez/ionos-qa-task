import request from 'supertest';
import { API_URL, TOKEN } from '../config/env';

type HttpResponse<T = unknown> = {
  status: number;
  headers: Record<string, string>;
  body: T;
};

/**
 * Client for interacting with the Invoices API.
 */
export const invoicesClient = {
  async list(contractId: string): Promise<HttpResponse> {
    const res = await request(API_URL)
      .get(`/${contractId}/invoices`)
      .set('Accept', 'application/json')
      .set('Authorization', TOKEN);

    return {
      status: res.status,
      headers: res.headers as Record<string, string>,
      body: res.body,
    };
  },
};
