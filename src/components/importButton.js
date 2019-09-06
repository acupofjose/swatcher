import React from "react";
import Axios from "axios";
import Swal from "sweetalert2/src/sweetalert2.js";
import withReactContent from "sweetalert2-react-content";

const ReactSwal = withReactContent(Swal);

const ImportButton = function() {
  const handleImportRequest = fileInput => {
    const formData = new FormData();
    const headers = { headers: { "Content-Type": "multipart/form-data" } };
    formData.append("file", fileInput.files[0]);
    return axios
      .post("https://swatcher.acupajoe.io/api/v1/parse/", formData, headers)
      .then(result => {
        console.log(result);
      })
      .catch(err => console.error(err));
  };

  const handleImportBtnClick = async e => {
    await ReactSwal.fire({
      title: "Upload",
      input: "file",
      preConfirm: i => {
        const file = document.querySelector("input[type=file]");
        handleImportRequest(file).then(() => ReactSwal.close());
        return false;
      }
    });
  };

  return (
    <button className="btn btn-import" onClick={handleImportBtnClick}>
      <i className="fad fa-file-upload" />
    </button>
  );
};

export default ImportButton;
