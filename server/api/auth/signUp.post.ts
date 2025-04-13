import { authService } from "~/server/services/auth.service";

// server/api/auth/register.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const user = await authService.signUp(body.email, body.password);

    return {
      success: true,
      user: user,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }
});
