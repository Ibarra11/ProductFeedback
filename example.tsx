import { createElement } from "react";

export type CustomElementProps<
  CustomElement extends keyof JSX.IntrinsicElements
> = Readonly<{
  customElement: CustomElement;
}>;

export function CustomElement<
  CustomElement extends keyof JSX.IntrinsicElements
>({ customElement }: CustomElementProps<CustomElement>): JSX.Element {
  let elementProps: JSX.IntrinsicElements[CustomElement] & { id: string } = {
    id: "test-123",
  };
  return createElement(customElement, elementProps, <p>test</p>);
}

let a = CustomElement({ customElement: "a" });

const x = a.props.id;
