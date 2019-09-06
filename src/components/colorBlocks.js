import React from "react";
import Color from "color";
import { sample, remove } from "lodash";
import ColorBlock from "./colorBlock";

const colors = require("../colors.json");

class ColorBlocks extends React.Component {
  constructor(props) {
    super(props);
    this.blocks = [];
  }

  removeFromBag = (bag, item) => remove(bag, n => n.trim() === item.trim());

  generateColorBlocks = (rows = 3, cols = 10) => {
    if (!this.blocks.length) {
      let bag = colors.default;
      let baseColor = null;
      let isLight = false;
      for (let i = 0; i < rows; i++) {
        baseColor = Color(sample(bag));
        isLight = baseColor.isLight();
        this.removeFromBag(bag, baseColor.hex());
        for (let j = 0; j < cols; j++) {
          if (isLight) baseColor = baseColor.darken(0.1);
          else baseColor = baseColor.lighten(0.1);
          this.blocks.push(
            <ColorBlock
              id={`ColorBlock-${i}-${j}`}
              key={`block-${i}-${j}`}
              color={baseColor.hex()}
            />
          );
        }
      }
    }
    return this.blocks;
  };

  render() {
    return <div className="color-blocks">{this.generateColorBlocks()}</div>;
  }
}

export default ColorBlocks;
