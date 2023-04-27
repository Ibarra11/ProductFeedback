import {
  FilterCategories,
  FeedbackStatus,
  RoadmapBorderColor,
  RoadmapCircleBg,
  SortByTypes,
} from "@/types";
import { Category, Status } from "@prisma/client";

export const FEEDBACK_CATEGORIES: Category[] = [
  "Feature",
  "UI",
  "UX",
  "Enhancement",
  "Bug",
];

export const SORT_OPTIONS: SortByTypes[] = [
  "Date Posted",
  "Most Upvotes",
  "Least Upvotes",
  "Most Comments",
  "Least Comments",
];

export const FILTER_CATEGORIES: FilterCategories[] = [...FEEDBACK_CATEGORIES];

export const FEEDBACK_STATUS: FeedbackStatus[] = [
  "planned",
  "in-progress",
  "live",
];

export const ROADMAP_OPTIONS: Record<
  Status,
  { bg: string; bgWithOpacity: string; text: string; border: string }
> = {
  Live: {
    bg: "bg-brand-maya_blue",
    bgWithOpacity: "bg-brand-maya_blue/25",
    text: "text-brand-maya_blue",
    border: "border-brand-maya_blue",
  },
  In_Progress: {
    bg: "bg-brand-purple",
    bgWithOpacity: "bg-brand-purple/25",
    text: "text-brand-purple",
    border: "border-brand-purple",
  },
  Planned: {
    bg: "bg-brand-tangerine",
    bgWithOpacity: "bg-brand-tangerine/25",
    text: "text-brand-tangerine",
    border: "border-brand-tangerine",
  },
  Suggestion: {
    bg: "bg-green-500",
    bgWithOpacity: "bg-green-500/25",
    text: "text-green-500",
    border: "border-green-500",
  },
};

export const typeToColor: Record<FeedbackStatus, string> = {
  planned: "tangerine",
  "in-progress": "purple",
  live: "maya_blue",
  suggestion: "",
} as const;

export const roadmapBorderColor: Record<Status, RoadmapBorderColor> = {
  Planned: "border-t-brand-tangerine",
  In_Progress: "border-t-brand-purple",
  Live: "border-t-brand-maya_blue",
  Suggestion: "" as any,
} as const;

export const ROADMAP_CIRCLE_BG: Record<Status, RoadmapCircleBg> = {
  Planned: "bg-brand-tangerine",
  In_Progress: "bg-brand-purple",
  Live: "bg-brand-maya_blue",
  Suggestion: "" as any,
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

export const ROADMAP_TAB_DESCRIPTION: Record<Status, string> = {
  In_Progress: "Currently being developed",
  Planned: "Prioritized for research",
  Live: "Released features",
  Suggestion: "Proposed features",
};
