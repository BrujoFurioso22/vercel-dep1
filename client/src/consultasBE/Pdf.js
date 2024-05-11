import axios from "axios";
import url from "./config/Url";

export async function CrearPdf({ dataJuego, dataInfo, nombreRes }) {
  try {
    const res = await axios.post(`${url}/api/pdf/generarPDF`,{ dataJuego, dataInfo, nombreRes },{responseType:'blob'});
    // Crear un URL y descargar el PDF
    console.log(res);
    const urll = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = urll;
    link.setAttribute('download', 'bingo.pdf');  // o cualquier otro nombre de archivo
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(urll);  // Limpia el objeto URL
    return res;
  } catch (err) {
    return err;
  }
}
