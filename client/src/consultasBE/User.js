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
export async function VerificarUsuario(email,password) {
  try {
    const res = await axios.post(`${url}/api/users/userverif`,{
      email: email,
      password: password,
    });
    return res;
  } catch (err) {
    return err;
  }
}
