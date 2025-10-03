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
