import axios from "axios";
import url from "./config/Url";
const ruta = "/pdfPreview.html";
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
      { responseType:"blob" , timeout: 500000 }
    );
    console.log(res);
    if (res.status === 205) {
      return false;
    } else if (res.status === 200) {
      console.log(res);
      // console.log(res.data.html);
      // const contentType = res.headers["content-type"];
      // let fileExtension = "";
      // if (contentType === "application/pdf") {
      //   fileExtension = "pdf";
      // } else if (contentType === "application/zip") {
      //   fileExtension = "zip";
      // }
      let nombreArchivoPredeterminado = `BINGO_CHABELITA_${dato1}-${dataJuego1.length}-${dataJuego2.length}`;

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${nombreArchivoPredeterminado}.pdf`;
      link.click();
      // const { html } = await res.data;

      // const blob = new Blob([html], { type: "text/html" });
      // const blobUrl = URL.createObjectURL(blob);

      // const uniqueId = `pdfContent_${new Date().getTime()}`;
      // const newWindow = window.open(
      //   `${ruta}?blobUrl=${encodeURIComponent(blobUrl)}`,
      //   "_blank"
      // );
      // console.log(html);
      // // sessionStorage.setItem(uniqueId, html);
      // // const newWindow = window.open(`${ruta}?id=${uniqueId}`, "_blank");

      // if (!newWindow) {
      //   console.error("Failed to open new window");
      // }
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
}
