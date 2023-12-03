import React from "react";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

const MainButton = (
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
  return <button className="main_btn">{title}</button>;
};

export default MainButton;
