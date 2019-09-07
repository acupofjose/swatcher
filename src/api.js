const isProduction = process.env.NODE_ENV === "production";
const API_HOST = isProduction
  ? "https://swatcher.acupajoe.io"
  : "http://localhost:8080";
const API_URL = `${API_HOST}/api/v1`;

function buildUrl(url, parameters) {
  var qs = "";
  for (var key in parameters) {
    var value = parameters[key];
    qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1); //chop off last "&"
    url = url + "?" + qs;
  }
  return url;
}

export const UploadImage = fileDescriptor => {};
export const UploadPalette = fileDescriptor => {};
export const GetExportPaletteUrl = (name, colors) => {
  const data = { name, colors: JSON.stringify(colors) };
  return buildUrl(`${API_URL}/export/procreate`, data);
};
