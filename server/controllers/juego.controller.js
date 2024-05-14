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
      const { id, data } = req.body;
      const { rows } = await pool.query(
        "UPDATE public.juegos SET data=$1 WHERE id = $2 and estado='I';",
        [data, id]
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
      const { id } = req.body;
      const { rows } = await pool.query(
        "UPDATE public.juegos SET estado='F' WHERE id = $1 and estado='I';",
        [id]
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
        "SELECT * FROM tablanormal;"
      );
      const { rows: datosjuegos } = await pool.query(
        "SELECT * FROM juegos WHERE estado = 'I';"
      );
      const array = JSON.parse(datosjuegos[0].data);
      //const data = "[false,false,true,false,true,false,true,true,false,false,true,false,true,false,false,true,false,true,false,true,false,true,true,false,false,false,true,false,false,true,true,true,false,true,false,true,true,false,true,false,true,true,true,true,true,true,true,true,false,true,false,true,false,true,false,false,true,false,false,true,true,false,false,true,true,true,false,true,false,true,true,true,false,false,true]"
      //const array = JSON.parse(data);
      console.log(array);
      const numerosActivados = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i]) {
          numerosActivados.push(i + 1);
        }
      }
      //console.log(numerosActivados)
      let info = [];
      if (numerosActivados.length > 0) {
        const codigostablas18 = [];
        const codigostablas19 = [];
        const codigostablas20 = [];
        const codigostablas21 = [];
        const codigostablas22 = [];
        const codigostablas23 = [];
        const codigostablas24 = [];
        const codigostablas25 = [];
        for (const linea of rowstablas) {
          let contador = 1;
          for (const numero of numerosActivados) {
            for (let i = 1; i <= 25; i++) {
              const variable = linea[`num${i}`];
              if (variable === numero) {
                contador++; // Incrementa el contador si encuentra una coincidencia
                break; // Sale del bucle interno una vez que se encuentra una coincidencia
              }
            }
          }
          console.log(contador);
          if (contador === 25) {
            codigostablas25.push(linea.codigo);
          }
          else if (contador === 24) {
            codigostablas24.push(linea.codigo);
          }
          else if (contador === 23) {
            codigostablas23.push(linea.codigo);
          }
          else if (contador === 22) {
            codigostablas22.push(linea.codigo);
          }
          else if (contador === 21) {
            codigostablas21.push(linea.codigo);
          }
          else if (contador === 20) {
            codigostablas20.push(linea.codigo);
          }
          else if (contador === 19) {
            codigostablas19.push(linea.codigo);
          }
          else if (contador === 18) {
            codigostablas18.push(linea.codigo);
          }
        }
        const tempo18 =
        {
          numeral: 18,
          datos: codigostablas18
        }
          ;
        const tempo19 =
        {
          numeral: 19,
          datos: codigostablas19
        }
          ;
        const tempo20 =
        {
          numeral: 20,
          datos: codigostablas20
        }
          ;
        const tempo21 =
        {
          numeral: 21,
          datos: codigostablas21
        }
          ;
        const tempo22 =
        {
          numeral: 22,
          datos: codigostablas22
        }
          ;
        const tempo23 =
        {
          numeral: 23,
          datos: codigostablas23
        }
          ;
        const tempo24 =
        {
          numeral: 24,
          datos: codigostablas24
        }
          ;
        const tempo25 =
        {
          numeral: 25,
          datos: codigostablas25
        }
          ;
        info.push(tempo18);
        info.push(tempo19);
        info.push(tempo20);
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
  obtenerPosiblesLetras: async (req, res) => {
    try {
      const { rows: rowsletras } = await pool.query("SELECT * FROM descripcionnormal;");
      const letras = rowsletras[0].letras.split(",");

      const data = {
        A: [1, 2, 3, 4, 5, 6, 11, 16, 21, 22, 8, 18, 23, 24, 25],
        B: [1, 2, 3, 4, 5, 6, 8, 10, 11, 15, 16, 18, 20, 22, 24],
        C: [1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 20, 21, 25],
        D: [1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 20, 22, 23, 24],
        E: [1, 2, 3, 4, 5, 6, 8, 10, 11, 15, 16, 18, 20, 21, 23, 25],
        F: [1, 2, 3, 4, 5, 6, 8, 11, 16, 18, 21, 23],
        G: [1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 18, 20, 21, 23, 24, 25],
        H: [1, 2, 3, 4, 5, 8, 18, 21, 22, 23, 24, 25],
        I: [1, 5, 6, 10, 11, 12, 14, 15, 16, 20, 21, 25],
        J: [1, 5, 6, 10, 11, 12, 14, 15, 16, 21],
        K: [1, 2, 3, 4, 5, 8, 17, 19, 21, 25],
        L: [1, 2, 3, 4, 5, 10, 15, 20, 25],
        M: [1, 2, 3, 4, 5, 7, 17, 21, 22, 23, 24, 25],
        N: [1, 2, 3, 4, 5, 7, 19, 21, 22, 23, 24, 25],
        O: [1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 20, 21, 22, 23, 24, 25],
        P: [1, 2, 3, 4, 5, 6, 8, 11, 16, 18, 21, 22, 23],
        Q: [1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 19, 20, 21, 22, 23, 24, 25],
        R: [1, 2, 3, 4, 5, 6, 8, 11, 16, 18, 19, 21, 22, 23, 25],
        S: [1, 2, 3, 5, 6, 8, 10, 11, 15, 16, 18, 20, 21, 23, 24, 25],
        T: [1, 6, 11, 12, 14, 15, 16, 21],
        U: [1, 2, 3, 4, 5, 10, 15, 20, 25, 21, 22, 23, 24, 25],
        V: [1, 2, 8, 9, 15, 18, 19, 21, 22],
        W: [1, 2, 3, 4, 5, 9, 12, 19, 21, 22, 23, 24, 25],
        X: [1, 5, 7, 9, 17, 19, 21, 25],
        Y: [1, 7, 14, 15, 17, 21],
        Z: [1, 5, 6, 9, 10, 11, 16, 17, 20, 21, 25]
      };
      const arraysSeleccionados = letras.map(letra => data[letra]);
      console.log(arraysSeleccionados.length);
      const { rows: rowstablas } = await pool.query("SELECT * FROM tablanormal;");

      console.log(rowstablas.length);
      const valoresSeleccionados = [];

      for (let i = 0; i < arraysSeleccionados.length; i++) {
        const columnasSeleccionadas = arraysSeleccionados[i];
        const filaValores = []; // Arreglo para almacenar los valores de las columnas seleccionadas para esta fila
        for (let j = 0; j < rowstablas.length; j++) {
          const fila = rowstablas[j]; // Obtenemos la fila actual
          const valoresFila = []; // Objeto para almacenar los valores de las columnas seleccionadas para esta fila
          // Recorremos todas las propiedades (columnas) de la fila
          for (const columna in fila) {
            if (Object.hasOwnProperty.call(fila, columna)) {
              if (columnasSeleccionadas.includes(parseInt(columna.replace('num', '')))) { // Verificamos si la columna actual está en columnasSeleccionadas
                const valor = fila[columna]; // Obtenemos el valor de la columna actual
                valoresFila.push(valor); // Guardamos el valor en el objeto de valores de fila
              }
            }
          }
          valoresFila.push(rowstablas[j].codigo);
          filaValores.push(valoresFila); // Agregamos el objeto de valores de fila al arreglo de valores de fila
        }
        valoresSeleccionados.push(filaValores); // Agregamos el arreglo de valores de fila al arreglo principal de valores seleccionados
      }
      //console.log(valoresSeleccionados);

      const { rows: datosjuegos } = await pool.query(
        "SELECT * FROM juegos WHERE estado = 'I';"
      );
      const arrayjugados = JSON.parse(datosjuegos[0].data);
      //const datajugados = "[false,false,true,false,true,false,true,true,false,false,true,false,true,false,false,true,false,true,false,true,false,true,true,false,false,false,true,false,false,true,true,true,false,true,false,true,true,false,true,false,true,true,true,true,true,true,true,true,false,true,false,true,false,true,false,false,true,false,false,true,true,false,false,true,true,true,false,true,false,true,true,true,false,false,true]"
      //const arrayjugados = JSON.parse(datajugados);
      const numerosActivados = [];
      let totalCoincidencias = 0; // Contador para las coincidencias

      for (let i = 0; i < arrayjugados.length; i++) {
        if (arrayjugados[i]) {
          numerosActivados.push(i + 1); //NUMEROS QUE SE HAN JUGADO
        }
      }
      const guardardata = [];
      console.log(numerosActivados);

      for (let k = 0; k < valoresSeleccionados.length; k++) {
        const filadelarreglo = valoresSeleccionados[k]; //PARA EL GRUPO DE LA LETRA
        let cod = [];
        for (let h = 0; h < filadelarreglo.length; h++) {
          const arreglonumeros = filadelarreglo[h]; //EN ARREGLONUMEROS ESTAN LOS NUMEROS DE CADA FILA PERTINENTES
          // Comparar los números en arreglonumeros con los números en numerosActivados
          totalCoincidencias = 0;
          for (let j = 0; j < arreglonumeros.length; j++) {
            if (numerosActivados.includes(arreglonumeros[j])) {
              totalCoincidencias++; // Incrementar el contador de coincidencias
            }
          }
          if (totalCoincidencias >= 8) {
            cod.push(arreglonumeros[arreglonumeros.length - 1]);
          }
        }
        guardardata.push(cod);
      }
      console.log(guardardata);
      let varinfo = {};
      for (let f = 0; f < letras.length; f++) {
        varinfo[letras[f]] = { tablas: guardardata[f] };
      }
      return res.status(200).json({
        exists: true,
        data1: varinfo,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
};
