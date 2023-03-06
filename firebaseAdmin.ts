import { getApps } from "firebase-admin/app";
import admin from "firebase-admin";

const sericeAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(sericeAccount),
  })
}

const adminDb = admin.firestore()

export {adminDb};  