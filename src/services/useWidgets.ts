import { ref } from "vue";

interface Widget {
  id: string;
  name: string;
  visible: boolean;
}

// Centralize widget visibility state
const widgets = ref<Widget[]>([
  { id: "projectSearch", name: "Project Search", visible: true },
  { id: "projectSuggestions", name: "Project Suggestions", visible: true },
  {
    id: "onboardingActionItems",
    name: "Onboarding Action Items",
    visible: true,
  },
  { id: "openTasks", name: "Open Tasks", visible: true },
  { id: "commentsThreads", name: "Comments Threads", visible: true },
  { id: "followedProjects", name: "Followed Projects", visible: true },
]);

// Helper to get widget visibility
const isWidgetVisible = (id: string): boolean => {
  const widget = widgets.value.find((w) => w.id === id);
  return widget ? widget.visible : false;
};

export function useWidgets() {
  return {
    widgets,
    isWidgetVisible,
  };
}
