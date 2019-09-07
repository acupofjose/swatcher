import React from "react";
import Tooltip from "rc-tooltip";
import Swal from "sweetalert2/src/sweetalert2.js";
import withReactContent from "sweetalert2-react-content";
import { DefaultPageContext } from "../context/defaultPage";
import { UploadImage } from "../api";

const ReactSwal = withReactContent(Swal);

class UploadImageButton extends React.Component {
  handleImportRequest = async file => {
    const colors = await UploadImage(file);
    this.context.setColors(colors);
    ReactSwal.close();
  };

  handleImportBtnClick = async e => {
    await ReactSwal.fire({
      title: "Upload",
      input: "file",
      preConfirm: i => {
        const file = document.querySelector("input[type=file]");
        this.handleImportRequest(file.files[0]);
        return false;
      }
    });
  };

  render() {
    return (
      <Tooltip
        placement="bottom"
        trigger={["hover"]}
        overlay={<span>Colors from uploaded image</span>}>
        <button
          className="btn btn-upload-image"
          onClick={this.handleImportBtnClick}>
          <i className="fad fa-file-image" />
        </button>
      </Tooltip>
    );
  }
}

UploadImageButton.contextType = DefaultPageContext;
export default UploadImageButton;
