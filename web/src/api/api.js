import axios from "axios";

const flaskAPIAdress = "http://localhost:5000";
const mmfashionAPIAdress = "http://34.89.212.76";

export function uploadImage(image, config = null) {
  const fmData = new FormData();
  fmData.append("image", image);

  return axios.post(`${flaskAPIAdress}/uploadProductImage`, fmData, config);
}

export function annotateImage(image, config = null) {
  const fmData = new FormData();
  fmData.append("image", image);

  return axios.post(`${mmfashionAPIAdress}/annotate`, fmData, config);
}
