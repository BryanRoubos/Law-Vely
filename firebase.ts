import * as admin from "firebase-admin";
const serviceAccount = require("./serviceAccountKey.json");


if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: "https://law-vely-default-rtdb.europe-west1.firebasedatabase.app/", // Replace with your actual database URL
    });
  }

const db = admin.database();
export { admin, db };