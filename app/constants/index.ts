import {
  FeedbackCategories,
  FilterCategories,
  RoadmapOption,
  FeedbackStatus,
  RoadmapBorderColor,
  RoadmapCircleBg,
} from "@/types";
import { Post } from "@prisma/client";

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
  { status: "planned", count: 1, color: "bg-brand-tangerine" },
  { status: "in-progress", count: 2, color: "bg-brand-purple" },
  { status: "live", count: 3, color: "bg-brand-maya_blue" },
];

export const typeToColor: Record<FeedbackStatus, string> = {
  planned: "tangerine",
  "in-progress": "purple",
  live: "maya_blue",
  suggestion: "",
} as const;

export const roadmapBorderColor: Record<Post["status"], RoadmapBorderColor> = {
  PLANNED: "border-t-brand-tangerine",
  IN_PROGRESS: "border-t-brand-purple",
  LIVE: "border-t-brand-maya_blue",
  SUGGESTION: "" as any,
} as const;

export const ROADMAP_CIRCLE_BG: Record<Post["status"], RoadmapCircleBg> = {
  PLANNED: "bg-brand-tangerine",
  IN_PROGRESS: "bg-brand-purple",
  LIVE: "bg-brand-maya_blue",
  SUGGESTION: "" as any,
};

export const BRAND_COLORS = {
  brand: {
    purple: "#AD1FEA",
    royal_blue: "#4661E6",
    american_blue: "#373F68",
    alice_blue: "#F2F4FE",
    ghost_white: "#F7F8FD",
    blue_gray: "#647196",
    tangerine: "#F49F85",
    maya_blue: "#62BCFA",
  },
} as const;
