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
  cccliente,
  nombrecliente,
  cantidadnormal,
  cantidadrapida,
  cantidaddinero,
  numerotransaccion
) {
  try {
    const res = await axios.post(`${url}/api/tablas/insertarventa`, {
      idvendedor: idvendedor,
      cccliente: cccliente,
      nombrecliente: nombrecliente,
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

export async function ConsultarVentas(idvendedor) {
  try {
    const res = await axios.post(`${url}/api/ventas/obtenerventasvendedor`, {
      idvendedor: idvendedor,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function ConsultarTablasSegunIDVenta(idventa) {
  try {
    const res = await axios.post(`${url}/api/tablas/obtenertablasventa`, {
      idventa: idventa,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function ConsultarTablasSegunIDTabla(codigotabla) {
  try {
    const res = await axios.post(`${url}/api/tablas/buscartabla`, {
      codigotabla: codigotabla,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function UpdateTablaNormalDes({
  contenido,
  premio1,
  premio2,
  premio3,
  premios,
  fecha_hora,
  cantidad_letras,
  letras,
}) {
  try {
    const res = await axios.post(
      `${url}/api/descripciones/actualizardescripcionnormal`,
      {
        contenido,
        premio1,
        premio2,
        premio3,
        premios,
        fecha_hora,
        cantidad_letras,
        letras,
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}
export async function UpdateTablaRapidaDes({ contenido, premio1, fecha_hora }) {
  try {
    const res = await axios.post(
      `${url}/api/descripciones/actualizardescripcionrapida`,
      {
        contenido,
        premio1,
        fecha_hora,
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}
export async function ObtenerDesNormal() {
  try {
    const res = await axios.get(
      `${url}/api/descripciones/obtenerdescripcionnormal`
    );
    return res;
  } catch (err) {
    return err;
  }
}
export async function ObtenerDesRapida() {
  try {
    const res = await axios.get(
      `${url}/api/descripciones/obtenerdescripcionrapida`
    );
    return res;
  } catch (err) {
    return err;
  }
}
export async function ObtenerJugadas() {
  try {
    const res = await axios.get(`${url}/api/juegos/consultarjuegos`);
    if (res.data.exists) {
      return res.data.data;
    } else {
      return res.data.exists;
    }
  } catch (err) {
    return err;
  }
}
export async function CrearNuevaJugada({ data }) {
  try {
    const res = await axios.post(`${url}/api/juegos/nuevojuego`, { data });
    console.log(res);
    return res;
  } catch (err) {
    return err;
  }
}
