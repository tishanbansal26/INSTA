const test = require('node:test');
const assert = require('node:assert/strict');

const { hashPassword, comparePassword } = require('../dist/shared/utils/password');
const { signAccessToken, signRefreshToken, verifyToken } = require('../dist/shared/utils/jwt');

test('hashPassword and comparePassword work together', async () => {
  const plainPassword = 'StrongPass123!';
  const hash = await hashPassword(plainPassword);

  assert.ok(hash.startsWith('$2'));
  assert.equal(await comparePassword(plainPassword, hash), true);
  assert.equal(await comparePassword('wrong-password', hash), false);
});

test('sign and verify tokens using the same secret', () => {
  const accessToken = signAccessToken({ id: 'user-1', role: 'ADMIN' });
  const refreshToken = signRefreshToken({ id: 'user-1', role: 'ADMIN' });

  const accessPayload = verifyToken(accessToken);
  const refreshPayload = verifyToken(refreshToken);

  assert.equal(accessPayload.id, 'user-1');
  assert.equal(accessPayload.role, 'ADMIN');
  assert.equal(refreshPayload.id, 'user-1');
  assert.equal(refreshPayload.role, 'ADMIN');
});
