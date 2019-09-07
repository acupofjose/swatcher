import React from "react";
import Tooltip from "rc-tooltip";

const SaveButton = function() {
  return (
    <Tooltip
      placement="bottom"
      trigger={["hover"]}
      overlay={<span>Save Palette</span>}>
      <button className="btn btn-save">
        <i className="fad fa-save" />
      </button>
    </Tooltip>
  );
};

export default SaveButton;
