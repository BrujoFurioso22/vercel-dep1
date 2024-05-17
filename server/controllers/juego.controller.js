import { pool } from "../database.js";

export const juegoController = {
  buscarStatusJuegos: async (req, res) => {
    try {
      const { rows: rowsID } = await pool.query(
        "SELECT * FROM public.juegos WHERE estado='I';"
      );
      if (rowsID.length > 0) {
        return res.status(200).json({ exists: true, data: rowsID });
      } else {
        return res.status(200).json({ exists: false });
      }
      return res.status(404).json({ exists: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
  buscarHistorialJuegos: async (req, res) => {
    try {
      const { rows: rowsID } = await pool.query(
        "SELECT * FROM public.juegos;"
      );
      if (rowsID.length > 0) {
        return res.status(200).json({ exists: true, data: rowsID });
      } else {
        return res.status(400).json({ exists: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
  nuevoJuego: async (req, res) => {
    try {
      const { data, tipojuego, historial } = req.body;
      const { rows: rowsinsert } = await pool.query(
        "INSERT INTO public.juegos(fecha_hora, data, estado, tipo_juego, historial) VALUES (CURRENT_TIMESTAMP AT TIME ZONE 'America/Guayaquil', $1, 'I', $2, $3);",
        [data, tipojuego, historial]
      );
      const { rows: rowsID } = await pool.query(
        "SELECT * FROM public.juegos WHERE estado='I';"
      );
      if (rowsID.length > 0) {
        return res.status(200).json({ exists: true, data: rowsID[0] });
      }
      return res.status(404).json({ exists: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
  actualizarData: async (req, res) => {
    try {
      // console.log(req);
      const { id, data, historial } = req.body;
      const { rows } = await pool.query(
        "UPDATE public.juegos SET data=$1 ,historial=$2 WHERE id = $3 and estado='I';",
        [data, historial, id]
      );
      if (rows) {
        return res.status(200).json({ ok: true });
      }
      return res.status(404).json({ ok: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
  finalizarJuego: async (req, res) => {
    try {
      // console.log(req);
      const { id, ganadas, } = req.body;
      const { rows } = await pool.query(
        "UPDATE public.juegos SET estado='F', tablas_ganadas=$1, fecha_finalizacion = CURRENT_TIMESTAMP AT TIME ZONE 'America/Guayaquil' WHERE id = $1 and estado='I';",
        [ganadas, id]
      );
      if (rows) {
        return res.status(200).json({ ok: true });
      }
      return res.status(404).json({ ok: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
  obtenerPosiblesCompletos: async (req, res) => {
    try {
      const { rows: rowstablas } = await pool.query(
        "SELECT tablas_normal FROM venta;"
      );

      let cadena = ""
      for (let l = 0; l < rowstablas.length; l++) {
        if (l === 0) {
          cadena = rowstablas[l].tablas_normal;
        } else {
          cadena = cadena + "," + rowstablas[l].tablas_normal;
        }
      }
      const arregloTodo = cadena.split(/\[|\]/).map(item => item.trim()).filter(item => item !== ',' && item !== ' ');
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
      let info = [];
      const { rows: datajogo } = await pool.query(
        "SELECT historial FROM juegos WHERE estado = 'I' AND tipo_juego = 0;"
      );
      if (datajogo.length > 0) {
        const codigostablas21 = [];
        const codigostablas22 = [];
        const codigostablas23 = [];
        const codigostablas24 = [];
        const codigostablas25 = [];
        const pasadas = [];
        for (const subarreglo of FnuevoArreglo) {
          let contador = 1;
          const subarregloDeEnteros = subarreglo.map(Number);
          const historial = datajogo[0].historial.split(",");
          const historialEnteros = historial.map(numero => parseInt(numero.trim(), 10));
          let contabilizarpasadas = 0;
          for (let k = 0; k < historialEnteros.length; k++) {
            if (contador < 25) {
              for (let j = 0; j < subarregloDeEnteros.length; j++) {
                if (historialEnteros[k] === subarregloDeEnteros[j]) {
                  contador++;
                }
              }
            } else {
              contabilizarpasadas++;
            }
          }
          if (contabilizarpasadas > 0) {
            pasadas.push("[" + subarreglo[subarreglo.length - 2] + "," + contabilizarpasadas + "]");
          }
          if (contador === 25) {
            codigostablas25.push(subarreglo[subarreglo.length - 2]);
          } else if (contador === 24) {
            codigostablas24.push(subarreglo[subarreglo.length - 2]);
          } else if (contador === 23) {
            codigostablas23.push(subarreglo[subarreglo.length - 2]);
          } else if (contador === 22) {
            codigostablas22.push(subarreglo[subarreglo.length - 2]);
          } else if (contador === 21) {
            codigostablas21.push(subarreglo[subarreglo.length - 2]);
          }
        }
        if (pasadas.length > 0) {
          const cadenaUnida = pasadas.join(" ");
          const { rows: updatepasadas } = await pool.query(
            "UPDATE public.pasadas SET pasadas_normal = $1 WHERE id = 1;",
            [cadenaUnida]
          );
        } else {
          const vacio = "";
          const { rows: updatepasadas } = await pool.query(
            "UPDATE public.pasadas SET pasadas_normal = $1 WHERE id = 1;",
            [vacio]
          );
        }
        const tempo21 = {
          numeral: 21,
          datos: codigostablas21,
        };
        const tempo22 = {
          numeral: 22,
          datos: codigostablas22,
        };
        const tempo23 = {
          numeral: 23,
          datos: codigostablas23,
        };
        const tempo24 = {
          numeral: 24,
          datos: codigostablas24,
        };
        const tempo25 = {
          numeral: "GANADORAS",
          datos: codigostablas25,
        };
        info.push(tempo21);
        info.push(tempo22);
        info.push(tempo23);
        info.push(tempo24);
        info.push(tempo25);

        return res.status(200).json({
          exists: true,
          data1: info,
        });
      } else {
        console.log("No se encontraron números activados.");
        return res.status(404).json({ exists: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
  obtenerPosiblesRapidas: async (req, res) => {
    try {
      const { rows: rowstablas } = await pool.query(
        "SELECT tablas_rapida FROM venta;"
      );

      let cadena = ""
      for (let l = 0; l < rowstablas.length; l++) {
        if (l === 0) {
          cadena = rowstablas[l].tablas_rapida;
        } else {
          cadena = cadena + "," + rowstablas[l].tablas_rapida;
        }
      }
      const arregloTodo = cadena.split(/\[|\]/).map(item => item.trim()).filter(item => item !== ',' && item !== ' ');
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
      let info = [];
      const { rows: datajogo } = await pool.query(
        "SELECT historial FROM juegos WHERE estado = 'I' AND tipo_juego = 1;"
      );
      if (datajogo.length > 0) {
        const codigostablas5 = [];
        const codigostablas6 = [];
        const codigostablas7 = [];
        const pasadas = [];
        for (const subarreglo of FnuevoArreglo) {
          let contador = 1;
          const subarregloDeEnteros = subarreglo.map(Number);
          const historial = datajogo[0].historial.split(",");
          const historialEnteros = historial.map(numero => parseInt(numero.trim(), 10));
          let contabilizarpasadas = 0;
          for (let k = 0; k < historialEnteros.length; k++) {
            if (contador < 25) {
              for (let j = 0; j < subarregloDeEnteros.length; j++) {
                if (historialEnteros[k] === subarregloDeEnteros[j]) {
                  contador++;
                }
              }
            } else {
              contabilizarpasadas++;
            }
          }
          if (contabilizarpasadas > 0) {
            pasadas.push("[" + subarreglo[subarreglo.length - 2] + "," + contabilizarpasadas + "]");
          }
          if (contador === 7) {
            codigostablas7.push(subarreglo[subarreglo.length - 2]);
          } else if (contador === 6) {
            codigostablas6.push(subarreglo[subarreglo.length - 2]);
          } else if (contador === 5) {
            codigostablas5.push(subarreglo[subarreglo.length - 2]);
          }
        }
        if (pasadas.length > 0) {
          const cadenaUnida = pasadas.join(" ");
          const { rows: updatepasadas } = await pool.query(
            "UPDATE public.pasadas SET pasadas_rapida = $1 WHERE id = 1;",
            [cadenaUnida]
          );
        } else {
          const vacio = "";
          const { rows: updatepasadas } = await pool.query(
            "UPDATE public.pasadas SET pasadas_rapida = $1 WHERE id = 1;",
            [vacio]
          );
        }
        const tempo1 = {
          numeral: 5,
          datos: codigostablas5,
        };
        const tempo2 = {
          numeral: 6,
          datos: codigostablas6,
        };
        const tempo3 = {
          numeral: "GANADORAS",
          datos: codigostablas7,
        };
        info.push(tempo1);
        info.push(tempo2);
        info.push(tempo3);

        return res.status(200).json({
          exists: true,
          data1: info,
        });
      } else {
        console.log("No se encontraron números activados.");
        return res.status(404).json({ exists: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
  obtenerPosiblesLetras: async (req, res) => {
    try {
      const { rows: rowsletras } = await pool.query(
        "SELECT * FROM descripcionnormal;"
      );
      const letras = rowsletras[0].letras.split(",");

      const data = {
        A: [1, 2, 3, 4, 5, 6, 8, 11, 15, 17, 20, 21, 22, 23, 24],
        B: [1, 2, 3, 4, 5, 6, 8, 10, 11, 14, 15, 17, 19, 21, 23],
        C: [1, 2, 3, 4, 5, 6, 10, 11, 14, 15, 19, 20, 24],
        D: [1, 2, 3, 4, 5, 6, 10, 11, 14, 15, 19, 21, 22, 23],
        E: [1, 2, 3, 4, 5, 6, 8, 10, 11, 14, 15, 17, 19, 20, 22, 24],
        F: [1, 2, 3, 4, 5, 6, 8, 11, 15, 17, 20, 22],
        G: [1, 2, 3, 4, 5, 6, 10, 11, 14, 15, 17, 19, 20, 22, 23, 24],
        H: [1, 2, 3, 4, 5, 8, 17, 20, 21, 22, 23, 24],
        I: [1, 5, 6, 10, 11, 12, 13, 14, 15, 19, 20, 24],
        J: [1, 5, 6, 10, 11, 12, 13, 14, 15, 20],
        K: [1, 2, 3, 4, 5, 8, 16, 18, 20, 24],
        L: [1, 2, 3, 4, 5, 10, 14, 19, 24],
        M: [1, 2, 3, 4, 5, 7, 16, 20, 21, 22, 23, 24],
        N: [1, 2, 3, 4, 5, 7, 18, 20, 21, 22, 23, 24],
        O: [1, 2, 3, 4, 5, 6, 10, 11, 14, 15, 19, 20, 21, 22, 23, 24],
        P: [1, 2, 3, 4, 5, 6, 8, 11, 15, 17, 20, 21, 22],
        Q: [1, 2, 3, 4, 5, 6, 10, 11, 14, 15, 18, 19, 20, 21, 22, 23, 24],
        R: [1, 2, 3, 4, 5, 6, 8, 11, 16, 17, 18, 20, 21, 22, 24],
        S: [1, 2, 3, 5, 6, 8, 10, 11, 14, 15, 17, 19, 20, 22, 23, 24],
        T: [1, 6, 11, 12, 13, 14, 15, 20],
        U: [1, 2, 3, 4, 5, 10, 14, 19, 20, 21, 22, 23, 24],
        V: [1, 2, 8, 9, 14, 17, 18, 20, 21],
        W: [1, 2, 3, 4, 5, 9, 12, 18, 20, 21, 22, 23, 24],
        X: [1, 5, 7, 9, 16, 18, 20, 24],
        Y: [1, 7, 13, 14, 16, 20],
        Z: [1, 5, 6, 9, 10, 11, 15, 16, 19, 20, 24],
      };
      const arraysSeleccionados = letras.map((letra) => data[letra]);
      //console.log(arraysSeleccionados);
      const { rows: rowstablas } = await pool.query(
        "SELECT tablas_normal FROM venta;"
      );
      let cadena = ""
      for (let l = 0; l < rowstablas.length; l++) {
        if (l === 0) {
          cadena = rowstablas[l].tablas_normal;
        } else {
          cadena = cadena + "," + rowstablas[l].tablas_normal;
        }
      }
      const arregloTodo = cadena.split(/\[|\]/).map(item => item.trim()).filter(item => item !== ',' && item !== ' ');
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
      const { rows: datosjuegos } = await pool.query(
        "SELECT * FROM juegos WHERE estado = 'I';"
      );
      const arrayjugados = JSON.parse(datosjuegos[0].data);
      const numerosActivados = [];
      for (let i = 0; i < arrayjugados.length; i++) {
        if (arrayjugados[i]) {
          numerosActivados.push(i + 1);
        }
      }
      // console.log("Aqui empiezo");
      const arregloCompleto = [];
      for (let i = 0; i < arraysSeleccionados.length; i++) {
        const posicionesletra = arraysSeleccionados[i];
        const arregloletra = [];
        arregloletra.push(letras[i]);
        for (let j = 0; j < FnuevoArreglo.length; j++) {
          let subarreglo = FnuevoArreglo[j];
          const pasar = [];
          const valores = posicionesletra.map(posicion => subarreglo[posicion - 1]);
          const arregloNumerico = valores.map(numero => parseInt(numero));
          pasar.push(subarreglo[subarreglo.length - 2]);

          let contador = 0;
          for (let z = 0; z < numerosActivados.length; z++) {
            if (arregloNumerico.includes(numerosActivados[z])) {
              contador++;
            }
          }
          pasar.push(contador);
          arregloletra.push(pasar);
        }
        arregloCompleto.push(arregloletra);
      }
      //ASIGNAR VALORES PARA EL JSON
      const varinfo = [];
      const ganadas = [];
      for (let i = 0; i < arregloCompleto.length; i++) {
        const arregloleta = arregloCompleto[i];
        const mediano = [];
        const medianog = [];
        const letrado = [];
        mediano.push(arregloleta[0]);
        medianog.push(arregloleta[0])
        for (let j = 1; j < arregloleta.length; j++) { // Empezamos en 1 para evitar el primer elemento 'C'          
          const valor = arregloleta[j][1]; // Accedemos al segundo elemento de cada subarreglo
          if (valor === arraysSeleccionados[i].length) {
            medianog.push(arregloleta[j][0]);
          } else if (valor > 8) {
            letrado.push(arregloleta[j][0]);
          }
        }
        mediano.push(letrado);
        varinfo.push(mediano);
        ganadas.push(medianog);
      }
      return res.status(200).json({
        exists: true,
        data1: varinfo,
        ganadas: ganadas
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
};
