import { FeedbackCategories, RoadmapOption } from "@/types";
export const FILTER_LIST: FeedbackCategories[] = [
  "All",
  "Feature",
  "UI",
  "UX",
  "Enhancement",
  "Bug",
];

export const ROADMAP_OPTIONS: RoadmapOption[] = [
  { type: "Planned", count: 1, color: "tangerine" },
  { type: "In-Progress", count: 2, color: "purple" },
  { type: "Live", count: 3, color: "maya_blue" },
];
