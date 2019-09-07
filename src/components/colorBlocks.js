import React from "react";
import Color from "color";
import { sample, remove } from "lodash";
import ColorBlock from "./colorBlock";
import { DefaultPageContext } from "../context/defaultPage";
import { GetPalette } from "../firebase";

const colors = require("../colors.json");

class ColorBlocks extends React.Component {
  componentDidMount() {
    const { key } = this.context.params;
    if (key) this.loadPaletteFromUrl(key);
    else this.generateColorBlocks();
  }

  loadPaletteFromUrl = async key => {
    this.context.setIsLoading(true);
    const doc = await GetPalette(key);
    this.context.setName(doc.data().name);
    this.importColorBlocks(doc.data().colors);
    this.context.setIsLoading(false);
  };

  setColors = arr => {
    let counter = 0;
    for (let col = 0; col < 10; col++) {
      for (let row = 0; row < 3; row++) {
        const id = `ColorBlock-${row}-${col}`;
        if (counter + 1 > arr.length) {
          const shouldLighten = Math.random() >= 0.5;
          const amount = Math.random();
          const color = sample(arr);
          const result = shouldLighten
            ? color.lighten(amount)
            : color.darken(amount);
          this.context.blockRefs[id].setState({ color: result.hex() });
        } else {
          this.context.blockRefs[id].setState({ color: arr[counter].hex() });
        }
        counter++;
      }
    }
  };

  regenerateColors = (rows = 3, cols = 10) => {
    let bag = [...colors.default];
    let baseColor = null;
    for (let row = 0; row < rows; row++) {
      baseColor = Color(sample(bag));
      this.removeFromBag(bag, baseColor.hex());
      for (let col = 0; col < cols; col++) {
        const id = `ColorBlock-${row}-${col}`;
        const shouldLighten = Math.random() >= 0.5;
        const amount = Math.random();
        baseColor = shouldLighten
          ? baseColor.lighten(amount)
          : baseColor.darken(amount);
        this.context.blockRefs[id].setState({ color: baseColor.hex() });
      }
    }
  };

  removeFromBag = (bag, item) => remove(bag, n => n.trim() === item.trim());

  importColorBlocks = colors => {
    const blocks = [];
    const refs = {};
    for (let i = 0; i < colors.length; i++) {
      const id = `ColorBlock-${i}`;
      blocks.push(
        <ColorBlock
          id={id}
          key={id}
          ref={r => (refs[id] = r)}
          color={colors[i]}
        />
      );
    }
    this.context.setBlocks(blocks, refs);
  };

  generateColorBlocks = (rows = 3, cols = 10) => {
    if (!this.context.blocks.length) {
      const blocks = [];
      const refs = {};
      let bag = [...colors.default];
      let baseColor = null;
      let isLight = false;
      for (let row = 0; row < rows; row++) {
        baseColor = Color(sample(bag));
        isLight = baseColor.isLight();
        this.removeFromBag(bag, baseColor.hex());
        for (let col = 0; col < cols; col++) {
          const id = `ColorBlock-${row}-${col}`;
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
  };

  render() {
    return <div className="color-blocks">{this.context.blocks}</div>;
  }
}

ColorBlocks.contextType = DefaultPageContext;
export default ColorBlocks;
