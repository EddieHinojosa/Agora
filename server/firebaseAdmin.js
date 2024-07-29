import admin from 'firebase-admin';
import serviceAccount from './path/to/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
export { firestore };