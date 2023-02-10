import { FeedbackCategories, FilterCategories, RoadmapOption } from "@/types";
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

export const ROADMAP_OPTIONS: RoadmapOption[] = [
  { type: "Planned", count: 1, color: "tangerine" },
  { type: "In-Progress", count: 2, color: "purple" },
  { type: "Live", count: 3, color: "maya_blue" },
];
