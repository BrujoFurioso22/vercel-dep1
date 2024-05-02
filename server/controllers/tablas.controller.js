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

export const tablasController = {
  insertarVenta: async (req, res) => {
    //////HACER LO QUE FALTA DE GENERAR EL USUARIO
    try {
      // console.log(req);
      const {
        idvendedor,
        idcliente,
        cantidadnormal,
        cantidadrapida,
        cantidaddinero,
        numerotransaccion,
      } = req.body;
      // console.log(idvendedor);
      const tempor = await pool.query(
        `INSERT INTO venta(id_vendedor, id_cliente, fecha, cantidad_normal, cantidad_rapida, cantidad_dinero, numero_transaccion) values(${idvendedor}, ${idcliente}, CURRENT_TIMESTAMP, ${cantidadnormal}, ${cantidadrapida}, ${cantidaddinero}, '${numerotransaccion}');`
      );

      console.log("afwdwa   ", tempor);

      const { rowsventa } = await pool.query(
        `SELECT id FROM venta WHERE id_vendedor=${idvendedor}, id_cliente=${idcliente}, cantidad_normal=${cantidadnormal}, cantidad_rapida=${cantidadrapida}, cantidad_dinero=${cantidaddinero}, numero_transaccion='${numerotransaccion}';`
      );

      console.log("Ya tengo el id al menos")
      if (rowsventa.length > 0) {
        let idventa = rowsventa[0];
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

            for (let i = 0; i < cantidad * 4; i++) {
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

              console.log(numerosAsignados);

              do {
                const codigonormal = 'N' + generarCodigoHexadecimal();
                const { rowshexanormal } = await pool.query(
                  `SELECT * FROM tablanormal WHERE codigo = '${codigonormal}'`
                );

                if (rowshexanormal.length === 0) {
                  // Insertar datos en la tabla
                  const respeustadealginaverga  = await pool.query(
                    `INSERT INTO tablanormal(id_venta,codigo,num1,num2,num3,num4,num5,num6,num7,num8,num9,num10,num11,num12,num14,num15,num16,num17,num18,num19,num20,num21,num22,num23,num24,num25) values (${idventa}, '${codigonormal}', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24);`,
                    numerosAsignados
                  );
                  console.log("respuesta",respeustadealginaverga);
                }
              } while (rowshexanormal.length > 0);
            }
            return res.status(200).json({ ok: true });
          } catch (error) {
            res.status(500).json({ error: error.message });
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

            for (let i = 0; i < cantidad * 6; i++) {
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
              do {
                const codigorapido = 'R' + generarCodigoHexadecimal();
                const { rowshexanormalr } = await pool.query(
                  `SELECT * FROM tablarapida WHERE codigo = '${codigonormal}';`
                );

                if (rowshexanormalr.length === 0) {
                  // Insertar datos en la tabla
                  await pool.query(
                    `INSERT INTO tablarapida(id_venta,codigo,num1,num3,num4,num6,num7,num8,num9) values (${idventa},'${codigorapido}',$1, $2, $3, $4, $5, $6, $7);`,
                    numerosAsignados
                  );
                }
              } while (rowshexanormalr.length > 0);
            }
            return res.status(200).json({ ok: true });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        }
      }
      return res.status(200).json({ exists: false });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  obtenerDatosDeTabla: async (req, res) => {
    try {
      const { codigotabla } = req.body;
      const { rows } = await pool.query(
        `SELECT * FROM tablanormal WHERE codigo = '${codigotabla}'`
      );
      const { rows1 } = await pool.query(
        `SELECT * FROM tablarapida WHERE codigo = '${codigotabla}'`
      );
      if (rows.length > 0) {
        const var1 = [
          {
            numtabla: rows[0].codigo,
            datos: {
              1: rows[0].num1,
              2: rows[0].num2,
              3: rows[0].num3,
              4: rows[0].num4,
              5: rows[0].num5,
              6: rows[0].num6,
              7: rows[0].num7,
              8: rows[0].num8,
              9: rows[0].num9,
              10: rows[0].num10,
              11: rows[0].num11,
              12: rows[0].num12,
              14: rows[0].num14,
              15: rows[0].num15,
              16: rows[0].num16,
              17: rows[0].num17,
              18: rows[0].num18,
              19: rows[0].num19,
              20: rows[0].num20,
              21: rows[0].num21,
              22: rows[0].num22,
              23: rows[0].num23,
              24: rows[0].num24,
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
              3: rows1[0].num3,
              4: rows1[0].num4,
              6: rows1[0].num6,
              7: rows1[0].num7,
              8: rows1[0].num8,
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
};
