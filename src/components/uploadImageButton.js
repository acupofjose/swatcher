import React from "react";
import Tooltip from "rc-tooltip";

export default function UploadImageButton() {
  return (
    <Tooltip
      placement="bottom"
      trigger={["hover"]}
      overlay={<span>Colors from uploaded image</span>}>
      <button className="btn btn-upload-image">
        <i className="fad fa-file-image" />
      </button>
    </Tooltip>
  );
}
