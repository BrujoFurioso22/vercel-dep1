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
      { responseType: "arraybuffer", timeout: 500000 }
    );
    if (res.status === 205) {
      return false;
    } else if (res.status === 200) {
      console.log(res);
      // console.log(res.data.html);
      const contentType = res.headers["content-type"];
      let fileExtension = "";
      if (contentType === "application/pdf") {
        fileExtension = "pdf";
      } else if (contentType === "application/zip") {
        fileExtension = "zip";
      }
      let nombreArchivoPredeterminado = `BINGO_CHABELITA_${dato1}-${dataJuego1.length}-${dataJuego2.length}.pdf`;

      const blob = new Blob([res.data], { type: contentType });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${nombreArchivoPredeterminado}.${fileExtension}`;
      link.click();
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
}
