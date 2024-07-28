import admin from 'firebase-admin';
import serviceAccount from './path/to/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://agora-df482.firebaseio.com'
});

export default admin;