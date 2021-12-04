import React from "react";
import UIBase from "../atoms/UIBase";

export default function ImageView(props) {
  return (
    <UIBase down round="lg" className='sm'>
        <div className='image__view' style={{
              width: props.width || "auto",
              height: props.height || "auto",
            }}>
          <img
            src={props.source}
            alt={props.alt}
          />
        </div>
    </UIBase>
  );
}
