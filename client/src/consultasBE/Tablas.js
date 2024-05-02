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
export async function IngresarVenta(
  idvendedor,
  idcliente,
  cantidadnormal,
  cantidadrapida,
  cantidaddinero,
  numerotransaccion
) {
  try {
    const res = await axios.post(`${url}/api/tablas/insertarventa`, {
      idvendedor: idvendedor,
      idcliente: idcliente,
      cantidadnormal: cantidadnormal,
      cantidadrapida: cantidadrapida,
      cantidaddinero: cantidaddinero,
      numerotransaccion: numerotransaccion,
    });
    return res;
  } catch (err) {
    return err;
  }
}