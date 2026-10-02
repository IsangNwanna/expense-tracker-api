const { createResourceController } = require('./resource-controller');

const controller = createResourceController('users', (data, partial) => {
  if (!partial || 'name' in data) if (typeof data.name !== 'string' || !data.name.trim()) return 'name must be a non-empty string.';
  if (!partial || 'email' in data) if (typeof data.email !== 'string' || !data.email.trim()) return 'email must be a non-empty string.';
  return null;
});

module.exports = controller;
