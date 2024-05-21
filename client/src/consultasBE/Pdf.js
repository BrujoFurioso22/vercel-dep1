import axios from "axios";
import url from "./config/Url";
export async function CrearPdf({
  dataJuego1,
  dataJuego2,
  dataInfo1,
  dataInfo2,
  dato1,
}) {
  try {
    const res = await axios.post(
      `${url}/api/pdf/generarPDF`,
      { dataJuego1, dataJuego2, dataInfo1, dataInfo2 },
      { responseType: "blob" }
    );
    if (res.status === 205) {
      return false;
    } else if (res.status === 200) {
      console.log(res);
      console.log(res.data.html);
      const blob = new Blob([res.data.pdf], { type: "application/pdf" });
      const urll = window.URL.createObjectURL(blob);

      // Sugerir un nombre de archivo
      let nombreArchivoPredeterminado = `BINGO_CHABELITA_${dato1}-${dataJuego1.length}-${dataJuego2.length}.pdf`;

      // Solicitar al usuario que verifique o modifique el nombre del archivo
      let nombreArchivo = prompt(
        "Por favor, ingrese el nombre del archivo para descargar:",
        nombreArchivoPredeterminado
      );

      if (!nombreArchivo) {
        // Si el usuario cancela el prompt, se detiene el proceso
        return false;
      }

      // Asegurarse de que el nombre del archivo tenga la extensión .pdf
      if (!nombreArchivo.toLowerCase().endsWith(".pdf")) {
        nombreArchivo += ".pdf";
      }

      const link = document.createElement("a");
      link.setAttribute("href", urll);
      link.setAttribute("download", nombreArchivo);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
}
