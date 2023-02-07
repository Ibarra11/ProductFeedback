import { ButtonHTMLAttributes } from "react";

export type ButtonBase<T extends { [key: string]: any }> =
  ButtonHTMLAttributes<HTMLButtonElement> & T;

export type FeedbackCategories =
  | "All"
  | "Feature"
  | "UX"
  | "UI"
  | "Enhancement"
  | "Bug";

type RoadmapOptions = "Live" | "In-Progress" | "Planned";

export type RoadmapOption = { type: RoadmapOptions; count: number };
