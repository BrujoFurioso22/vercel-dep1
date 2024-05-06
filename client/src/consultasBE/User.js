import axios from "axios";
import url from "./config/Url";

export async function ObtenerUsuario() {
  try {
    const res = await axios.get(`${url}/api/users/`);
    return res.data.data;
  } catch (err) {
    return err;
  }
}
export async function ObtenerUsuarioPorCC(cedulacelular) {
  try {
    const res = await axios.post(`${url}/api/users/getcliente`, {
      cedulacelular: cedulacelular,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function VerificarUsuario(cedulacelular, password) {
  try {
    const res = await axios.post(`${url}/api/users/userverif`, {
      cedulacelular: cedulacelular,
      password: password,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function ObtenerIDUsuario(cedulacelular) {
  try {
    const res = await axios.post(`${url}/api/users/userId`, {
      cedulacelular: cedulacelular,
    });
    return res;
  } catch (err) {
    return err;
  }
}
