import axios from "axios";
import url from "./config/Url";

export async function CrearPdf({ dataJuego, dataInfo, nombreRes }) {
  try {
    // console.log(dataJuego);
    // console.log(dataInfo);
    // console.log(nombreRes);
    const res = await axios.post(
      `${url}/api/pdf/generarPDF`,
      { dataJuego, dataInfo, nombreRes },{responseType:"blob"}
    );
    console.log(res);
    // Crear un URL y descargar el PDF
    const urll = window.URL.createObjectURL(new Blob([res.data]));
    // console.log(urll);
    
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
