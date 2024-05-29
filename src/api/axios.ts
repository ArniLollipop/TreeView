import axios from "axios";
// import router from "../router/router";
// import notify from "devextreme/ui/notify";

const requestAxios = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: "https://64b4c8450efb99d862694609.mockapi.io/",
});

export default requestAxios;
