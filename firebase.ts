import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
import { initializeApp } from "firebase-admin/app";

dotenv.config(); // Load environment variables from .env file

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is missing.");
}

const serviceAccount = JSON.parse(serviceAccountKey);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://law-vely-default-rtdb.europe-west1.firebasedatabase.app/",
  });
}

export const db = admin.database();
export const auth = admin.auth();
export { admin };
