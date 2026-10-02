const admin = require('firebase-admin');
const path = require('path');

let firestore;

function initializeFirebase() {
  if (firestore) return firestore;

  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (!serviceAccountPath) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_PATH is required. See .env.example.');
  }

  const resolvedPath = path.resolve(serviceAccountPath);
  // The credential file remains local and is excluded from version control.
  const serviceAccount = require(resolvedPath);
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  firestore = admin.firestore();
  return firestore;
}

function getFirestore() {
  if (!firestore) throw new Error('Firebase has not been initialized.');
  return firestore;
}

module.exports = { initializeFirebase, getFirestore };
