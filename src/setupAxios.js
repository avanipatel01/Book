const setupAxios = (axios) => {
  axios.defaults.baseURL = "http://192.168.29.117:8000/api/v1";

  const token = localStorage.getItem("authorization");

  if (token) {
    axios.defaults.headers.common["authorization"] = token;
  }
};

export default setupAxios;
