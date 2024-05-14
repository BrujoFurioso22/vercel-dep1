import axios from "axios";
import url from "./config/Url";

export async function ConsultarUserVendedores() {
  try {
    const res = await axios.get(`${url}/api/users/getvendedores`);
    if (res.status === 200) {
      return res.data.datos;
    } else {
      return [];
    }
  } catch (err) {
    return err;
  }
}
export async function ActualizarBloqueoUsuario({ cedulacelular }) {
  try {
    const res = await axios.post(`${url}/api/users/actualizarestado`, {
      cedulacelular,
    });
    // console.log(res);
    if (res.status === 200) {
      return res.data.ok;
    } else {
      return false;
    }
  } catch (err) {
    return err;
  }
}
export async function ActualizarDatosUsuarioVendedor({
  cedulacelular,
  nombre,
  alias,
  passwd,
}) {
  try {
    const res = await axios.post(`${url}/api/users/actualizardatos`, {
      cedulacelular,
      nombre,
      alias,
      passwd,
    });
    // console.log(res);
    if (res.status === 200) {
      return res.data.ok;
    } else {
      return false;
    }
  } catch (err) {
    return err;
  }
}
