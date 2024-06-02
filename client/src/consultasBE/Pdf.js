import axios from "axios";
import url from "./config/Url";

function openPDF(pdfUrl) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (isIOS) {
    // Para iOS, usar window.location.href
    window.location.href = pdfUrl;
  } else {
    // Para otros dispositivos, usar window.open
    const newWindow = window.open(pdfUrl, "_blank");
    if (!newWindow) {
      alert('No se pudo abrir el PDF, por favor permite los pop-ups en este sitio.');
    }
  }
}

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
      { timeout: 500000 }
    );
    console.log(res);
    if (res.status === 205) {
      return false;
    } else if (res.status === 200) {
      console.log(res.data.pdf);
      const pdfUrl = res.data.pdf.FileUrl;
      openPDF(pdfUrl);
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
}
