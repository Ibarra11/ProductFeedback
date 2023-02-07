import { FilterList, RoadmapOption } from "@/types";
export const FILTER_LIST: FilterList[] = [
  "All",
  "Feature",
  "UI",
  "UX",
  "Enhancement",
  "Bug",
];

export const ROADMAP_OPTIONS: RoadmapOption[] = [
  { type: "Planned", count: 1 },
  { type: "In-Progress", count: 2 },
  { type: "Live", count: 3 },
];
