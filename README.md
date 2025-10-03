# IONOS Public Billing API - Automated Tests

Automated test suite against the IONOS Public Billing API using Jest + Supertest.  
Prism is used as mock server with the provided OpenAPI spec.

## Scope

This test suite covers the **Invoices** endpoint only, as per the provided task description.  
The same approach would be applied to the rest of the endpoints:

- Happy path tests validating response shape and schema.
- Negative tests for authentication/authorization.
- Edge cases (unsupported methods, content negotiation, invalid parameters).

Adding more endpoints is straightforward by following the same structure under `tests/integration`.

## Requirements

- Node.js >= 18
- npm

## How to run locally

1. Install dependencies:

   ```bash
   npm ci

   ```

2. Start Prism mock server (in a separate terminal):

   ```bash
   npm run mocks

   ```

3. Run tests
   ```bash
   npm test
   ```
