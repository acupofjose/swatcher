import React from "react";
import Tooltip from "rc-tooltip";
import { DefaultPageContext } from "../context/defaultPage";

class RegenerateButton extends React.Component {
  handleRegenerateClick = () => this.context.reset();

  render() {
    return (
      <Tooltip
        placement="bottom"
        trigger={["hover"]}
        overlay={<span>Regenerate</span>}>
        <button
          className="btn btn-regenerate"
          onClick={this.handleRegenerateClick}>
          <i className="fad fa-redo" />{" "}
        </button>
      </Tooltip>
    );
  }
}

RegenerateButton.contextType = DefaultPageContext;
export default RegenerateButton;
