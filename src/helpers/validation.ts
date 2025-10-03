import { Response } from 'supertest';
import * as errorsValidators from '../../src/validators/errors.validators';
import type { ErrorResponse } from '../../src/validators/errors.validators';

/**
 * Verifies if the header 'content-type' is 'application/json'.
 * @param {Object.<string, (string | string[] | undefined)>} headers HTTP headers Object where each key is the header name and the value can be a string, string array or undefined.
 * @throws {Error} If the 'content-type' is not 'application/json'.
 */
export function expectJsonContentType(headers: Record<string, string | string[] | undefined>) {
  const ct =
    (headers['content-type'] as string | undefined) ??
    (headers['Content-Type'] as string | undefined);

  expect(ct).toBeDefined();
  expect(ct as string).toMatch(/application\/json/i);
}

/**
 * Checks the standard error response structure and values.
 * @param {Response} res The response object.
 * @param {number} status The expected HTTP status code.
 */
export function expectStandardError(res: Response, status: number) {
  expect(res.status).toBe(status);
  expectJsonContentType(res.headers);
  errorsValidators.expectErrorRootShape(res.body as ErrorResponse);
  errorsValidators.expectedErrorResponseValues(res.body as ErrorResponse, res.status);
}
