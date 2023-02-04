import { ButtonHTMLAttributes } from "react";

export type ButtonBase<T extends { [key: string]: any }> =
  ButtonHTMLAttributes<HTMLButtonElement> & T;

// export interface ButtonProps<T> extends ButtonHTMLAttributes<HTMLButtonElement> {
//   withBg: boolean;
// }
