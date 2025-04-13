import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event) => {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT || "{}"
  );

  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }

  const token = getCookie(event, "auth_token");
  const user = JSON.parse(getCookie(event, "auth_user") ?? "{}");

  const dataFromDecodedToken = await getAuth().verifyIdToken(token ?? "");
  return { user: user, isAuthenticated: dataFromDecodedToken.uid === user.uid };
});
