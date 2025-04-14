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
  const userCookie = getCookie(event, "auth_user");

  if (!token || !userCookie) {
    return { isAuthenticated: false, error: "Missing authentication cookies" };
  }

  // Verify token first
  const decodedToken = await getAuth().verifyIdToken(token);
  const user = JSON.parse(userCookie);

  if (decodedToken.uid !== user.uid) {
    return { isAuthenticated: false, error: "User ID mismatch" };
  }

  // Only revoke tokens if verification succeeds
  try {
    await getAuth().revokeRefreshTokens(user.uid);
    const userRecord = await getAuth().getUser(user.uid);
    const timestamp =
      new Date(userRecord.tokensValidAfterTime ?? new Date()).getTime() / 1000;
    console.log(`Tokens revoked at: ${timestamp}`);
  } catch (revokeError) {
    console.error("Error revoking tokens:", revokeError);
    // You might choose to continue even if revoke fails
  }

  return {
    user: user,
    isAuthenticated: true,
    tokenData: decodedToken,
  };
});
