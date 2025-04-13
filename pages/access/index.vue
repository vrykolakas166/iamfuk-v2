<template>
  <div class="flex items-center justify-center min-[400px]:h-[80vh]">
    <div
      class="max-[400px]:w-full flex flex-row max-[768px]:flex-col min-[768px]:justify-center relative overflow-hidden rounded-lg min-[400px]:bg-zinc-50 min-[400px]:dark:bg-zinc-900 min-[400px]:shadow-md"
    >
      <div
        id="SignUpForm"
        :class="[
          slided ? 'toRight' : 'toLeft',
          mobileToggleVisibility ? 'max-[768px]:hidden' : '',
        ]"
      >
        <form
          @submit.prevent="signUp"
          class="min-[400px]:w-[400px] w-full flex flex-col items-center justify-center my-4"
        >
          <h1 class="font-semibold my-2">Create Account</h1>
          <div class="flex gap-4">
            <Icon
              @click="signInByProvider('discord')"
              class="provider-log"
              name="logos:microsoft-icon"
              size="30"
            />
            <Icon
              @click="signInByProvider('discord')"
              class="provider-log"
              name="devicon:google"
              size="30"
            />
            <Icon
              @click="signInByProvider('discord')"
              class="provider-log"
              name="logos:facebook"
              size="30"
            />
            <Icon
              @click="signInByProvider('discord')"
              class="provider-log"
              name="skill-icons:discord"
              size="30"
            />
          </div>
          <div class="flex items-center justify-center gap-2">
            <hr class="w-20" />
            <span>or</span>
            <hr class="w-20" />
          </div>
          <div class="flex flex-col gap-2">
            <InputText
              id="email1"
              v-model="email"
              placeholder="Email"
              :invalid="errEmail !== ''"
            />
            <span v-if="errEmail" class="text-[12px] text-red-500">{{
              errEmail
            }}</span>
            <Password
              id="password1"
              v-model="password"
              placeholder="Password"
              toggleMask
              :invalid="errPassword !== ''"
            />
            <span v-if="errPassword" class="text-[12px] text-red-500">{{
              errPassword
            }}</span>
            <Password
              id="repassword1"
              v-model="re_password"
              placeholder="Re-Password"
              toggleMask
              :feedback="false"
              :invalid="errRePassword !== ''"
            />
            <span v-if="errRePassword" class="text-[12px] text-red-500">{{
              errRePassword
            }}</span>
          </div>
          <Button
            type="submit"
            class="w-[100px] mt-2"
            :disabled="!isValidSignUp()"
          >
            <span v-if="opts.loading === false">Sign Up</span>
            <Icon v-else name="eos-icons:three-dots-loading" size="30" />
          </Button>
          <span class="min-[769px]:hidden text-xs mt-3"
            >Already had an account ?
            <a
              href="#"
              class="hover:underline text-sky-600"
              @click="toggleOverlayInMobile"
              >Sign in</a
            ></span
          >
        </form>
      </div>
      <div
        id="SignInForm"
        :class="[
          slided ? 'toRight' : 'toLeft',
          mobileToggleVisibility ? '' : 'max-[768px]:hidden',
        ]"
      >
        <form
          @submit.prevent="signIn"
          class="min-[400px]:w-[400px] w-full flex flex-col items-center justify-center my-4"
        >
          <h1 class="font-semibold my-2">Sign in</h1>
          <div class="flex gap-4">
            <Icon
              @click="signInByProvider('discord')"
              class="provider-log"
              name="logos:microsoft-icon"
              size="30"
            />
            <Icon
              @click="signInByProvider('discord')"
              class="provider-log"
              name="devicon:google"
              size="30"
            />
            <Icon
              @click="signInByProvider('discord')"
              class="provider-log"
              name="logos:facebook"
              size="30"
            />
            <Icon
              @click="signInByProvider('discord')"
              class="provider-log"
              name="skill-icons:discord"
              size="30"
            />
          </div>
          <div class="flex items-center justify-center gap-4">
            <hr class="w-20" />
            <span>or</span>
            <hr class="w-20" />
          </div>
          <div class="flex flex-col gap-2">
            <InputText
              placeholder="Email"
              v-model="email"
              :invalid="errEmail !== ''"
            />
            <span v-if="errEmail" class="text-[12px] text-red-500">{{
              errEmail
            }}</span>
            <Password
              placeholder="Password"
              v-model="password"
              :feedback="false"
              toggleMask
              :invalid="errPassword !== ''"
            />
            <span v-if="errPassword" class="text-[12px] text-red-500">{{
              errPassword
            }}</span>
            <a
              href="#"
              class="hover:underline italic text-xs my-2"
              @click="showError(ERRORS.IN_DEVELOPMENT)"
              >Forgot your password?</a
            >
          </div>
          <Button type="submit" class="w-[100px]" :disabled="!isValidSignIn()">
            <span v-if="!opts.loading">Sign In</span>
            <Icon v-else name="eos-icons:three-dots-loading" size="30" />
          </Button>
          <span class="min-[769px]:hidden text-xs mt-3"
            >Haven't had an account ?
            <a
              href="#"
              class="hover:underline text-sky-600"
              @click="toggleOverlayInMobile"
              >Sign up</a
            ></span
          >
        </form>
      </div>
      <div
        id="overlay"
        style="z-index: 3"
        class="w-[50%] h-full max-[768px]:hidden max-[768px]:h-[50%] max-[768px]:w-full absolute bg-zinc-400 dark:bg-zinc-500"
        :class="slided ? 'slide-panel ' : ''"
      >
        <div class="flex flex-col items-center justify-center h-full">
          <div
            v-if="slided"
            class="flex flex-col items-center gap-2 max-[768px]:mt-[-10vh]"
          >
            <h1>Welcome back!</h1>
            <p></p>
            <Button @click="toggleOverlay" class="w-[100px]" id="signIn">
              Sign In
            </Button>
          </div>
          <div v-else class="flex flex-col items-center gap-2">
            <h1>Welcome pal</h1>
            <p>Haven't had an account ?</p>
            <Button @click="toggleOverlay" id="signUp" class="w-[100px]">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const opts = useOptions();
const { showSuccess, showError } = useNotify();

const slided = ref(false);
const mobileToggleVisibility = ref(true);
const email = ref(null);
const password = ref(null);
const re_password = ref(null);

const errEmail = ref("");
const errPassword = ref("");
const errRePassword = ref("");

const ERRORS = useErrors();

watch(
  () => email.value,
  () => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value === "") {
      errEmail.value = ERRORS.EMAIL_EMPTY;
    } else if (!email.value.match(mailformat)) {
      errEmail.value = ERRORS.EMAIL_FORMAT;
    } else {
      errEmail.value = "";
    }
  }
);

watch(
  () => password.value,
  () => {
    if (password.value === "") {
      errPassword.value = ERRORS.PASSWORD_EMPTY;
    } else if (password.value !== re_password.value) {
      errRePassword.value = ERRORS.REPASSWORD_NOT_MATCH;
    } else {
      errPassword.value = "";
    }
  }
);

watch(
  () => re_password.value,
  () => {
    if (re_password.value === "") {
      errRePassword.value = ERRORS.REPASSWORD_EMPTY;
    } else if (password.value !== re_password.value) {
      errRePassword.value = ERRORS.REPASSWORD_NOT_MATCH;
    } else {
      errRePassword.value = "";
    }
  }
);

const toggleOverlay = () => {
  slided.value = !slided.value;
  if (email.value) {
  } else {
    errEmail.value = "";
  }
  if (password.value) {
  } else {
    errPassword.value = "";
  }
};

const toggleOverlayInMobile = () => {
  mobileToggleVisibility.value = !mobileToggleVisibility.value;
  toggleOverlay();
};

const signInByProvider = async (provider) => {
  showError(ERRORS.SERVICES_NOT_AVAILABLE);
};

const isValidSignIn = () => {
  return errEmail.value === "" && errPassword.value === "";
};

const isValidSignUp = () => {
  return (
    errEmail.value === "" &&
    errPassword.value === "" &&
    errRePassword.value === "" &&
    password.value === re_password.value
  );
};

const signUp = async () => {
  if (!email.value) {
    errEmail.value = ERRORS.EMAIL_EMPTY;
    return;
  }
  if (!password.value) {
    errPassword.value = ERRORS.PASSWORD_EMPTY;
    return;
  }
  if (!re_password.value) {
    errPassword.value = ERRORS.REPASSWORD_EMPTY;
    return;
  }
  if (re_password.value !== password.value) {
    errRePassword.value = ERRORS.REPASSWORD_NOT_MATCH;
    return;
  }

  opts.loading = true;
  try {
    const { data } = await useFetch("/api/auth/signUp", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    if (data.value?.success) {
      showSuccess("Sign up successfully.");
      await navigateTo("/");
    } else {
      showError("User already exists.");
    }
  } catch (err) {
    showError(err.message);
  } finally {
    opts.loading = false;
  }
};

const signIn = async () => {
  if (!email.value) {
    errEmail.value = ERRORS.EMAIL_EMPTY;
    return;
  }
  if (!password.value) {
    errPassword.value = ERRORS.PASSWORD_EMPTY;
    return;
  }

  opts.loading = true;
  try {
    const { data } = await useFetch("/api/auth/signIn", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });
    if (data.value?.success) {
      showSuccess("Sign in successfully.");
      await navigateTo("/");
    } else {
      showError("Sign in failed.");
      console.log("User not found.");
    }
  } catch (err) {
    showError(err.message);
  } finally {
    opts.loading = false;
  }
};
</script>

<style scoped>
.provider-log {
  transition: all 0.2s ease-in-out;
}

.provider-log:hover {
  scale: 0.9;
  cursor: pointer;
}

#overlay {
  transform: translateX(-50%);
  transition: all 0.6s ease-in-out;
}

#overlay.slide-panel {
  transform: translateX(50%);
  transition: all 0.6s ease-in-out;
}

#SignUpForm {
  transform: translateX(100%);
  z-index: 1;
}

#SignInForm {
  z-index: 2;
}

#SignUpForm.toRight {
  animation: show 1s ease-in forwards;
}

#SignInForm.toRight {
  animation: hidR 1s ease-in forwards;
}

#SignUpForm.toLeft {
  animation: hidL 1s ease-in forwards;
}

#SignInForm.toLeft {
  animation: show 1s ease-in forwards;
}

@keyframes show {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  50% {
    transform: translateX(0);
    z-index: 3;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes hidR {
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  50%,
  100% {
    transform: translateX(-100%);
    z-index: -1;
    opacity: 0;
  }
}

@keyframes hidL {
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  50%,
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  #overlay {
    transform: translateX(0%);
  }

  #overlay.slide-panel {
    height: 60%;
    transform: translateY(90%);
  }
}
</style>
