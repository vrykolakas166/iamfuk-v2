<template>
  <div class="cat-container">
    <div class="cat">
      <div
        class="cat-head border-t-[4px] border-zinc-950 dark:border-zinc-50 before:border-r-[4px] before:border-zinc-950 dark:before:border-zinc-50 after:border-l-[4px] after:border-zinc-950 dark:after:border-zinc-50"
      ></div>
      <div
        class="cat-ears border-l-[3px] border-t-[4px] border-zinc-950 dark:border-zinc-50 before:border-l-[4px] before:border-zinc-950 dark:before:border-zinc-50"
      >
        <span
          class="right-ear border-r-[4px] border-zinc-950 dark:border-zinc-50 before:border-r-[4px] before:border-zinc-950 dark:before:border-zinc-50 after:border-r-[4px] after:border-zinc-950 dark:after:border-zinc-50"
        ></span>
      </div>
      <div
        ref="face"
        class="face border-2 border-zinc-950 dark:border-zinc-50 before:border-2 before:border-zinc-950 dark:before:border-zinc-50"
      >
        <span
          ref="eye"
          class="eye bg-zinc-950 dark:bg-zinc-50 before:bg-zinc-950 dark:before:bg-zinc-50"
        ></span>
        <span
          class="mouth border-[3px] border-zinc-950 dark:border-zinc-50 before:border-[3px] before:border-zinc-950 dark:before:border-zinc-50"
        ></span>
      </div>
      <div
        ref="leftPaw"
        class="left-paw border-[4px] border-zinc-950 dark:border-zinc-50 before:bg-zinc-950 dark:before:bg-zinc-50"
      >
        <span ref="paws" class="paws">
          <span ref="circles" class="circles"></span>
        </span>
      </div>
      <div
        ref="rightPaw"
        class="right-paw border-[3px] border-zinc-950 dark:bg-zinc-950 dark:border-zinc-50 before:bg-zinc-950 dark:before:bg-zinc-50"
      >
        <span ref="rpaws" class="paws">
          <span ref="rcircles" class="circles"></span>
        </span>
      </div>
    </div>
    <Button style="z-index: 10" class="rotate-[10deg]">
      <a
        href="https://www.linkedin.com/in/iamfuk/"
        target="_blank"
        class="animated-gradient-text relative dark:hover:text-amber-400 hover:text-amber-500 font-medium transition-colors duration-300"
      >
        Let's connect
      </a>
    </Button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { debounce } from "perfect-debounce";

const typingState = useTypingState();
// Refs for DOM elements
const leftPaw = ref(null);
const rightPaw = ref(null);
const paws = ref(null);
const circles = ref(null);
const rpaws = ref(null);
const rcircles = ref(null);

const face = ref(null);
const eye = ref(null);

let animationIntervalTyping = null;
let animationIntervalDeleting = null;

const MAX_RADIUS = 2; // max distance from center in px
const ANIMATION_SPEED = 80; // ms
const ANIMATION_DELETING_SPEED = 50;

const startTypingAnimation = () => {
  if (animationIntervalTyping) return;

  animationIntervalTyping = setInterval(() => {
    // Toggle classes
    leftPaw.value.classList.toggle("left-paw");
    paws.value.classList.toggle("paws");
    circles.value.classList.toggle("circles");
    leftPaw.value.classList.toggle("left-paw-typing");

    rightPaw.value.classList.toggle("right-paw");
    rpaws.value.classList.toggle("paws");
    rcircles.value.classList.toggle("circles");
    rightPaw.value.classList.toggle("right-paw-typing");

    // Stop after a few toggles (if not in continuous mode)
    if (!typingState.value.isTyping) {
      stopTypingAnimation();
    }
  }, ANIMATION_SPEED);
};

const startDeletingAnimation = () => {
  if (animationIntervalDeleting) return;

  animationIntervalDeleting = setInterval(() => {
    // Toggle classes
    leftPaw.value?.classList.toggle("left-paw");
    paws.value?.classList.toggle("paws");
    circles.value?.classList.toggle("circles");
    leftPaw.value?.classList.toggle("left-paw-typing");

    // Stop after a few toggles (if not in continuous mode)
    if (!typingState.value.isDeleting) {
      stopTypingAnimation();
    }
  }, ANIMATION_DELETING_SPEED);
};

const stopTypingAnimation = () => {
  if (animationIntervalTyping) {
    clearInterval(animationIntervalTyping);
    animationIntervalTyping = null;
  }

  // Reset to default state
  paws.value?.classList.add("paws");
  circles.value?.classList.add("circles");
  rpaws.value?.classList.add("paws");
  rcircles.value?.classList.add("circles");

  leftPaw.value?.classList.add("left-paw");
  leftPaw.value?.classList.remove("left-paw-typing");
  rightPaw.value?.classList.add("right-paw");
  rightPaw.value?.classList.remove("right-paw-typing");
};

const stopDeletingAnimation = () => {
  if (animationIntervalDeleting) {
    clearInterval(animationIntervalDeleting);
    animationIntervalDeleting = null;
  }

  // Reset to default state
  paws.value?.classList.add("paws");
  circles.value?.classList.add("circles");
  leftPaw.value?.classList.add("left-paw");
  leftPaw.value?.classList.remove("left-paw-typing");
};

// Watch for typing state changes
watch(
  () => typingState.value.isTyping,
  debounce((isTyping) => {
    if (isTyping) startTypingAnimation();
    else stopTypingAnimation();
  }, 50)
);

watch(
  () => typingState.value.isDeleting,
  debounce((isDeleting) => {
    if (isDeleting) startDeletingAnimation();
    else stopDeletingAnimation();
  }, 50)
);

const handleMouseMove = (e) => {
  const containerRect = face?.value?.getBoundingClientRect();

  if (!containerRect) return;

  const centerX = containerRect.left + containerRect.width / 2;
  const centerY = containerRect.top + containerRect.height / 2;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;

  // Normalize to max radius
  const distance = Math.sqrt(dx * dx + dy * dy);
  const clampedDistance = Math.min(distance, MAX_RADIUS);
  const angle = Math.atan2(dy, dx); // angle in radians

  // Convert polar back to x/y within radius
  const moveX = Math.cos(angle) * clampedDistance;
  const moveY = Math.sin(angle) * clampedDistance;
  eye.value.style.transform = `translate(${moveX}px, ${moveY}px)`;
};

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
});

// Clean up animation on unmount
onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  stopTypingAnimation();
  stopDeletingAnimation();
});
</script>

<style scoped>
.cat-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.cat {
  margin: 0 auto;
  position: absolute;
  top: -45px;
  left: -30px;
  scale: 0.5;
  z-index: 20;
}

.cat-head {
  width: 100px;
  height: 71px;
  background: transparent;
  position: absolute;
  top: 15px;
  left: 150px;
  /* border-top: 4px solid #000; */
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-radius: 35% 35% 10px 11px;
  transform: rotate(15deg);
  z-index: 1;
}

.cat-head:before {
  content: "";
  display: block;
  width: 30px;
  height: 55px;
  background: transparent;
  position: absolute;
  top: 29px;
  left: 110px;
  /* border-right: 4px solid #000; */
  border-radius: 0 0 50%/50px 20px;
  transform: rotate(-45deg);
}

.cat-head:after {
  content: "";
  display: block;
  width: 30px;
  height: 55px;
  background: transparent;
  position: absolute;
  top: 9px;
  right: 95px;
  /* border-left: 4px solid #000; */
  border-radius: 50%/50px 20px 0 0;
  transform: rotate(25deg);
}

/* Ears */
.cat-ears {
  width: 18px;
  height: 18px;
  /* border-left: 3px solid #000; */
  /* border-top: 4px solid #000; */
  transform: rotate(35deg);
  position: absolute;
  left: 150px;
  top: 7px;
  border-radius: 15% 0 0 10%;
  z-index: 2;
}

.cat-ears:before {
  content: "";
  height: 23px;
  /* border-left: 4px solid #000; */
  transform: rotate(35deg);
  position: absolute;
  left: 95px;
  bottom: 38px;
  border-radius: 0 0 0 20%;
}

.right-ear {
  display: block;
  background: transparent;
  width: 2px;
  height: 15px;
  /* border-right: 4px solid #000; */
  position: absolute;
  left: 106px;
  bottom: 45px;
  transform: rotate(-40deg);
  border-radius: 10% 10% 30% 10%;
}

.right-ear:before {
  content: "";
  width: 5px;
  height: 13px;
  /* border-right: 4px solid #000; */
  transform: rotate(10deg);
  position: absolute;
  left: -2px;
  top: 13px;
  border-radius: 10% 10% 30% 10%;
}

.right-ear:after {
  content: "";
  width: 5px;
  height: 10px;
  /* border-right: 4px solid #000; */
  transform: rotate(9deg);
  position: absolute;
  left: -4px;
  top: 25px;
  border-radius: 10% 10% 30% 10%;
}

/* Face */
.face {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: absolute;
  left: 150px;
  top: 45px;
}

.face:before {
  content: "";
  display: block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: absolute;
  left: 60px;
  top: 15px;
}

.eye {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  position: absolute;
  left: 1px;
  top: 1px;
  transition: translate 0.1s ease;
}

.eye:before {
  content: "";
  display: block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  /* background: #000; */
  position: absolute;
  left: 62px;
  top: 17px;
}

.mouth {
  display: block;
  width: 13px;
  height: 13px;
  position: absolute;
  left: 20px;
  top: 20px;
  transform: rotate(55deg);
  border-radius: 50%;
  border-left-color: transparent;
  border-top-color: transparent;
}

.mouth:before {
  content: "";
  display: block;
  width: 13px;
  height: 13px;
  position: absolute;
  left: 6px;
  top: -10px;
  transform: rotate(20deg);
  border-radius: 50%;
  /* border: 3px solid #000; */
  border-left-color: transparent;
  border-top-color: transparent;
}

/* Paws */
.left-paw {
  width: 25px;
  height: 30px;
  border-bottom: 0 solid transparent;
  border-right: 0 solid transparent;
  border-radius: 50% 40% 0 0;
  position: absolute;
  left: 90px;
  top: 40px;
  transform: rotate(-20deg);
  z-index: 2;
}

.left-paw:before {
  content: "";
  display: block;
  width: 3px;
  height: 15px;
  border-radius: 100% 0 0 0;
  position: absolute;
  left: 22px;
  top: 4px;
  transform: rotate(-20deg);
}

.right-paw {
  width: 25px;
  height: 30px;
  border-bottom: 0 solid transparent;
  border-right: 0 solid transparent;
  border-radius: 50% 40% 0 0;
  position: absolute;
  left: 222px;
  top: 60px;
  transform: rotate(-20deg);
  z-index: 2;
}

.right-paw:before {
  content: "";
  display: block;
  width: 3px;
  height: 15px;
  border-radius: 100% 0 0 0;
  position: absolute;
  left: 22px;
  top: 4px;
  transform: rotate(-23deg);
}

.paws {
  display: block;
  width: 8px;
  height: 10px;
  background: #f19ba5;
  border-radius: 50% 50% 30% 30%;
  position: absolute;
  top: 9px;
  left: 7px;
}

.circles {
  display: block;
  width: 5px;
  height: 4px;
  background: #f19ba5;
  border-radius: 50% 50% 30% 30%;
  position: absolute;
  top: -3px;
  left: 8px;
}

.circles:before {
  content: "";
  display: block;
  width: 4px;
  height: 4px;
  background: #f19ba5;
  border-radius: 50% 50% 30% 30%;
  position: absolute;
  top: -3px;
  left: -6px;
}

.circles:after {
  content: "";
  display: block;
  width: 4px;
  height: 4px;
  background: #f19ba5;
  border-radius: 50% 30%;
  position: absolute;
  top: 1px;
  left: -12px;
}

/* Typing animation states */
.left-paw-typing {
  width: 40px;
  height: 28px;
  background: var(--p-zinc-50);
  border: 4px solid var(--p-zinc-950);
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
  border-right: 0 solid transparent;
  border-radius: 50% 4px 50% 50%;
  position: absolute;
  left: 87px;
  top: 58px;
  transform: rotate(-43deg);
  z-index: 4;
}

.dark .left-paw-typing {
  background: var(--p-zinc-950);
  border-top: 4px solid var(--p-zinc-50);
  border-left: 4px solid var(--p-zinc-50);
  border-bottom: 0 solid transparent;
  border-right: 0 solid transparent;
}

.left-paw-typing:before {
  content: "";
  display: block;
  width: 30px;
  height: 5px;
  background: var(--p-zinc-50);
  border-radius: 50% 4px 50% 50%;
  position: absolute;
  top: 20px;
  transform: rotate(20deg);
}

.dark .left-paw-typing:before {
  background: var(--p-zinc-950);
  border-top: 0 solid transparent;
  border-left: 0 solid transparent;
  border-right: 0 solid transparent;
}

.right-paw-typing {
  width: 45px;
  height: 24px;
  background: var(--p-zinc-50);
  border-bottom: 3px solid #000;
  border-left: 3px solid #000;
  border-right: 3px solid var(--p-zinc-50);
  border-radius: 50% 4px 0 40%;
  position: absolute;
  left: 207px;
  top: 85px;
  transform: rotate(-23deg);
  z-index: 4;
}

.dark .right-paw-typing {
  background: var(--p-zinc-950);
  border-bottom: 3px solid var(--p-zinc-50);
  border-left: 3px solid var(--p-zinc-50);
  border-right: 3px solid var(--p-zinc-950);
}

.right-paw-typing:before {
  content: "";
  display: block;
  width: 20px;
  height: 5px;
  background: transparent;
  border-top: 0px solid transparent;
  border-radius: 50% 4px 50% 50%;
  position: absolute;
  top: 0px;
  left: 2px;
  transform: rotate(-20deg);
}

.dark .right-paw-typing:before {
  background: transparent;
  border-top: 0px solid var(--p-zinc-50);
}

.animated-gradient-text::before {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  transition: transform 0.3s ease;

  background: linear-gradient(90deg, var(--p-amber-200), var(--p-amber-500));
  transform: scaleX(0);
  transform-origin: right;
}

.animated-gradient-text:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

@keyframes fadeTrait {
  0%,
  100% {
    text-shadow: 0 0 0 rgba(161, 161, 170, 0); /* zinc-400 */
  }
  50% {
    text-shadow: 0 0 8px rgba(161, 161, 170, 0.4); /* subtle glow */
  }
}
</style>
