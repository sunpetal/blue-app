import { onMounted, ref } from "vue";

export function useTheme() {
  let storedTheme = localStorage.getItem("theme");
  if (!storedTheme) {
    storedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    localStorage.setItem("theme", storedTheme);
  }
  const theme = ref(storedTheme);

  const applyTheme = () => {
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(theme.value);
    html.style.colorScheme = theme.value;
  };

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    localStorage.setItem("theme", theme.value);
    applyTheme();
  };

  onMounted(() => {
    applyTheme();
  });

  return { theme, toggleTheme };
}
