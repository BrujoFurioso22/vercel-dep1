import axios from "axios";
import url from "./config/Url";

// export async function ObtenerUsuario() {
//   try {
//     const res = await axios.get(`${url}/api/users/`);
//     return res.data.data;
//   } catch (err) {
//     return err;
//   }
// }
export async function ConsultarUserVendedores() {
  try {
    const res = await axios.get(`${url}/api/users/getvendedores`);
    if(res.status ===200){
      return res.data.datos
    }else{
      return []
    }
  } catch (err) {
    return err;
  }
}
export async function ActualizarBloqueoUsuario({cedulacelular}) {
  try {
    const res = await axios.post(`${url}/api/users/actualizarestado`,{cedulacelular});
    console.log(res);
    if(res.status ===200){
      return res.data.datos
    }else{
      return []
    }
  } catch (err) {
    return err;
  }
}