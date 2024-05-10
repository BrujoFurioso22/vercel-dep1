import { EstructuraTabla1 } from "../../pages/UserPages/EstructuraTabla1";
import "./1.css";
import styled from "styled-components";
import logo from "../../imgs/LogoChabelita1.ico";
import LetrasGrid from "../letrasTabla/LetrasGrid";

const Page = styled.div`
  font-family: "Arial", sans-serif;
  width: 210mm;
  min-height: 297mm;
  padding: 2mm;
  background: white;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  h1,
  h2 {
    color: #333;
  }
`;

const Header = styled.div`
  border: solid 1px rgba(0, 0, 0, 0.2);
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 5mm;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 2mm;
  & > h4 {
    margin: 0;
    width: 100%;
    padding-bottom: 1mm;
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  & > .header-body {
    text-align: center;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: 10mm;
    justify-content: space-evenly;
    width: 100%;
    & > .c1-header {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      & > img {
        width: 100%;
      }
    }

    & > .c2-header {
      flex: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2mm;
      & > .c2-content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 3mm;
        row-gap: 1.5mm;
        border: solid 1px rgba(0, 0, 0, 0.3);
        padding: 1mm 2mm;
        border-radius: 2mm;
      }
    }
    & > .c3-header {
      flex: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
`;

const Footer = styled.div`
  padding: 2mm;
  background-color: #f1f1f1;
  text-align: center;
  border: solid 1px black;
  border-radius: 10px;
  bottom: 0;
`;

const Body = styled.div`
  display: flex;
  width: 100%;
  padding: 10mm;
  padding-top: 3mm;
  flex-direction: column;
  justify-content: center;
  & > .bingo-container-u {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5mm;
    & > .bingo-card {
      width: 100%;
      height: fit-content;
      padding: 2mm;
      border: 1px solid #ccc;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const HtmlTemplate1 = ({ dataJuego, dataInfo }) => {
  function formatearFechaConHora(fechaISO) {
    const opciones = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const fecha = new Date(fechaISO);
    const fechaFormateada = new Intl.DateTimeFormat("es-ES", opciones).format(
      fecha
    );
    return fechaFormateada.replace(" a. m.", " AM").replace(" p. m.", " PM");
  }
  console.log(dataInfo);
  return (
    <Page>
      <Header>
        <h4>EL GRAN BINGO CHABELITA</h4>
        <div className="header-body">
          <div class="c1-header">
            <img src={logo} alt="Logo" />
          </div>
          <div class="c2-header">
            {dataInfo[0].premios.length > 0 && (
              <div>
                <div class="c2-tit">Premios adicionales:</div>
                <div class="c2-content">
                  {dataInfo[0].premios.map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <div>Las letras a jugar son: {dataInfo[0].letras.join(", ")}</div>
              <div>Ganancia por letra: $20</div>
            </div>
            
          </div>
          <div class="c3-header">
            <h3>1era Tabla Llena: ${dataInfo[0].premio1}</h3>
            <span>2da Tabla Llena: ${dataInfo[0].premio2}</span>
            <span>3ra Tabla Llena: ${dataInfo[0].premio3}</span>
            <span>
              Se jugará el {formatearFechaConHora(dataInfo[0].fecha_hora)}
            </span>
          </div>
        </div>
      </Header>
      <Body>
        <LetrasGrid letras={dataInfo[0].letras} />
        <div class="bingo-container-u">
          {dataJuego.map((data, idx) => (
            <div class="bingo-card" key={idx}>
              <div class="bingo-table">
                <EstructuraTabla1 dataTables={data} />
              </div>
            </div>
          ))}
        </div>
      </Body>
      {/* <GenerateTableHtml datos={datos} /> */}
      <Footer>Contactate a los numeros : uifhsdifhasf</Footer>
    </Page>
  );
};
