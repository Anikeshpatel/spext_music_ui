import React from "react";
import classNames from "classnames";

export default function UIBase(props) {
  const cls = classNames(
    {
      up: props.up,
      down: props.down,
      "round-full": props.circle || (props.round && props.round === "full"),
      "round-sm": props.round && props.round === "sm",
      "round-md": props.round && props.round === "md",
      "round-lg": props.round && props.round === "lg",
      "clickable": props.clickable,
    },
    "ui__base",
    props.className
  );

  return <div className={cls}>{props.children}</div>;
}
