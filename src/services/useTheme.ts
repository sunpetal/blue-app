import { onMounted, onUnmounted, ref } from "vue";

export function useTheme() {
  const theme = ref<"light" | "dark">(getSystemTheme());
  let mediaQuery: MediaQueryList;

  function getSystemTheme(): "light" | "dark" {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme() {
    const html = document.documentElement;
    // Only manage 'dark' class - Tailwind's required selector
    if (theme.value === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    html.style.colorScheme = theme.value;
  }

  function handleSystemChange(e: MediaQueryListEvent) {
    if (!localStorage.getItem("theme")) {
      theme.value = e.matches ? "dark" : "light";
      applyTheme();
    }
  }

  function toggleTheme() {
    const newTheme = theme.value === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    theme.value = newTheme;
    applyTheme();
  }

  onMounted(() => {
    // Get initial theme from localStorage or system
    const storedTheme = localStorage.getItem("theme");
    theme.value =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : getSystemTheme();

    // Set up system preference watcher
    mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemChange);
    applyTheme();
  });

  onUnmounted(() => {
    mediaQuery.removeEventListener("change", handleSystemChange);
  });

  return { theme, toggleTheme };
}
