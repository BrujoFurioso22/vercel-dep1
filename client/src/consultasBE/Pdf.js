import axios from "axios";
import url from "./config/Url";

export async function CrearPdf({
  dataJuego1,
  dataJuego2,
  dataInfo1,
  dataInfo2,
  nombreRes,
}) {
  try {
    // console.log(dataJuego);
    // console.log(dataInfo);
    // console.log(nombreRes);
    const res = await axios.post(
      `${url}/api/pdf/generarPDF`,
      { dataJuego1, dataJuego2, dataInfo1, dataInfo2, nombreRes },
      { responseType: "blob" }
    );
    // Comprobar el código de estado de la respuesta
    if (res.status === 205) {
      return false;
    } else if (res.status === 202) {
      // Crear un URL y descargar el PDF
      const blob = new Blob([res.data], { type: "application/pdf" });
      // Crear un URL para el Blob
      const urll = window.URL.createObjectURL(blob);
      // console.log(urll);

      const link = document.createElement("a");
      link.setAttribute("href", urll); // o cualquier otro nombre de archivo
      link.setAttribute("download", "bingo.pdf"); // o cualquier otro nombre de archivo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    }

    // window.URL.revokeObjectURL(urll); // Limpia el objeto URL
    return res;
  } catch (err) {
    return err;
  }
}
