import React from "react";
import Color from "color";
import { sample, remove } from "lodash";
import ColorBlock from "./colorBlock";
import { DefaultPageContext } from "../context/defaultPage";

const colors = require("../colors.json");

class ColorBlocks extends React.Component {
  removeFromBag = (bag, item) => remove(bag, n => n.trim() === item.trim());

  generateColorBlocks = (rows = 3, cols = 10) => {
    if (!this.context.blocks.length) {
      const blocks = [];
      const refs = {};
      let bag = colors.default;
      let baseColor = null;
      let isLight = false;
      for (let i = 0; i < rows; i++) {
        baseColor = Color(sample(bag));
        isLight = baseColor.isLight();
        this.removeFromBag(bag, baseColor.hex());
        for (let j = 0; j < cols; j++) {
          const id = `ColorBlock-${i}-${j}`;
          if (isLight) baseColor = baseColor.darken(0.1);
          else baseColor = baseColor.lighten(0.1);
          blocks.push(
            <ColorBlock
              id={id}
              key={id}
              ref={r => (refs[id] = r)}
              color={baseColor.hex()}
            />
          );
        }
      }
      this.context.setBlocks(blocks, refs);
    }
    return this.context.blocks;
  };

  render() {
    return <div className="color-blocks">{this.generateColorBlocks()}</div>;
  }
}

ColorBlocks.contextType = DefaultPageContext;
export default ColorBlocks;
