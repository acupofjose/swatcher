import React from "react";
import Axios from "axios";
import Tooltip from "rc-tooltip";
import Swal from "sweetalert2/src/sweetalert2.js";
import withReactContent from "sweetalert2-react-content";
import { UploadImage } from "../api";

const ReactSwal = withReactContent(Swal);

const UploadPaletteButton = function() {
  const handleImportRequest = async fileInput => {
    await UploadImage(fileInput.files[0]);
  };

  const handleImportBtnClick = async e => {
    await ReactSwal.fire({
      title: "Upload",
      input: "file",
      preConfirm: i => {
        const file = document.querySelector("input[type=file]");
        handleImportRequest(file);
        return false;
      }
    });
  };

  return (
    <Tooltip
      placement="bottom"
      trigger={["hover"]}
      overlay={<span>Upload Palette</span>}>
      <button className="btn btn-upload-palette" onClick={handleImportBtnClick}>
        <i className="fad fa-file-upload" />
      </button>
    </Tooltip>
  );
};

export default UploadPaletteButton;
