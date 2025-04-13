import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "~/lib/firebaseConfig";

const firebaseErrorMsg = (error: any) => {
  switch (error.code) {
    case "auth/user-not-found":
      return "No user found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/email-already-in-use":
      return "Email is already in use.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/weak-password":
      return "Password is too weak.";
    default:
      return "Something went wrong.";
  }
};

export const authService = {
  async signUp(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      return { user: userCredential.user };
    } catch (error: any) {
      throw new Error(firebaseErrorMsg(error));
    }
  },

  async signIn(email: string, password: string, event: any) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await userCredential.user.getIdToken();

      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      };

      // Set HTTP-only cookie
      setCookie(event, "auth_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 5, // 5 days
      });

      setCookie(event, "auth_user", JSON.stringify(userData), {
        httpOnly: false, // Needs to be readable by client
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 5,
      });

      return userData;
    } catch (error: any) {
      throw new Error(firebaseErrorMsg(error));
    }
  },

  async forgotPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error: any) {
      throw new Error(firebaseErrorMsg(error));
    }
  },

  async signOut(event: any) {
    try {
      await firebaseSignOut(auth);
      deleteCookie(event, "auth_token");
    } catch (error: any) {
      throw new Error("Failed to sign out.");
    }
  },
};
