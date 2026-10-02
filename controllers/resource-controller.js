const { getFirestore } = require('../config/firebase');

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const reservedFields = new Set(['id', 'createdAt', 'updatedAt']);

function writableFields(data) {
  return Object.fromEntries(Object.entries(data).filter(([key]) => !reservedFields.has(key)));
}

function createResourceController(collectionName, validate) {
  const collection = () => getFirestore().collection(collectionName);

  return {
    list: async (_req, res) => {
      const snapshot = await collection().get();
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.json({ success: true, data: items });
    },

    create: async (req, res) => {
      if (!isObject(req.body)) return res.status(400).json({ success: false, error: { message: 'Request body must be a JSON object.' } });
      const validationError = validate(req.body, false);
      if (validationError) return res.status(400).json({ success: false, error: { message: validationError } });
      const now = new Date().toISOString();
      const ref = await collection().add({ ...writableFields(req.body), createdAt: now, updatedAt: now });
      const doc = await ref.get();
      res.status(201).json({ success: true, data: { id: doc.id, ...doc.data() } });
    },

    update: async (req, res) => {
      if (!isObject(req.body)) return res.status(400).json({ success: false, error: { message: 'Request body must be a JSON object.' } });
      if (!req.params.id || req.params.id.includes('/')) return res.status(400).json({ success: false, error: { message: 'A valid document ID is required.' } });
      const validationError = validate(req.body, true);
      if (validationError) return res.status(400).json({ success: false, error: { message: validationError } });
      const ref = collection().doc(req.params.id);
      const existing = await ref.get();
      if (!existing.exists) return res.status(404).json({ success: false, error: { message: `${collectionName} record not found.` } });
      const fields = writableFields(req.body);
      if (Object.keys(fields).length === 0) return res.status(400).json({ success: false, error: { message: 'Provide at least one field to update.' } });
      await ref.update({ ...fields, updatedAt: new Date().toISOString() });
      const updated = await ref.get();
      res.json({ success: true, data: { id: updated.id, ...updated.data() } });
    },

    remove: async (req, res) => {
      if (!req.params.id || req.params.id.includes('/')) return res.status(400).json({ success: false, error: { message: 'A valid document ID is required.' } });
      const ref = collection().doc(req.params.id);
      const existing = await ref.get();
      if (!existing.exists) return res.status(404).json({ success: false, error: { message: `${collectionName} record not found.` } });
      await ref.delete();
      res.json({ success: true, data: { id: req.params.id, deleted: true } });
    },
  };
}

module.exports = { createResourceController };
