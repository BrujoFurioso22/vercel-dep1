import axios from "axios";
import url from "./config/Url";

export async function ObtenerUsuario() {
  try {
    const res = await axios.get(`${url}/api/users/`);
    return res.data;
  } catch (err) {
    return err;
  }
}
