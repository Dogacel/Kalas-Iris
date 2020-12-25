import axios from "axios";

const flaskAPIAdress = "http://localhost:5000";
const mmfashionAPIAddress = "http://34.107.125.106";
const functionAddress =
  "http://europe-west3-mmfashion-299621.cloudfunctions.net";

export function uploadImage(image, config = null) {
  const fmData = new FormData();
  fmData.append("image", image);

  return axios.post(`${flaskAPIAdress}/uploadProductImage`, fmData, config);
}

export function annotateImage(image, config = null) {
  const fmData = new FormData();
  fmData.append("image", image);

  return axios.post(`${mmfashionAPIAddress}/annotate`, fmData, config);
}

export async function isServerUp() {
  try {
    const result = await axios.get(
      `${mmfashionAPIAddress}/`,
      {},
      { timeout: 2 }
    );
    return result.status === 200;
  } catch {
    return false;
  }
}

export function upServer() {
  alert("Starting server might take 1 to 2 minutes.");
  return axios.post(`${functionAddress}/startInstance`, {
    zone: "europe-west3-a",
    label: "env=dev",
  });
}

export function downServer() {
  return axios.post(`${functionAddress}/stopInstance`, {
    zone: "europe-west3-a",
    label: "env=dev",
  });
}
