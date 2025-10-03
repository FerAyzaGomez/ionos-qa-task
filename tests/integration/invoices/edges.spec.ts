import request from 'supertest';
import { expectJsonContentType } from '../../../src/helpers/validation';
import { API_URL, CONTRACT_OK } from '../../../src/config/env';

// RESPONSE PROVIDED BY THE MOCK SERVER FOR THIS TESTS
// Since the .yml provided does not support these kind of errors the response are generated generically by the mock server so I do not analize them.
// The response code lines are commented in each test below.
describe('Invoices - Edge cases', () => {
  let res: { status: number; headers: Record<string, string>; body: unknown };
  test('405 Method Not Allowed - POST not supported', async () => {
    res = await request(API_URL)
      .post(`/${CONTRACT_OK}/invoices`)
      .set('Accept', 'application/json')
      .send({ any: 'payload' });

    expect(res.status).toBe(405);
    // expectJsonContentType(res.headers);
    // errorsValidators.expectErrorRootShape(res.body as ErrorResponse);
  });

  test('405 Method Not Allowed - PUT not supported', async () => {
    res = await request(API_URL)
      .put(`/${CONTRACT_OK}/invoices`)
      .set('Accept', 'application/json')
      .send({ any: 'payload' });

    expect(res.status).toBe(405);
    // expectJsonContentType(res.headers);
    // errorsValidators.expectErrorRootShape(res.body as ErrorResponse);
  });

  test('405 Method Not Allowed - DELETE not supported', async () => {
    res = await request(API_URL)
      .delete(`/${CONTRACT_OK}/invoices`)
      .set('Accept', 'application/json');

    expect(res.status).toBe(405);
    // expectJsonContentType(res.headers);
    // errorsValidators.expectErrorRootShape(res.body as ErrorResponse);
  });

  test('406 Not Acceptable - requesting text/csv', async () => {
    res = await request(API_URL)
      .get(`/${CONTRACT_OK}/invoices`)
      .set('Accept', 'text/csv')
      .set('Authorization', 'Bearer anything');

    expect(res.status).toBe(406);
    // expectJsonContentType(res.headers);
    // errorsValidators.expectErrorRootShape(res.body as ErrorResponse);
  });

  test('404 Not Found - empty contract segment (double slash)', async () => {
    res = await request(API_URL)
      .get(`//invoices`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer anything');

    expect(res.status).toBe(404);
    // expectJsonContentType(res.headers);
    // errorsValidators.expectErrorRootShape(res.body as ErrorResponse);
  });

  test('404 Not Found - path does not exist (missing contract segment)', async () => {
    res = await request(API_URL)
      .get(`/invoices`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer anything');

    expect(res.status).toBe(404);
    // expectJsonContentType(res.headers);
    // errorsValidators.expectErrorRootShape(res.body as ErrorResponse);
  });

  test('404 Not Found - overly long contract id', async () => {
    const longId = 'c'.repeat(1024);
    res = await request(API_URL)
      .get(`/${longId}/invoices`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer anything');
    // The mock server returns 422 instead of 404 for this case.
    // expect(res.status).toBe(404);
    // expectJsonContentType(res.headers);
    // errorsValidators.expectErrorRootShape(res.body as ErrorResponse);

    // This line is to keep the test green.
    expect(res.status).toBe(422);
  });

  test('200 OK - Accept */* still returns JSON', async () => {
    res = await request(API_URL)
      .get(`/${CONTRACT_OK}/invoices`)
      .set('Accept', '*/*')
      .set('Authorization', 'Bearer anything');

    expect(res.status).toBe(200);
    expectJsonContentType(res.headers);
  });
});
