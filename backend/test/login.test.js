import assert from 'node:assert/strict';
import { after, before, describe, test } from 'node:test';
import app from '../app.js';

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', () => {
      const address = server.address();
      baseUrl = `http://127.0.0.1:${address.port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

describe('Binco API', () => {
  test('health endpoint reports that the API is ready', async () => {
    const response = await fetch(`${baseUrl}/api/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, 'ok');
  });

  test('accepts the demo credentials', async () => {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'sakthi@gmail.com',
        password: 'Qwerty02',
      }),
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.equal(body.user.email, 'demo@Sakthi.com');
    assert.equal(body.user.password, undefined);
  });

  test('rejects incorrect credentials', async () => {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'sakthi@gmail.com',
        password: 'Qwerty02',
      }),
    });
    const body = await response.json();

    assert.equal(response.status, 401);
    assert.equal(body.success, false);
    assert.match(body.message, /invalid email or password/i);
  });

  test('rejects missing fields', async () => {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'demo@Sakthi.com' }),
    });

    assert.equal(response.status, 400);
  });
});
