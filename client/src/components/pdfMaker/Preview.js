import React, { useEffect, useState } from "react";
import { HtmlTemplate2 } from "./Juego2Template";
import Header from "../Header";
import { HtmlTemplate1 } from "./Juego1Template";
import {
  ConsultarTablasSegunIDVenta,
  ObtenerDesNormal,
  ObtenerDesRapida,
} from "../../consultasBE/Tablas";
const dataInfo = {
  fecha: "Viernes, 10 de Mayo",
  hora: "20:00hrs",
};

const Preview = () => {
  const [mostrar, setMostrar] = useState(false);
  const [d1, setd1] = useState([]);
  const [d2, setd2] = useState([]);
  let dataTabla, dataTabla2, data1, data2;
  const ConsultarDatos = async () => {
    try {
      const res = await ConsultarTablasSegunIDVenta(47);
      if (res) {
        console.log(res.data);
        dataTabla = res.data.data1;
        dataTabla2 = res.data.data2;
        console.log(dataTabla);
        setd1(dataTabla);
        const ConsultarDatos1 = async () => {
          const resN = await ObtenerDesNormal();
          if (resN) {
            function limpiarArreglo(arreglo) {
              return arreglo.filter((item) => item.trim() !== "");
            }
            let bo = {
              ...resN.data.data,
              premios: limpiarArreglo(resN.data.data.premios),
            };
            data1 = [bo];
            console.log(data1);
            setd2(data1);
          }

          const resR = await ObtenerDesRapida();
          if (resR) {
            data2 = [resR.data.data];
          }
        };
        await ConsultarDatos1();
        console.log(data1);
        setMostrar(true);
        // console.log(data2);
      }
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };
  useEffect(() => {
    ConsultarDatos();
  }, []);
  return (
    <div>
      <Header />
      {console.log(d1)}
      {console.log(d2)}
      {d1.length > 0 && d2.length > 0 && (
        <HtmlTemplate1 dataJuego={d1} dataInfo={d2} />
      )}
    </div>
  );
};

export default Preview;
