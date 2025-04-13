import { authService } from "~/server/services/auth.service";

// server/api/auth/logout.post.ts
export default defineEventHandler(async (event) => {
  await authService.signOut(event);
  return { success: true };
});
