import * as admin from "firebase-admin";
import * as serviceAccount from "./serviceAccountKey.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://law-vely-default-rtdb.europe-west1.firebasedatabase.app",
  });
}

const db = admin.database();
export { admin, db }