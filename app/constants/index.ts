import {
  FeedbackCategories,
  FilterCategories,
  RoadmapOption,
  FeedbackStatus,
} from "@/types";
export const FEEDBACK_CATEGORIES: FeedbackCategories[] = [
  "Feature",
  "UI",
  "UX",
  "Enhancement",
  "Bug",
];

export const FILTER_CATEGORIES: FilterCategories[] = [
  "All",
  ...FEEDBACK_CATEGORIES,
];

export const FEEDBACK_STATUS: FeedbackStatus[] = [
  "planned",
  "in-progress",
  "live",
];

export const ROADMAP_OPTIONS: RoadmapOption[] = [
  { type: "planned", count: 1, color: "tangerine" },
  { type: "in-progress", count: 2, color: "purple" },
  { type: "live", count: 3, color: "maya_blue" },
];

export const typeToColor: Record<FeedbackStatus, string> = {
  planned: "tangerine",
  "in-progress": "purple",
  live: "maya_blue",
  suggestion: "",
} as const;
