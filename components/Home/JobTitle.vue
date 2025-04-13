<template>
  <div>
    <div class="inline-block font-bold text-4xl md:text-6xl tracking-wide">
      <span
        v-for="(letter, index) in letters"
        :key="index"
        class="inline-block bg-clip-text animate-fade-in"
      >
        {{ letter }}
      </span>
      <span class="bg-clip-text to-gray-600"> Developer </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const typingState = useTypingState();
const phrases = ["Dedicated", "Creative", "Software", ".NET", "Over-stack"];
const currentPhraseIndex = ref(0);
const letters = ref([]);

let letterIndex = 0;
let loop;

onMounted(() => {
  const typeNext = () => {
    const currentPhrase = phrases[currentPhraseIndex.value];
    typingState.value.currentPhrase = currentPhrase;

    if (!typingState.value.isDeleting) {
      // Typing phase
      typingState.value.isTyping = true;

      if (letterIndex < currentPhrase.length) {
        const char = currentPhrase[letterIndex];
        letters.value.push(char);
        typingState.value.currentChar = char;
        letterIndex++;
        loop = setTimeout(typeNext, 120);
      } else {
        typingState.value.isTyping = false;
        // Pause before deleting
        setTimeout(() => {
          typingState.value.isDeleting = true;
          typeNext();
        }, 2500);
      }
    } else {
      // Deleting phase
      if (letterIndex > 0) {
        letters.value.pop();
        letterIndex--;
        loop = setTimeout(typeNext, 60);
      } else {
        // Switch to next phrase
        typingState.value.isDeleting = false;
        currentPhraseIndex.value =
          (currentPhraseIndex.value + 1) % phrases.length;
        loop = setTimeout(typeNext, 300);
      }
    }
  };

  typeNext();
});

onUnmounted(() => {
  clearTimeout(loop);
});
</script>

<style>
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-10%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.25s ease-out forwards;
}
</style>
