import { EstructuraTabla1 } from "../../pages/UserPages/EstructuraTabla1";
import "./1.css";
import styled from "styled-components";
import logo from "../../imgs/LogoChabelita1.ico";

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
  padding: 5mm;
  background-color: #f1f1f1;
  text-align: center;
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 2mm;
  justify-content: space-evenly;
  & > .c1-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & > img {
      width: 20mm;
    }
  }

  & > .c2-header {
    display: flex;
    flex-direction: column;
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

export const HtmlTemplate1 = ({ dataJuego }) => {
  return (
    <Page>
      <Header>
        <div class="c1-header">
          <img src={logo} alt="Logo" />
        </div>
        <div class="c2-header">
          <div class="c2-tit">Los premios seran:</div>
          <div class="c2-content">
            <div>licuadora</div>
            <div>licuadora</div>
            <div>licuadora</div>
            <div>licuadora</div>
            <div>licuadora</div>
            <div>licuadora</div>
            <div>licuadora</div>
            <div>licuadora</div>
          </div>
        </div>
        <div class="c3-header">
          <h3>Premio de $300</h3>
        </div>
      </Header>
      <Body>
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
