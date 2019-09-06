import React from "react";
import Color from "color";
import { DefaultPageContext } from "../context/defaultPage";

class ColorBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color,
      isLight: Color(props.color).isLight(),
      isSelected: false
    };
  }

  handleClick = e => {
    this.setState({ ...this.state, isSelected: true });
    this.context.setSelectedBlock(this);
  };

  deselect = () => this.setState({ ...this.state, isSelected: false });

  render() {
    return (
      <div
        className={`color-block 
        ${this.state.isSelected ? "selected" : ""} 
        ${this.state.isLight ? "is-light" : ""}`}
        onClick={this.handleClick}
        style={{ backgroundColor: this.state.color }}
      />
    );
  }
}

ColorBlock.contextType = DefaultPageContext;
export default ColorBlock;
