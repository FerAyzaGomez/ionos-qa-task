import { api } from '../src/http/client';

describe('Billing API mock smoke test', () => {
  it('200 with auth header', async () => {
    const res = await api.get('/123456/invoices', {
      headers: { Authorization: 'Bearer dummy' },
    });
    expect(res.status).toBe(200);
  });

  it('401 Unauthorized error', async () => {
    const res = await api.get('/123456/invoices');
    expect(res.status).toBe(401);
  });
});

// Note: This is a basic smoke test to ensure the mock server is running and responding.
