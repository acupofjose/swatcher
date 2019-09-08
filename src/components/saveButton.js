import React from "react";
import Tooltip from "rc-tooltip";
import Swal from "sweetalert2/src/sweetalert2.js";
import withReactContent from "sweetalert2-react-content";

import { DefaultPageContext } from "../context/defaultPage";
import { SavePalette } from "../firebase";

const ReactSwal = withReactContent(Swal);

class SaveButton extends React.Component {
  handleOnClick = async () => {
    try {
      const colors = [];
      for (const block of Object.values(this.context.blockRefs)) {
        colors.push(block.state.color);
      }

      const key = await SavePalette(
        this.context.name || "Untitled Swatch",
        colors
      );

      if (!key) {
        throw new Error("Unable to save.");
      }

      const url = `https://swatcher.app/p/${key}`;
      ReactSwal.fire({
        title: "Success",
        type: "success",
        html: (
          <div>
            <p>
              Your Palette can be found at:{" "}
              <pre>
                <a href={url}>{url}</a>
              </pre>
            </p>
          </div>
        )
      }).then(() => {
        this.context.setIsDirty(false);
        window.location.href = url;
      });
    } catch (e) {
      ReactSwal.fire({
        title: "Error",
        type: "error",
        html: (
          <div>
            <p>
              Whoops! Looks like we weren't able to save that one. You can still
              download it though! Use the buttons at the top and we'll get right
              fixing this issue.
            </p>
          </div>
        )
      });
    }
  };

  render() {
    return (
      <Tooltip
        placement="bottom"
        trigger={["hover"]}
        overlay={<span>Save Palette</span>}>
        <button className="btn btn-save" onClick={this.handleOnClick}>
          <i className="fad fa-save" />
        </button>
      </Tooltip>
    );
  }
}

SaveButton.contextType = DefaultPageContext;
export default SaveButton;
