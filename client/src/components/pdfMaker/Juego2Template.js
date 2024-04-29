import { EstructuraTabla2 } from "../../pages/UserPages/EstructuraTabla2";
import { dataTabla2 } from "../../pages/UserPages/data";
import "./1.css";
export const htmlTemplate2 = ({dataJuego}) => {
  //   console.log(tablaHTML);
  return (
    <div class="page">
      <div class="header">
        <div class="c1-header">
          <h3>Premio de $10000</h3>
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
            <div>licuadora</div>
            <div>licuadora</div>
            <div>licuadora</div>
            <div>licuadora</div>
          </div>
        </div>
        <div class="c3-header">
          <div>BINGO CHABELITA</div>
        </div>
      </div>
      <div class="bingo-container">
        <div class="bingo-container-u">
          {dataJuego.map((data, idx) => (
            <div class="bingo-card" key={idx}>
              <div class="bingo-table">
                <EstructuraTabla2 dataTables={data}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <GenerateTableHtml datos={datos} /> */}
      <div class="footer">CÓDIGO DE HOJA: KJSHDF7SFU32A</div>
    </div>
  );
};
