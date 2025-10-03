export interface ErrorResponse {
  status: number;
  code: string;
  message: string;
}

/**
 * Checks the response has the correct root properties.
 * @param {errorResponse} body The body response.
 */
export function expectErrorRootShape(body: ErrorResponse) {
  expect(body).toHaveProperty('status');
  expect(body).toHaveProperty('code');
  expect(body).toHaveProperty('message');
}

/**
 * Checks a specific 'errorResponse' object property to have the correct 'code' and 'message' values.
 * @param {errorResponse} body The body response.
 */
export function expectedErrorResponseValues(body: ErrorResponse, errorCode: number) {
  let receivedCode: string;
  let receivedMessage: string;
  switch (errorCode) {
    case 401:
      receivedCode = 'UnauthorizedError';
      receivedMessage = 'Credentials failed';
      break;
    case 403:
      receivedCode = 'ForbiddenError';
      receivedMessage = 'Restricted access';
      break;
    case 404:
      receivedCode = 'NotFoundError';
      receivedMessage = 'ContractId not found for user';
      break;
    case 409:
      receivedCode = 'ConflictError';
      receivedMessage = 'Conflict';
      break;
    case 413:
      receivedCode = 'PayloadTooLargeError';
      receivedMessage = 'More than 80 profiles available. Please query subsequently';
      break;
    case 422:
      receivedCode = 'UnprocessableEntityError';
      receivedMessage = 'Period invalid';
      break;
    case 500:
      receivedCode = 'InternalServerError';
      receivedMessage = 'Unexpected error';
      break;
    default:
      throw new Error(`Unexpected status code: ${body.status}`);
  }
  expect(body.status).toBe(errorCode);
  expect(body.code).toBe(receivedCode);
  expect(body.message).toBe(receivedMessage);
}
