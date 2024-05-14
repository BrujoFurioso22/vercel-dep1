import { log } from "console";
import { pool } from "../database.js";
import CryptoJS from "crypto-js";
import crypto from "crypto";

const secretKey = crypto.randomBytes(32).toString("hex");

function generarCodigoHexadecimal() {
  const caracteresHexadecimales = "0123456789";
  let codigoHexadecimal = "";
  for (let i = 0; i < 5; i++) {
    const indiceAleatorio = Math.floor(
      Math.random() * caracteresHexadecimales.length
    );
    codigoHexadecimal += caracteresHexadecimales.charAt(indiceAleatorio);
  }
  return codigoHexadecimal;
}
function generarCodigoHexadecimallargo() {
  const caracteresHexadecimales = "0123456789ABCDEF";
  let codigoHexadecimal = "";
  for (let i = 0; i < 10; i++) {
    const indiceAleatorio = Math.floor(
      Math.random() * caracteresHexadecimales.length
    );
    codigoHexadecimal += caracteresHexadecimales.charAt(indiceAleatorio);
  }
  return codigoHexadecimal;
}

function generarContrasenia() {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  let contrasenia = "";
  for (let i = 0; i < 6; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    contrasenia += caracteres.charAt(indiceAleatorio);
  }
  return contrasenia;
}

// Función para cifrar un texto
function encryptText(text, secretKey) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

async function insertarDatosEnLotes(pool, query, valores) {
  const batchSize = 100; // Tamaño del lote
  for (let i = 0; i < valores.length; i += batchSize) {
    const batchValues = valores.slice(i, i + batchSize);
    await pool.query(query, batchValues);
  }
}

export const tablasController = {
  probarInsercionNueva: async (req, res) => {

  },
  insertarVenta: async (req, res) => {
    try {
      const {
        idvendedor,
        cccliente,
        nombrecliente,
        cantidadnormal,
        cantidadrapida,
        cantidaddinero,
        numerotransaccion,
      } = req.body;

      let idcliente = 0;
      let isInserted = false;
      do {
        const quse = await pool.query("SELECT * FROM users WHERE cc = $1;", [
          cccliente,
        ]);
        const rowscliente = quse.rows;

        if (rowscliente.length === 0) {
          const contraseniaGenerada = generarContrasenia();
          const encriptado = encryptText(contraseniaGenerada, secretKey);
          const final = `${encriptado}${secretKey}`;

          const quse = await pool.query(
            "INSERT INTO users(name, cc, password) VALUES ($1, $2, $3);",
            [nombrecliente, cccliente, final]
          );
        } else {
          idcliente = rowscliente[0].id;
          isInserted = true;
        }
      } while (!isInserted);
      let banderin = false;
      let hexvalidador;
      do {
        hexvalidador = generarCodigoHexadecimallargo();
        const { rows: hexrows } = await pool.query(
          "SELECT hex_validador FROM venta WHERE hex_validador=$1;",
          [hexvalidador]
        );
        if (hexrows.length === 0) {
          banderin = true;
        }
      } while (!banderin);
      let verif1 = true,
        verif2 = true;
      let cadenaparalatabla = "";
      let cadenaparatablarapida = "";
      if (cantidadnormal > 0) {
        try {
          // Función para generar números aleatorios sin repetición en un rango específico
          const generarNumerosAleatorios = (min, max, cantidad) => {
            let numeros = new Set();
            while (numeros.size < cantidad) {
              let num = Math.floor(Math.random() * (max - min + 1)) + min;
              numeros.add(num);
            }
            return Array.from(numeros);
          };

          for (let i = 0; i < cantidadnormal * 4; i++) {

            // Generar números aleatorios para diferentes rangos
            const numerosRango1 = generarNumerosAleatorios(1, 15, 5);
            const numerosRango2 = generarNumerosAleatorios(16, 30, 5);
            const numerosRango3 = generarNumerosAleatorios(31, 45, 4);
            const numerosRango4 = generarNumerosAleatorios(46, 60, 5);
            const numerosRango5 = generarNumerosAleatorios(61, 75, 5);

            // Combinar todos los números generados
            const todosLosNumeros = [
              ...numerosRango1,
              ...numerosRango2,
              ...numerosRango3,
              ...numerosRango4,
              ...numerosRango5,
              // Combinar otros rangos aquí...
            ];

            // Asignar números a las variables n1, n2, ..., n25
            const numerosAsignados = todosLosNumeros.slice(0, 24);

            let banderadecodigo = false
            let codigonormal = "";
            do {
              codigonormal = "N" + generarCodigoHexadecimal();
              const { rows: tablasnormales } = await pool.query(
                "SELECT tablas_normal FROM venta"
              );
              if (tablasnormales.length > 0) {
                for (let i = 0; i < tablasnormales.length; i++) {
                  if (tablasnormales[i].tablas_normal.includes(codigonormal)) {
                    banderadecodigo = true;
                    console.log(banderadecodigo);
                    break;
                  }
                }
              } else {
                banderadecodigo = true
              }
            } while (!banderadecodigo); // Bucle mientras no se haya encontrado en ninguna correctamente

            let cadenaNumeros = "[" + numerosAsignados.join(",") + "," + codigonormal + "]";

            if (i === 0) {
              cadenaparalatabla = cadenaNumeros;
            } else {
              cadenaparalatabla = cadenaparalatabla + "," + cadenaNumeros;
            }
          }
          console.log(cadenaparalatabla);
          // return res.status(200).json({ ok: true });
        } catch (error) {
          console.log("Error1");
          verif1 = false;
          // res.status(500).json({ error: error.message });
        }
      }

      if (cantidadrapida > 0) {
        try {
          // Función para generar números aleatorios sin repetición en un rango específico
          const generarNumerosAleatorios = (min, max, cantidad) => {
            let numeros = new Set();
            while (numeros.size < cantidad) {
              let num = Math.floor(Math.random() * (max - min + 1)) + min;
              numeros.add(num);
            }
            return Array.from(numeros);
          };

          for (let i = 0; i < cantidadrapida * 6; i++) {

            // Generar números aleatorios para diferentes rangos
            const numerosRango1 = generarNumerosAleatorios(1, 25, 3);
            const numerosRango2 = generarNumerosAleatorios(26, 50, 1);
            const numerosRango3 = generarNumerosAleatorios(51, 75, 3);

            // Combinar todos los números generados
            const todosLosNumeros = [
              ...numerosRango1,
              ...numerosRango2,
              ...numerosRango3,
              // Combinar otros rangos aquí...
            ];

            // Asignar números a las variables n1, n2, ..., n25
            const numerosAsignados = todosLosNumeros.slice(0, 7);
            let banderadecodigo = false
            let codigorapido = "";
            do {
              codigorapido = "R" + generarCodigoHexadecimal();
              const { rows: tablasrapidas } = await pool.query(
                "SELECT tablas_rapida FROM venta"
              );
              if (tablasrapidas.length > 0) {
                for (let i = 0; i < tablasrapidas.length; i++) {
                  if (tablasrapidas[i].tablas_rapida.includes(codigorapido)) {
                    banderadecodigo = true;
                    console.log(banderadecodigo);
                    break;
                  }
                }
              } else {
                banderadecodigo = true
              }
            } while (!banderadecodigo); // Bucle mientras no se haya encontrado en ninguna correctamente

            let cadenaNumeros = "[" + numerosAsignados.join(",") + "," + codigorapido + "]";

            if (i === 0) {
              cadenaparatablarapida = cadenaNumeros;
            } else {
              cadenaparatablarapida = cadenaparatablarapida + "," + cadenaNumeros;
            }
          }
          console.log(cadenaparatablarapida);

          // return res.status(200).json({ ok: true });
        } catch (error) {
          console.log("Error1");
          verif2 = false;
          // res.status(500).json({ error: error.message });
        }
      }
      // console.log(rows);
      const insercionfinal = await pool.query(
        "INSERT INTO venta(id_vendedor, id_cliente, fecha, cantidad_normal, cantidad_rapida, cantidad_dinero, numero_transaccion, hex_validador,tablas_normal,tablas_rapida) VALUES ($1, $2, CURRENT_TIMESTAMP AT TIME ZONE 'America/Guayaquil', $3, $4, $5, $6, $7, $8, $9);",
        [
          idvendedor,
          idcliente,
          cantidadnormal,
          cantidadrapida,
          cantidaddinero,
          numerotransaccion,
          hexvalidador,
          cadenaparalatabla,
          cadenaparatablarapida
        ]
      );
      // console.log(verif1);
      // console.log(verif2);
      if (verif1 === true && verif2 === true) {
        return res.status(200).json({ ok: true });
      } else {
        return res.status(400).json({ ok: false });
      }
    } catch (error) {
      res.status(500).json({ ok: false });
    }
  },
  obtenerDatosDeTabla: async (req, res) => {
    try {
      const { codigotabla } = req.body;

      const { rows: rows1 } = await pool.query(
        "SELECT tablas_normal FROM venta WHERE tablas_normal LIKE $1;",
        ['%' + codigotabla + '%']
      );
      const { rows: rows2 } = await pool.query(
        "SELECT tablas_rapida FROM venta WHERE tablas_rapida LIKE $1;",
        ['%' + codigotabla + '%']
      );
      // console.log(rows2);
      if (rows1.length > 0) {

        // Divide la cadena en cada coma para obtener los elementos individuales
        const arregloTodo = rows1[0].tablas_normal.split(/\[|\]/).map(item => item.trim()).filter(item => item !== ',' && item !== ' ');

        const nuevoArreglo = [];

        for (const elemento of arregloTodo) {
          if (elemento.includes(codigotabla)) {
            nuevoArreglo.push(elemento);
          }
        }
        const FnuevoArreglo = nuevoArreglo[0].split(',');
        const var1 = [
          {
            numtabla: FnuevoArreglo[FnuevoArreglo.length - 1],
            datos: {
              1: FnuevoArreglo[0],
              2: FnuevoArreglo[5],
              3: FnuevoArreglo[10],
              4: FnuevoArreglo[14],
              5: FnuevoArreglo[19],
              6: FnuevoArreglo[1],
              7: FnuevoArreglo[6],
              8: FnuevoArreglo[11],
              9: FnuevoArreglo[15],
              10: FnuevoArreglo[20],
              11: FnuevoArreglo[2],
              12: FnuevoArreglo[7],
              14: FnuevoArreglo[16],
              15: FnuevoArreglo[21],
              16: FnuevoArreglo[3],
              17: FnuevoArreglo[8],
              18: FnuevoArreglo[12],
              19: FnuevoArreglo[17],
              20: FnuevoArreglo[23],
              21: FnuevoArreglo[4],
              22: FnuevoArreglo[9],
              23: FnuevoArreglo[13],
              24: FnuevoArreglo[18],
              25: FnuevoArreglo[23]
            },
          },
        ];
        console.log(var1);
        return res.status(200).json({
          data: var1,
        });
      } else if (rows2.length > 0) {
        // Divide la cadena en cada coma para obtener los elementos individuales
        const arregloTodo = rows2[0].tablas_rapida.split(/\[|\]/).map(item => item.trim()).filter(item => item !== ',' && item !== ' ');

        const nuevoArreglo = [];
        for (const elemento of arregloTodo) {
          if (elemento.includes(codigotabla)) {
            nuevoArreglo.push(elemento);
          }
        }
        const FnuevoArreglo = nuevoArreglo[0].split(',');
        const var2 = [
          {
            numtabla: FnuevoArreglo[FnuevoArreglo.length - 1],
            datos: {
              1: FnuevoArreglo[0],
              3: FnuevoArreglo[4],
              4: FnuevoArreglo[1],
              6: FnuevoArreglo[5],
              7: FnuevoArreglo[2],
              8: FnuevoArreglo[3],
              9: FnuevoArreglo[6],
            },
          },
        ];
        return res.status(200).json({
          data: var2,
        });
      }
      return res.status(404).json({ data: [] });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  obtenerTablasCliente: async (req, res) => {
    try {
      const { cccliente } = req.body;
      const { rows: rowsTablaNormal } = await pool.query(
        "SELECT tablas_normal FROM public.venta, public.users WHERE venta.id_cliente=users.id and users.cc =$1",
        [cccliente]
      );
      const { rows: rowsTablaRapida } = await pool.query(
        "SELECT tablas_rapida FROM public.venta, public.users WHERE venta.id_cliente=users.id and users.cc =$1",
        [cccliente]
      );

      let var1 = [],
        var2 = [];

      if (rowsTablaNormal.length > 0) {
        const arregloTodo = rowsTablaNormal[0].tablas_normal.split(/\[|\]/).map(item => item.trim()).filter(item => item !== ',' && item !== ' ');
        const tempo = [];
        for (const elemento of arregloTodo) {
          tempo.push(elemento);
        }
        tempo.splice(0, 1);
        tempo.splice(tempo.length - 1,);
        const FnuevoArreglo = [];
        for (let i = 0; i < tempo.length; i++) {
          FnuevoArreglo.push(tempo[i].split(','));
        }
        for (let k = 0; k < FnuevoArreglo.length; k++) {
          var1.push({
            numtabla: FnuevoArreglo[k][24],
            datos: {
              1: FnuevoArreglo[k][0],
              2: FnuevoArreglo[k][5],
              3: FnuevoArreglo[k][10],
              4: FnuevoArreglo[k][14],
              5: FnuevoArreglo[k][19],
              6: FnuevoArreglo[k][1],
              7: FnuevoArreglo[k][6],
              8: FnuevoArreglo[k][11],
              9: FnuevoArreglo[k][15],
              10: FnuevoArreglo[k][20],
              11: FnuevoArreglo[k][2],
              12: FnuevoArreglo[k][7],
              14: FnuevoArreglo[k][16],
              15: FnuevoArreglo[k][21],
              16: FnuevoArreglo[k][3],
              17: FnuevoArreglo[k][8],
              18: FnuevoArreglo[k][12],
              19: FnuevoArreglo[k][17],
              20: FnuevoArreglo[k][23],
              21: FnuevoArreglo[k][4],
              22: FnuevoArreglo[k][9],
              23: FnuevoArreglo[k][13],
              24: FnuevoArreglo[k][18],
              25: FnuevoArreglo[k][23]
            },
          });
        }
      }

      if (rowsTablaRapida.length > 0) {
        const arregloTodo = rowsTablaRapida[0].tablas_rapida.split(/\[|\]/).map(item => item.trim()).filter(item => item !== ',' && item !== ' ');
        const tempo = [];
        for (const elemento of arregloTodo) {
          tempo.push(elemento);
        }
        tempo.splice(0, 1);
        tempo.splice(tempo.length - 1,);
        const FnuevoArreglo = [];
        for (let i = 0; i < tempo.length; i++) {
          FnuevoArreglo.push(tempo[i].split(','));
        }
        for (let k = 0; k < FnuevoArreglo.length; k++) {
          var2.push({
            numtabla: FnuevoArreglo[k][7],
            datos: {
              1: FnuevoArreglo[k][0],
              3: FnuevoArreglo[k][4],
              4: FnuevoArreglo[k][1],
              6: FnuevoArreglo[k][5],
              7: FnuevoArreglo[k][2],
              8: FnuevoArreglo[k][3],
              9: FnuevoArreglo[k][6],
            },
          });
        }
      }
      return res.status(200).json({
        ok: true,
        data1: var1,
        data2: var2,
        
      });
    } catch (error) {
      res.status(500).json({ msg: error.msg });
    }
  },
  obtenerTablasVenta: async (req, res) => {
    //////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    try {
      const { idventa } = req.body;
      const { rows: rowsTablaNormal } = await pool.query(
        "SELECT * FROM tablanormal WHERE tablanormal.id_venta = $1;",
        [idventa]
      );
      const { rows: rowsTablaRapida } = await pool.query(
        "SELECT * FROM tablarapida WHERE tablarapida.id_venta = $1;",
        [idventa]
      );
      let var1 = [],
        var2 = [];
      if (rowsTablaNormal.length > 0) {
        var1 = rowsTablaNormal.map((row) => ({
          numtabla: row.codigo,
          datos: {
            1: row.num1,
            2: row.num6,
            3: row.num11,
            4: row.num16,
            5: row.num21,
            6: row.num2,
            7: row.num7,
            8: row.num12,
            9: row.num17,
            10: row.num22,
            11: row.num3,
            12: row.num8,
            14: row.num18,
            15: row.num23,
            16: row.num4,
            17: row.num9,
            18: row.num14,
            19: row.num19,
            20: row.num24,
            21: row.num5,
            22: row.num10,
            23: row.num15,
            24: row.num20,
            25: row.num25,
          },
        }));
      }
      if (rowsTablaRapida.length > 0) {
        var2 = rowsTablaRapida.map((rowsTablaRapida) => ({
          numtabla: rowsTablaRapida.codigo,
          datos: {
            1: rowsTablaRapida.num1,
            3: rowsTablaRapida.num7,
            4: rowsTablaRapida.num3,
            6: rowsTablaRapida.num8,
            7: rowsTablaRapida.num4,
            8: rowsTablaRapida.num6,
            9: rowsTablaRapida.num9,
          },
        }));
      }
      return res.status(200).json({
        data1: var1,
        data2: var2,
      });
    } catch (error) {
      res.status(500).json({ msg: error.msg });
    }
  },
};
