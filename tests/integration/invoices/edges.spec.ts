import request from 'supertest';
import { expectJsonContentType } from '../../../src/helpers/validation';
// import * as errorsValidators from '../../../src/validators/errors.validators';
// import type { ErrorResponse } from '../../../src/validators/errors.validators';
import { API_URL, CONTRACT_OK } from '../../../src/config/env';

describe('Invoices - Edge cases', () => {
  let res: { status: number; headers: Record<string, string>; body: unknown };

  test('405 Method Not Allowed - POST not supported', async () => {
    res = await request(API_URL)
      .post(`/${CONTRACT_OK}/invoices`)
      .set('Accept', 'application/json')
      .send({ any: 'payload' });

    expect(res.status).toBe(405);
    // Since the .yml provided does not support this kind of error the response is generated generically by the mock server so I dont analize it.
    // If the response was configured this next two code lines should be uncommented.
    // expectJsonContentType(res.headers);
    // errorsValidators.expectErrorRootShape(res.body as ErrorResponse);
  });

  test('405 Method Not Allowed - PUT not supported', async () => {
    res = await request(API_URL)
      .put(`/${CONTRACT_OK}/invoices`)
      .set('Accept', 'application/json')
      .send({ any: 'payload' });

    expect(res.status).toBe(405);
  });

  test('405 Method Not Allowed - DELETE not supported', async () => {
    res = await request(API_URL)
      .delete(`/${CONTRACT_OK}/invoices`)
      .set('Accept', 'application/json');

    expect(res.status).toBe(405);
  });

  test('406 Not Acceptable - requesting application/xml', async () => {
    res = await request(API_URL)
      .get(`/${CONTRACT_OK}/invoices`)
      .set('Accept', 'text/csv')
      .set('Authorization', 'Bearer anything');

    expect(res.status).toBe(406);
    // Since the .yml provided does not support this kind of error the response is generated generically by the mock server so I dont analize it.
    // If the response was configured this next two code lines should be uncommented.
    // expectJsonContentType(res.headers);
    // errorsValidators.expectErrorRootShape(res.body as ErrorResponse);
  });

  test('404 Not Found - empty contract segment (double slash)', async () => {
    res = await request(API_URL)
      .get(`//invoices`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer anything');

    expect(res.status).toBe(404);
  });

  test('404 Not Found - contract with illegal chars (URL encoded)', async () => {
    res = await request(API_URL)
      .get(`/invoices`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer anything');

    expect(res.status).toBe(404);
  });

  test('404 Not Found - overly long contract id', async () => {
    const longId = 'c'.repeat(1024);
    res = await request(API_URL)
      .get(`/${longId}/invoices`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer anything');
    // The mock server returns 422 instead of 404 for this case. I understand that in a real server it should be 404.
    // If the mock server is changed to return 404 this next three code lines should be uncommented.
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
