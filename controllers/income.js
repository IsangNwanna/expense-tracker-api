const { createResourceController } = require('./resource-controller');

const controller = createResourceController('income', (data, partial) => {
  if (!partial || 'source' in data) if (typeof data.source !== 'string' || !data.source.trim()) return 'source must be a non-empty string.';
  if (!partial || 'amount' in data) if (typeof data.amount !== 'number' || !Number.isFinite(data.amount) || data.amount < 0) return 'amount must be a non-negative number.';
  if ('date' in data && typeof data.date !== 'string') return 'date must be a string.';
  return null;
});

module.exports = controller;
