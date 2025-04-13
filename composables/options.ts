export const useOptions = () => {
  return useState("options", () => ({
    currentPage: "home",
    loading: false,
  }));
};
