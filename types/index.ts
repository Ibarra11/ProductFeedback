import { ButtonHTMLAttributes } from "react";

export type ButtonBase<T extends { [key: string]: any }> =
  ButtonHTMLAttributes<HTMLButtonElement> & T;

export type FilterList =
  | "All"
  | "Feature"
  | "UX"
  | "UI"
  | "Enhancement"
  | "Bug";
