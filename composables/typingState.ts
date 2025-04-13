export const useTypingState = () => {
  return useState("typing", () => ({
    isTyping: false, // True when letters are being typed
    isDeleting: false, // True when letters are being deleted
    currentChar: "", // Current character being typed (optional)
    currentPhrase: "", // Current phrase (e.g., "Creative")
  }));
};
