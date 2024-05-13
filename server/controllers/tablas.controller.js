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
      console.log("si entre aqui compa");

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

      let verif1 = true,
        verif2 = true;

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
          let cadenaparalatabla = ""; // Cambiar de const a let
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

            console.log(numerosAsignados);
            let banderadecodigo = false
            let codigonormal = "";
            do {
              codigonormal = "N" + generarCodigoHexadecimal();
              console.log(codigonormal);
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
          let cadenaparatablarapida = ""; // Cambiar de const a let
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

            console.log(numerosAsignados);
            let banderadecodigo = false
            let codigorapido = "";
            do {
              codigorapido = "R" + generarCodigoHexadecimal();
              console.log(codigorapido);
              const { rows: tablasrapidas } = await pool.query(
                "SELECT tablas_rapida FROM venta"
              );
              if (tablasrapidas.length > 0) {
                for (let i = 0; i < tablasrapidas.length; i++) {
                  if (tablasrapidas[i].tablas_normal.includes(codigorapido)) {
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
        "SELECT tablas_normal FROM venta WHERE tablas_normal LIKE '%$1%';",
        [codigotabla]
      );

      const { rows: rows2 } = await pool.query(
        "SELECT tablas_rapida FROM venta WHERE tablas_rapida LIKE '%$1%';",
        [codigotabla]
      );
      // console.log(rows2);

      if (rows1.length > 0) {

        // Divide la cadena en cada coma para obtener los elementos individuales
        const elementos = rows1[0].tablas_normal.split(",");
        // Inicializa una variable para almacenar el conjunto de números que contiene "cod3"
        let conjuntoCod3;

        // Itera sobre los elementos para encontrar el conjunto que contiene "cod3"
        elementos.forEach(elemento => {
          if (elemento.includes(codigotabla)) {
            conjuntoCod3 = elemento;
          }
        });

        // Elimina los corchetes y las comillas de los extremos y convierte la cadena en un arreglo
        const arregloCod = conjuntoCod3.slice(1, -1).split(",").map(elemento => {
          // Convierte los elementos numéricos a números
          if (!isNaN(elemento)) {
            return parseInt(elemento);
          } else {
            // Mantén las comillas para el código
            return elemento;
          }
        });

        console.log(arregloCod);

        const var1 = [
          {
            numtabla: arregloCod[arregloCod.length],
            datos: {
              1: arregloCod[0],
              2: arregloCod[5],
              3: arregloCod[10],
              4: arregloCod[15],
              5: arregloCod[20],
              6: arregloCod[1],
              7: arregloCod[6],
              8: arregloCod[11],
              9: arregloCod[16],
              10: arregloCod[21],
              11: arregloCod[2],
              12: arregloCod[7],
              14: arregloCod[17],
              15: arregloCod[22],
              16: arregloCod[3],
              17: arregloCod[8],
              18: arregloCod[13],
              19: arregloCod[18],
              20: arregloCod[23],
              21: arregloCod[4],
              22: arregloCod[9],
              23: arregloCod[14],
              24: arregloCod[19],
              25: arregloCod[24]
            },
          },
        ];
        return res.status(200).json({
          data: var1,
        });
      } else if (rows2.length > 0) {
        // Divide la cadena en cada coma para obtener los elementos individuales
        const elementos = rows2[0].tablas_normal.split(",");
        // Inicializa una variable para almacenar el conjunto de números que contiene "cod3"
        let conjuntoCod3;

        // Itera sobre los elementos para encontrar el conjunto que contiene "cod3"
        elementos.forEach(elemento => {
          if (elemento.includes(codigotabla)) {
            conjuntoCod3 = elemento;
          }
        });

        // Elimina los corchetes y las comillas de los extremos y convierte la cadena en un arreglo
        const arregloCod = conjuntoCod3.slice(1, -1).split(",").map(elemento => {
          // Convierte los elementos numéricos a números
          if (!isNaN(elemento)) {
            return parseInt(elemento);
          } else {
            // Mantén las comillas para el código
            return elemento;
          }
        });

        console.log(arregloCod);
        const var2 = [
          {
            numtabla: arregloCod[arregloCod.length].codigo,
            datos: {
              1: arregloCod[0],
              3: arregloCod[4],
              4: arregloCod[1],
              6: arregloCod[5],
              7: arregloCod[2],
              8: arregloCod[3],
              9: arregloCod[6],
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
        "SELECT tablanormal.* FROM public.tablanormal, public.venta, public.users WHERE tablanormal.id_venta=venta.id and venta.id_cliente=users.id and users.cc =$1",
        [cccliente]
      );
      const { rows: rowsTablaRapida } = await pool.query(
        "SELECT tablarapida.* FROM public.tablarapida, public.venta, public.users WHERE tablarapida.id_venta=venta.id and venta.id_cliente=users.id and users.cc =$1",
        [cccliente]
      );
      let var1 = [],
        var2 = [];
      if (rowsTablaNormal.length > 0) {
        var1 = rowsTablaNormal.map((rowsTablaNormal) => ({
          numtabla: rowsTablaNormal.codigo,
          datos: {
            1: rowsTablaNormal.num1,
            2: rowsTablaNormal.num6,
            3: rowsTablaNormal.num11,
            4: rowsTablaNormal.num16,
            5: rowsTablaNormal.num21,
            6: rowsTablaNormal.num2,
            7: rowsTablaNormal.num7,
            8: rowsTablaNormal.num12,
            9: rowsTablaNormal.num17,
            10: rowsTablaNormal.num22,
            11: rowsTablaNormal.num3,
            12: rowsTablaNormal.num8,
            14: rowsTablaNormal.num18,
            15: rowsTablaNormal.num23,
            16: rowsTablaNormal.num4,
            17: rowsTablaNormal.num9,
            18: rowsTablaNormal.num14,
            19: rowsTablaNormal.num19,
            20: rowsTablaNormal.num24,
            21: rowsTablaNormal.num5,
            22: rowsTablaNormal.num10,
            23: rowsTablaNormal.num15,
            24: rowsTablaNormal.num20,
            25: rowsTablaNormal.num25,
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
        ok: true,
        data1: var1,
        data2: var2,
      });
    } catch (error) {
      res.status(500).json({ msg: error.msg });
    }
  },
  obtenerTablasVenta: async (req, res) => {
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
