import React from "react";
import { SketchPicker } from "react-color";

import { DefaultPageContext } from "../context/defaultPage";

import ColorBlocks from "../components/colorBlocks";
import UploadImageButton from "../components/uploadImageButton";
import UploadPaletteButton from "../components/uploadPaletteButton";
import ExportButton from "../components/exportButton";
import SaveButton from "../components/saveButton";

class DefaultPage extends React.Component {
  constructor(props) {
    super(props);
    this.selectedBlock = null;
    this.state = {
      name: "Untitled Swatch",
      blocks: [],
      blockRefs: {},
      setBlocks: this.setBlocks,
      selectedColor: "",
      selectedBlockId: null,
      setSelectedBlock: this.setSelectedBlock
    };
  }

  setBlocks = (blocks, blockRefs) =>
    this.setState({ ...this.state, blocks, blockRefs });

  setSelectedBlock = selectedBlock => {
    if (this.selectedBlock) this.selectedBlock.deselect();

    // Handle double clicking a single block (a deselect)
    if (this.selectedBlock === selectedBlock) {
      this.selectedBlock = null;
      this.setState({ ...this.state, selectedBlockId: null });
      return;
    }

    this.selectedBlock = selectedBlock;
    this.setState({
      ...this.state,
      selectedBlockId: selectedBlock.props.id,
      selectedColor: selectedBlock.getColor()
    });
  };

  handleColorPickerChange = color =>
    this.selectedBlock.setState({ ...this.selectedBlock, color: color.hex });

  handleNameChange = e =>
    this.setState({ ...this.state, name: e.target.value });

  render() {
    return (
      <DefaultPageContext.Provider value={this.state}>
        <div className="DefaultPage">
          <div className="upper">
            <div className="title-input">
              <input
                type="text"
                placeholder={this.state.name}
                onChange={this.handleNameChange}
              />
            </div>
            <div className="buttons">
              <UploadImageButton />
              <UploadPaletteButton />
              <ExportButton />
              <SaveButton />
            </div>
          </div>
          <ColorBlocks />
          <div className="lower">
            <div className="picker">
              <SketchPicker
                className={this.selectedBlock ? "enabled" : "disabled"}
                width="100%"
                color={this.state.selectedColor}
                onChangeComplete={this.handleColorPickerChange}
              />
            </div>
          </div>
        </div>
      </DefaultPageContext.Provider>
    );
  }
}

export default DefaultPage;
