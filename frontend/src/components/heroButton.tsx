import React from "react";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

const HeroButton = (
  title:
    | string
    | number
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined
) => {
  return <button className="hero_btn">{title}</button>;
};

export default HeroButton;
