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
      const { data } = req.body;
      const { rows: rowsinsert } = await pool.query(
        "INSERT INTO public.juegos(fecha_hora, data, estado) VALUES (CURRENT_TIMESTAMP AT TIME ZONE 'America/Guayaquil', $1, 'I');",
        [data]
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
      //onst array = JSON.parse(data);
      console.log(array);
      const numerosActivados = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i]) {
          numerosActivados.push(i + 1);
        }
      }
      console.log(numerosActivados)
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
        A: [1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 20, 21, 25],
        B: [1, 2, 3, 4, 6, 10, 11, 12, 13, 14, 16, 20, 21, 22, 23, 24],
        C: [1, 2, 3, 4, 5, 6, 11, 16, 21, 22, 23, 24, 25],
        D: [1, 2, 3, 4, 6, 10, 11, 15, 16, 20, 21, 22, 23, 24],
        E: [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16, 21, 22, 23, 24, 25],
        F: [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16, 21],
        G: [1, 2, 3, 4, 5, 6, 11, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25],
        H: [1, 5, 6, 10, 11, 12, 13, 14, 15, 16, 20, 21, 25],
        I: [1, 2, 3, 4, 5, 8, 13, 18, 21, 22, 23, 24, 25],
        J: [1, 2, 3, 4, 5, 8, 13, 18, 21, 22, 23],
        K: [1, 5, 6, 9, 11, 12, 13, 16, 19, 21, 25],
        L: [1, 6, 11, 16, 21, 22, 23, 24, 25],
        M: [1, 5, 6, 7, 9, 10, 11, 13, 15, 16, 20, 21, 25],
        N: [1, 5, 6, 7, 10, 11, 13, 15, 16, 19, 20, 21, 25],
        O: [1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 20, 21, 22, 23, 24, 25],
        P: [1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 21],
        Q: [1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 19, 20, 21, 22, 23, 24, 25],
        R: [1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 19, 21, 25],
        S: [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25],
        T: [1, 2, 3, 4, 5, 8, 13, 18, 23],
        U: [1, 5, 6, 10, 11, 15, 16, 20, 21, 22, 23, 24, 25],
        V: [1, 5, 6, 10, 12, 14, 17, 19, 23],
        W: [1, 5, 6, 8, 10, 11, 13, 15, 16, 17, 19, 20, 21, 25],
        X: [1, 5, 7, 9, 13, 17, 19, 21, 25],
        Y: [1, 5, 7, 9, 13, 18, 23],
        Z: [1, 2, 3, 4, 5, 9, 13, 17, 21, 22, 23, 24, 25]
      };
      const arraysSeleccionados = letras.map(letra => data[letra]);
      console.log(arraysSeleccionados.length);
      const { rows: rowstablas } = await pool.query("SELECT * FROM tablanormal;");
        
      console.log(rowstablas.length);
      for(let i=0;i<arraysSeleccionados.length;i++){
        for(let j=0;j<rowstablas.length;j++){
          
        }
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
};
