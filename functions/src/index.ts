import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.checkUserExists = functions.https.onCall((data: any) => {
  const email = data.email;
  return admin
    .auth()
    .getUserByEmail(email)
    .then(() => {
      return { exists: true };
    })
    .catch((error: any) => {
      if (error.code === 'auth/user-not-found') {
        return { exists: false };
      }
      throw new Error(error);
    });
});
