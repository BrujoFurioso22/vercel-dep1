import { EstructuraTabla1 } from "../../pages/UserPages/EstructuraTabla1";
import { dataTabla } from "../../pages/UserPages/data";
import "./1.css";
function GenerateTableHtml({ datos }) {
  const tableRows = datos.map((item) => (
    <tr key={item.nombre}>
      <td>{item.nombre}</td>
      <td>{item.premio}</td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Premio</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}
const datos = [
  { nombre: "Tabla 1", premio: "licuadora" },
  { nombre: "Tabla 2", premio: "licuadora" },
  // Más datos...
];
export const htmlTemplate1 = () => {
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
          {dataTabla.map((data, idx) => (
            <div class="bingo-card" key={idx}>
              <div class="bingo-table">
                <EstructuraTabla1 dataTables={data}/>
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
