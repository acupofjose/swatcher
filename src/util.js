import { sample } from "lodash";
import Swal from "sweetalert2/src/sweetalert2.js";
import withReactContent from "sweetalert2-react-content";

const ReactSwal = withReactContent(Swal);

export const getRandomReadableString = (count = 3) => {
  const nouns = require("./static/nouns.json");
  const adjectives = require("./static/adjectives.json");

  const output = [];
  for (let i = 0; i < count; i++) {
    if (i + 1 === count) {
      output.push(sample(nouns));
    } else {
      output.push(sample(adjectives));
    }
  }

  return output.join("-");
};

export const ShowToast = (type, text, autoDismiss = true) => {
  ReactSwal.fire({
    type,
    title: text,
    position: "top-end",
    toast: true,
    timer: autoDismiss ? 4000 : false,
    showConfirmButton: !autoDismiss
  });
};
