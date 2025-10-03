import { invoicesClient } from '../../../src/clients/invoices.client';
import * as InvoicesValidator from '../../../src/validators/invoices.validators';
import type { InvoiceListResponse } from '../../../src/validators/invoices.validators';
import { expectJsonContentType } from '../../../src/helpers/validation';

import { CONTRACT_OK } from '../../../src/config/env';

describe('Invoices - 200 response - Contract testing', () => {
  let res: { status: number; headers: Record<string, string>; body: unknown };

  beforeAll(async () => {
    res = await invoicesClient.list(CONTRACT_OK);
  });

  test('Response valid 200 code and Content-Type', async () => {
    expect(res.status).toBe(200);
    expectJsonContentType(res.headers);
  });

  test('Body shape', async () => {
    InvoicesValidator.expectRootShape(res.body as InvoiceListResponse);
  });

  test('Valid metadata', async () => {
    InvoicesValidator.expectMetadata(res.body as InvoiceListResponse);
  });

  test('Invoice list array', async () => {
    InvoicesValidator.expectInvoiceToBeArray(res.body as InvoiceListResponse);
  });

  test('Individual invoice object structure', async () => {
    InvoicesValidator.expectEachInvoiceHasBasicFields(res.body as InvoiceListResponse);
  });

  test('Date format', async () => {
    InvoicesValidator.expectInvoicesYearMonthFormat(res.body as InvoiceListResponse);
  });

  test('Amount >= 0', async () => {
    InvoicesValidator.expectInvoicesPositiveAmount(res.body as InvoiceListResponse);
  });

  test('Amount currency', async () => {
    InvoicesValidator.expectInvoiceCurrency(res.body as InvoiceListResponse, 'EUR');
  });
});
