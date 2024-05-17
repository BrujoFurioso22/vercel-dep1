import axiosInstance from './axiosConfig';

export async function CrearPdf({ dataJuego1, dataJuego2, dataInfo1, dataInfo2, dato1 }) {
  try {
    const res = await axiosInstance.post(
      '/api/pdf/generarPDF',
      { dataJuego1, dataJuego2, dataInfo1, dataInfo2 },
      { responseType: 'blob' }
    );

    if (res.status === 205) {
      return false;
    } else if (res.status === 200) {
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const nombreArchivo = `BINGO CHABELITA_${dato1}-${dataJuego1.length}-${dataJuego2.length}.pdf`;
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nombreArchivo);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return true;
    }

    return res;
  } catch (err) {
    console.error('Error al crear el PDF:', err);
    return err;
  }
}