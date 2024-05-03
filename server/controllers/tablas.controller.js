import { pool } from "../database.js";

function generarCodigoHexadecimal() {
  const caracteresHexadecimales = "0123456789ABCDEF";
  let codigoHexadecimal = "";
  for (let i = 0; i < 8; i++) {
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

export const tablasController = {
  insertarVenta: async (req, res) => {
    //////HACER LO QUE FALTA DE GENERAR EL USUARIO
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
          const quse = await pool.query(
            "INSERT INTO users(name, cc, password) VALUES ($1, $2, $3);",
            [nombrecliente, cccliente, contraseniaGenerada]
          );
        } else {
          idcliente = rowscliente[0].id;
          isInserted = true;
        }
      } while (!isInserted);

      let cantN = cantidadnormal === null ? 0 : cantidadnormal;
      let cantR = cantidadrapida === null ? 0 : cantidadrapida;

      const tempor = await pool.query(
        "INSERT INTO venta(id_vendedor, id_cliente, fecha, cantidad_normal, cantidad_rapida, cantidad_dinero, numero_transaccion) VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5, $6);",
        [
          idvendedor,
          idcliente,
          cantN,
          cantR,
          cantidaddinero,
          numerotransaccion,
        ]
      );

      const { rows } = await pool.query(
        "SELECT id FROM venta WHERE id_vendedor = $1 AND id_cliente = $2 AND cantidad_normal = $3 AND cantidad_rapida = $4 AND cantidad_dinero = $5 AND numero_transaccion = $6;",
        [
          idvendedor,
          idcliente,
          cantN,
          cantR,
          cantidaddinero,
          numerotransaccion,
        ]
      );
      // console.log(rows);
      if (rows.length > 0) {
        let idventa = rows[0].id;
        if (cantN > 0) {
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

            for (let i = 0; i < cantN * 4; i++) {
              // Generar números aleatorios para diferentes rangos
              const numerosRango1_20 = generarNumerosAleatorios(1, 20, 5);
              const numerosRango21_40 = generarNumerosAleatorios(21, 40, 5);
              const numerosRango41_60 = generarNumerosAleatorios(41, 60, 5);
              const numerosRango61_80 = generarNumerosAleatorios(61, 80, 5);
              const numerosRango81_99 = generarNumerosAleatorios(81, 99, 5);

              // Combinar todos los números generados
              const todosLosNumeros = [
                ...numerosRango1_20,
                ...numerosRango21_40,
                ...numerosRango41_60,
                ...numerosRango61_80,
                ...numerosRango81_99,
                // Combinar otros rangos aquí...
              ];

              // Asignar números a las variables n1, n2, ..., n25
              const numerosAsignados = todosLosNumeros.slice(0, 24);

              // console.log(numerosAsignados);

              let isInserted = false;
              do {
                const codigonormal = "N" + generarCodigoHexadecimal();
                const { rows } = await pool.query(
                  `SELECT * FROM tablanormal WHERE codigo = $1`,
                  [codigonormal]
                );

                if (rows.length === 0) {
                  // Insertar datos en la tabla
                  await pool.query(
                    `INSERT INTO tablanormal(id_venta, codigo, num1, num2, num3, num4, num5, num6, num7, num8, num9, num10, num11, num12, num14, num15, num16, num17, num18, num19, num20, num21, num22, num23, num24, num25)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)`,
                    [idventa, codigonormal, ...numerosAsignados]
                  );
                  isInserted = true; // Inserción exitosa, salir del bucle
                }
              } while (!isInserted); // Bucle mientras no se haya insertado correctamente
            }
            // return res.status(200).json({ ok: true });
          } catch (error) {
            console.log("Error1");
            // res.status(500).json({ error: error.message });
          }
        }

        if (cantR > 0) {
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

            for (let i = 0; i < cantR * 6; i++) {
              // Generar números aleatorios para diferentes rangos
              const numerosRango1_49 = generarNumerosAleatorios(1, 49, 3);
              const numerosRango50_60 = generarNumerosAleatorios(50, 60, 1);
              const numerosRango61_99 = generarNumerosAleatorios(61, 99, 3);

              // Combinar todos los números generados
              const todosLosNumeros = [
                ...numerosRango1_49,
                ...numerosRango50_60,
                ...numerosRango61_99,
                // Combinar otros rangos aquí...
              ];

              // Asignar números a las variables n1, n2, ..., n25
              const numerosAsignados = todosLosNumeros.slice(0, 7);

              console.log(numerosAsignados);
              let isInserted = false;
              do {
                const codigorapido = "R" + generarCodigoHexadecimal();
                const { rows } = await pool.query(
                  `SELECT * FROM tablarapida WHERE codigo = $1`,
                  [codigorapido]
                );

                if (rows.length === 0) {
                  // Insertar datos en la tabla
                  await pool.query(
                    `INSERT INTO tablarapida(id_venta,codigo,num1,num3,num4,num6,num7,num8,num9) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                    [idventa, codigorapido, ...numerosAsignados]
                  );
                  isInserted = true; // Inserción exitosa, salir del bucle
                }
              } while (!isInserted); // Bucle mientras no se haya insertado correctamente
            }
            return res.status(200).json({ ok: true });
          } catch (error) {
            console.log("Error");
            res.status(500).json({ error: error.message });
          }
        }
      }
      return res.status(400).json({ exists: false });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  obtenerDatosDeTabla: async (req, res) => {
    try {
      const { codigotabla } = req.body;
      const { rows } = await pool.query(
        `SELECT * FROM tablanormal WHERE codigo = '$1'`,
        [codigotabla]
      );
      const { rows1 } = await pool.query(
        `SELECT * FROM tablarapida WHERE codigo = '$1'`,
        [codigotabla]
      );
      if (rows.length > 0) {
        const var1 = [
          {
            numtabla: rows[0].codigo,
            datos: {
              1: rows[0].num1,
              2: rows[0].num6,
              3: rows[0].num11,
              4: rows[0].num16,
              5: rows[0].num21,
              6: rows[0].num2,
              7: rows[0].num7,
              8: rows[0].num12,
              9: rows[0].num17,
              10: rows[0].num22,
              11: rows[0].num3,
              12: rows[0].num8,
              14: rows[0].num18,
              15: rows[0].num23,
              16: rows[0].num4,
              17: rows[0].num9,
              18: rows[0].num14,
              19: rows[0].num19,
              20: rows[0].num24,
              21: rows[0].num5,
              22: rows[0].num10,
              23: rows[0].num15,
              24: rows[0].num20,
              25: rows[0].num25,
            },
          },
        ];
        return res.status(200).json({
          data: var1,
        });
      } else if (rows1.length > 0) {
        const var2 = [
          {
            numtabla: rows1[0].codigo,
            datos: {
              1: rows1[0].num1,
              3: rows1[0].num7,
              4: rows1[0].num3,
              6: rows1[0].num8,
              7: rows1[0].num4,
              8: rows1[0].num6,
              9: rows1[0].num9,
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
        `SELECT tablanormal.* FROM public.tablanormal, public.venta, public.users WHERE tablanormal.id_venta=venta.id and venta.id_cliente=users.id and users.cc = '$1'`,
        [cccliente]
      );
      const { rows: rowsTablaRapida } = await pool.query(
        `SELECT tablarapida.* FROM public.tablarapida, public.venta, public.users WHERE tablarapida.id_venta=venta.id and venta.id_cliente=users.id and users.cc = '$1'`,
        [cccliente]
      );
      let var1 = {},
        var2 = {};
      if (rowsTablaNormal.length > 0) {
        var1 = rowsTablaNormal.map((rowsTablaNormal) => [
          {
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
          },
        ]);
      }
      if (rowsTablaRapida.length > 0) {
        var2 = rowsTablaRapida.map((rowsTablaRapida) => [
          {
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
          },
        ]);
      }
      return res.status(200).json({
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
        `SELECT * FROM public.tablanormal WHERE tablanormal.id_venta = $1`,
        [idventa]
      );
      const { rows: rowsTablaRapida } = await pool.query(
        `SELECT * FROM public.tablarapida WHERE tablarapida.id_venta = $1`,
        [idventa]
      );
      let var1 = {},
        var2 = {};
      if (rowsTablaNormal.length > 0) {
        var1 = rowsTablaNormal.map((rowsTablaNormal) => [
          {
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
          },
        ]);
      }
      if (rowsTablaRapida.length > 0) {
        var2 = rowsTablaRapida.map((rowsTablaRapida) => [
          {
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
          },
        ]);
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
