import React from "react";
import classNames from "classnames";
import UIBase from "../atoms/UIBase";

export default function Button(props) {
  const cls = classNames(
    {
      primary: props.primary || (!props.outlined && !props.flat),
      outline: props.outlined,
      rounded: props.rounded,
      flat: props.flat,
    },
    "btn"
  );

  const BUTTON = (
    <button className={cls} onClick={props.onClick}>
      {props.icon && <span className="btn_icon"> {props.icon} </span>}
      {props.children && <div className="btn_content"> {props.children} </div>}
    </button>
  );

  return props.flat ? (
    BUTTON
  ) : (
    <UIBase
      round="sm"
      circle={props.rounded}
      down={props.pressed}
      clickable
      className="pointer-cursor"
    >
      {" "}
      {BUTTON}{" "}
    </UIBase>
  );
}
