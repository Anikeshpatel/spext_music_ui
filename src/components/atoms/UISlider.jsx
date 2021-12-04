import React from "react";

export default function UISlider(props) {
  const { min, max, progress, onProgressChange } = props;

  return (
    <div className="ui_slider_base">
      <progress min={min} max={max} value={progress} />

      <input
        type="range"
        min={min}
        max={max}
        value={progress}
        onChange={(e) => {
          onProgressChange?.(e.target.value);
        }}
      />

      <input
        id="blue_dot"
        type="range"
        min={min}
        max={max}
        value={progress}
        onChange={(e) => {
          onProgressChange?.(e.target.value);
        }}
      />
    </div>
  );
}
