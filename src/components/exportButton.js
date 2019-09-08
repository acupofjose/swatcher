import React from "react";
import { DefaultPageContext } from "../context/defaultPage";
import { GetExportPaletteUrl } from "../api";
import Tooltip from "rc-tooltip";

class ExportButton extends React.Component {
  handleClick = async e => {
    const colors = [];
    for (const block of Object.values(this.context.blockRefs)) {
      colors.push(block.state.color);
    }

    this.context.setIsDirty(false);

    window.location.href = GetExportPaletteUrl(
      this.context.name || "Untitled Swatch",
      colors
    );
  };

  render() {
    return (
      <Tooltip
        placement="bottom"
        trigger={["hover"]}
        overlay={<span>Export palette</span>}>
        <button className="btn btn-export" onClick={this.handleClick}>
          <i className="fad fa-file-export" />
        </button>
      </Tooltip>
    );
  }
}

ExportButton.contextType = DefaultPageContext;
export default ExportButton;
