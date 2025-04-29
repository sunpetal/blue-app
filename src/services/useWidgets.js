import { ref } from "vue";

// Centralize widget visibility state
const widgets = ref([
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
const isWidgetVisible = (id) => {
  const widget = widgets.value.find((w) => w.id === id);
  return widget ? widget.visible : false;
};

export function useWidgets() {
  return {
    widgets,
    isWidgetVisible,
  };
}
