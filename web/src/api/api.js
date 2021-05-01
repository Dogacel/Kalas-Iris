import axios from "axios";

const flaskAPIAdress = "http://localhost:5000";
const mmfashionAPIAddress = "http://34.91.142.201";
const functionAddress =
  "http://europe-west3-mmfashion-299621.cloudfunctions.net";

export function uploadImage(image, config = null) {
  const fmData = new FormData();
  fmData.append("image", image);

  return axios.post(`${flaskAPIAdress}/uploadProductImage`, fmData, config);
}

export function uploadImageRetrieval(image, config = null){
  const fmData = new FormData();
  fmData.append("image", image);

  return axios.post("http://34.91.142.201/retrieve", fmData, config);
}

export function annotateImage(image, config = null) {
  const fmData = new FormData();
  fmData.append("image", image);

  return axios.post(`${flaskAPIAdress}/annotateImage`, fmData, config);
}

export function signUpUser(form, config = null) {
  const fmData = new FormData();
  fmData.append("username", form["username"]);
  fmData.append("password", form["password"]);
  fmData.append("email", form["email"]);
  fmData.append("name", form["name"]);
  fmData.append("surname", form["surname"]);

  return axios.post(`${flaskAPIAdress}/signup`, fmData, config);
}

export function login(form, config = null) {
  const fmData = new FormData();
  fmData.append("username", form["username"]);
  fmData.append("password", form["password"]);

  return axios.post(`${flaskAPIAdress}/login`, fmData, config);
}

export function logout(config = null) {
  return axios.delete(`${flaskAPIAdress}/logout`, config)
}

export function logout2(config = null){
  return axios.delete(`${flaskAPIAdress}/logout2`, config)
}

export async function getCurrentUser(access_token) {
  try {
    const authStr = "Bearer ".concat(access_token);
    const config = {
      headers: { Authorization: authStr },
    };
    const response = await axios.get(
      `${flaskAPIAdress}/getCurrentUser`,
      config
    );
    if (response.status === 200) {
      return response;
    }
  } catch {
    return false;
  }
}

export async function createIntegration(access_token, data) {
  const authStr = "Bearer ".concat(access_token);
  const config = {
    headers: { Authorization: authStr },
  };
  const response = await axios.post(
    `${flaskAPIAdress}/integrations`,
    data,
    config
  );
  return response;
}

export async function getIntegrations(access_token) {
  const authStr = "Bearer ".concat(access_token);
  const config = {
    headers: { Authorization: authStr },
  };
  const response = await axios.get(`${flaskAPIAdress}/integrations`, config);

  return response;
}

export async function getAnnotationHistory() {
  const response = await axios.get(`${flaskAPIAdress}/history`);
  
  return response;
}

export async function getReviewHistory() {
  const response = await axios.get(`${flaskAPIAdress}/reviewed`);
  
  return response;
}

export async function sendAnnotationSuggestion(filename, suggestion) {
  const response = await axios.post(`${flaskAPIAdress}/review/${filename}`, suggestion);

  return response;
}

export function imlink(im) {
  return `${flaskAPIAdress}/file/${im}`;
}

export async function isServerUp() {
  try {
    const response = await axios.get(`${mmfashionAPIAddress}/`, {
      timeout: 2000,
    });

    return response.status === 200;
  } catch {
    return false;
  }
}

export function upServer() {
  return axios.post(
    `${functionAddress}/startInstance`,
    {
      zone: "europe-west3-a",
      label: "env=dev",
    },
    {
      timeout: 90000,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export function downServer() {
  return axios.post(
    `${functionAddress}/stopInstance`,
    {
      zone: "europe-west3-a",
      label: "env=dev",
    },
    {
      timeout: 90000,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
