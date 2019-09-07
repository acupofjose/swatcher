import React from "react";
import { SketchPicker } from "react-color";

import { DefaultPageContext } from "../context/defaultPage";

import ColorBlocks from "../components/colorBlocks";
import RegenerateButton from "../components/regenerateButton";
import UploadImageButton from "../components/uploadImageButton";
import ExportButton from "../components/exportButton";
import SaveButton from "../components/saveButton";
import { GlobalContext } from "../context/global";

const defaultSwatchName = "Untitled Swatch";

class DefaultPage extends React.Component {
  constructor(props) {
    super(props);

    this.blockContainerRef = null;
    this.selectedBlock = null;
    this.defaultState = {
      params: props.match.params,
      name: null,
      setName: this.setName,
      blocks: [],
      blockRefs: {},
      setBlocks: this.setBlocks,
      selectedColor: "",
      selectedBlockId: null,
      setSelectedBlock: this.setSelectedBlock,
      setIsLoading: isLoading => this.context.setIsLoading(isLoading),
      readOnly: false,
      setReadOnly: this.setReadOnly,
      reset: this.reset,
      setColors: this.setColors
    };

    this.state = { ...this.defaultState };
  }

  reset = () => {
    this.setState({ name: null, selectedBlockId: null });
    if (this.blockContainerRef) this.blockContainerRef.regenerateColors();
  };

  setColors = arr => this.blockContainerRef.setColors(arr);

  setName = name => this.setState({ ...this.state, name });

  setReadOnly = readOnly => this.setState({ ...this.state, readOnly });

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

  handleNameFocus = e => {
    if (e.target.value === defaultSwatchName) {
      this.setState({ ...this.state, name: "" });
    }
  };

  handleNameOnBlur = e => {
    if (e.target.value === "") {
      this.setState({ ...this.state, name: null });
    }
  };

  render() {
    return (
      <DefaultPageContext.Provider value={this.state}>
        <div className="DefaultPage">
          <div className="upper">
            <div className="title-input">
              <input
                type="text"
                value={
                  this.state.name !== null ? this.state.name : defaultSwatchName
                }
                onFocus={this.handleNameFocus}
                onBlur={this.handleNameOnBlur}
                onChange={this.handleNameChange}
              />
            </div>
            <div className="buttons">
              <RegenerateButton />
              <UploadImageButton />
              <ExportButton />
              <SaveButton />
            </div>
          </div>
          <ColorBlocks ref={r => (this.blockContainerRef = r)} />
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

DefaultPage.contextType = GlobalContext;
export default DefaultPage;
