"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.checkUserExists = functions.https.onCall((data) => {
    const email = data.email;
    return admin
        .auth()
        .getUserByEmail(email)
        .then(() => {
        return { exists: true };
    })
        .catch((error) => {
        if (error.code === 'auth/user-not-found') {
            return { exists: false };
        }
        throw new Error(error);
    });
});
//# sourceMappingURL=index.js.map