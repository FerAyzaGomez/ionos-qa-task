import request from 'supertest';
import type { Response } from 'supertest';
import { expectStandardError } from '../../../src/helpers/validation';
import { API_URL, CONTRACT_OK } from '../../../src/config/env';

describe('Invoices - Error responses', () => {
  let res: Response;

  test('401 Unauthorized - missing auth header', async () => {
    res = await request(API_URL).get(`/${CONTRACT_OK}/invoices`).set('Accept', 'application/json');
    expectStandardError(res, 401);
  });

  test('403 Forbidden - invalid token', async () => {
    res = await request(API_URL)
      .get(`/${CONTRACT_OK}/invoices`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer invalid_token')
      .set('Prefer', 'code=403');
    expectStandardError(res, 403);
  });

  test('404 Not Found - invalid contract', async () => {
    res = await request(API_URL)
      .get(`/${CONTRACT_OK}/invoices`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer dummy-token')
      .set('Prefer', 'code=404');
    expectStandardError(res, 404);
  });

  test('500 Internal Server Error - simulated', async () => {
    res = await request(API_URL)
      .get(`/${CONTRACT_OK}/invoices`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer dummy-token')
      .set('Prefer', 'code=500');
    expectStandardError(res, 500);
  });
});
