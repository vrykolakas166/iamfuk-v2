import { useToast } from "primevue/usetoast";

export const useNotify = () => {
  const toast = useToast();

  const showSuccess = (message: string, summary: string = "Success") => {
    toast.add({
      severity: "success",
      summary,
      detail: message,
      life: 3000,
    });
  };

  const showError = (message: string, summary: string = "Error") => {
    toast.add({
      severity: "error",
      summary,
      detail: message,
      life: 5000,
    });
  };

  const showInfo = (message: string, summary: string = "Info") => {
    toast.add({
      severity: "info",
      summary,
      detail: message,
      life: 3000,
    });
  };

  const showWarn = (message: string, summary: string = "Warning") => {
    toast.add({
      severity: "warn",
      summary,
      detail: message,
      life: 4000,
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarn,
  };
};
