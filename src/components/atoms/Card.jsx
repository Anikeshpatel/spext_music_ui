import classNames from "classnames";
import React from "react";

export default function Card(props) {
  const cls = classNames(
    {
      "round-full": props.circle || (props.round && props.round === "full"),
      "round-sm": props.round && props.round === "sm",
      "round-md": props.round && props.round === "md",
      "round-lg": props.round && props.round === "lg",
    },
    "card",
    props.className
  );

  return <div className={cls}>{props.children}</div>;
}
