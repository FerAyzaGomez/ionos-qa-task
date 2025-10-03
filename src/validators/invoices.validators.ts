export interface InvoiceListResponse {
  metadata: {
    contractId: number;
    customerId: number;
    reference: string;
  };
  invoices: Invoice[];
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  unit: string;
}

/**
 * Checks the response has the correct root properties.
 * @param {InvoiceListResponse} body The body response.
 */
export function expectRootShape(body: InvoiceListResponse) {
  expect(body).toHaveProperty('metadata');
  expect(body).toHaveProperty('invoices');
}

/**
 * Checks the each metadata object property to have the correct type and valid values.
 * @param {InvoiceListResponse} body The body response.
 */
export function expectMetadata(body: InvoiceListResponse) {
  const md = body.metadata;
  expect(typeof md.contractId).toBe('number');
  // This validation has been set asuming the swagger reference for 'contract' parameter.
  expect(md.contractId.toString.length >= 5 && md.contractId.toString.length <= 10);
  expect(typeof md.customerId).toBe('number');
  // Since there is no information on the proper format for this value it validates to be greater than 0
  expect(md.customerId).toBeGreaterThan(0);
  expect(typeof md.reference).toBe('string');
  // Since there is no information on the proper format for this value it validates to be greater than 0
  expect(md.reference.length).toBeGreaterThan(0);
}

/**
 * Chekcs the 'invoices' property is an Array.
 * @param {InvoiceListResponse} body The body response.
 */
export function expectInvoiceToBeArray(body: InvoiceListResponse) {
  expect(Array.isArray(body.invoices)).toBe(true);
}

/**
 * Chekcs the correct properties content for each 'invoice'.
 * @param {InvoiceListResponse} body The body response.
 */
export function expectEachInvoiceHasBasicFields(body: InvoiceListResponse) {
  for (let i = 0; i < body.invoices.length; i += 1) {
    expect(typeof body.invoices[i].id).toBe('string');
    // Since there is no information on the proper format for this value it validates to be greater than 0
    expect(body.invoices[i].id.length).toBeGreaterThan(0);
    expect(typeof body.invoices[i].date).toBe('string');
    expect(typeof body.invoices[i].amount).toBe('number');
    expect(typeof body.invoices[i].unit).toBe('string');
  }
}

/**
 * Checks the date format for each 'invoices.date'.
 * @param {InvoiceListResponse} body The body response.
 */
export function expectInvoicesYearMonthFormat(body: InvoiceListResponse) {
  const regex = /^\d{4}-(0[1-9]|1[0-2])$/;
  for (let i = 0; i < body.invoices.length; i += 1) {
    expect(regex.test(body.invoices[i].date));
  }
}

/**
 * Checks that the 'invoices.amount' is grater than 0 for each 'invoice'.
 * @param {InvoiceListResponse} body The body response.
 */
export function expectInvoicesPositiveAmount(body: InvoiceListResponse) {
  for (let i = 0; i < body.invoices.length; i += 1) {
    expect(typeof body.invoices[i].amount).toBe('number');
    // Since there is no information if this value could be 0 or if the dot must be used for exact values (i.e. 10.00)  it valicates to be greater than 0
    expect(body.invoices[i].amount).toBeGreaterThan(0);
  }
}

/**
 * Checks the 'invoice.unit' currency for each 'invoice'
 * @param {InvoiceListResponse} body The body response.
 * @param {number} currency The currency to be checked.
 */
export function expectInvoiceCurrency(body: InvoiceListResponse, currency: string) {
  for (let i = 0; i < body.invoices.length; i += 1) {
    expect(typeof body.invoices[i].unit).toBe('string');
    // Here I'm checking for all the array the same currency since there is no info if this value coulb be different for each 'invoice'
    expect(body.invoices[i].unit).toContain(currency);
  }
}
