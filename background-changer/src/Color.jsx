import React from "react";

export default function ColorApply(props) {
  let colorname = props.name;
  let style = {
    backgroundColor: colorname,
    color:
      colorname === "yellow" ||
      colorname === "lavender" ||
      colorname === "white"
        ? "black"
        : "white",
  };
  function change_bg(Bgcolor) {
    document.body.style.backgroundColor = Bgcolor;
  }
  return (
    <button style={style} onClick={() => change_bg(colorname)}>
      {colorname}
    </button>
  );
}
