import React from "react";
import { HtmlTemplate2 } from "./Juego2Template";
import { dataTabla2 } from "../../pages/UserPages/data";
import Header from "../Header";
import { HtmlTemplate1 } from "./Juego1Template";
const dataInfo = {
    fecha: "Viernes, 10 de Mayo",
    hora:"20:00hrs"
}

const Preview = () => {
  return (
    <div>
      <Header />
      <HtmlTemplate1 dataJuego={dataTabla2} dataInfo={dataInfo} />
    </div>
  );
};

export default Preview;
