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
        const tempo18 = [
          {
            numeral: 18,
            datos: codigostablas18
          },
        ];
        const tempo19 = [
          {
            numeral: 19,
            datos: codigostablas19
          },
        ];
        const tempo20 = [
          {
            numeral: 20,
            datos: codigostablas20
          },
        ];
        const tempo21 = [
          {
            numeral: 21,
            datos: codigostablas21
          },
        ];
        const tempo22 = [
          {
            numeral: 22,
            datos: codigostablas22
          },
        ];
        const tempo23 = [
          {
            numeral: 23,
            datos: codigostablas23
          },
        ];
        const tempo24 = [
          {
            numeral: 24,
            datos: codigostablas24
          },
        ];
        const tempo25 = [
          {
            numeral: 25,
            datos: codigostablas25
          },
        ];
        info.push(tempo18);
        info.push(tempo19);
        info.push(tempo20);
        info.push(tempo21);
        info.push(tempo22);
        info.push(tempo23);
        info.push(tempo24);
        info.push(tempo25);
  
        return res.status(200).json({
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
  }
  // create: async(req, res) => {
  //     try {
  //         const { name, price } = req.body

  //         const sql = 'INSERT INTO books(name, price) VALUES($1, $2) RETURNING *'

  //         const { rows } = await postgre.query(sql, [name, price])

  //         res.json({msg: "OK", data: rows[0]})

  //     } catch (error) {
  //         res.json({msg: error.msg})
  //     }
  // },
  // updateById: async(req, res) => {
  //     try {
  //         const { name, price } = req.body

  //         const sql = 'UPDATE books set name = $1, price = $2 where book_id = $3 RETURNING *'

  //         const { rows } = await postgre.query(sql, [name, price, req.params.id])

  //         res.json({msg: "OK", data: rows[0]})

  //     } catch (error) {
  //         res.json({msg: error.msg})
  //     }
  // },
  // deleteById: async(req, res) => {
  //     try {
  //         const sql = 'DELETE FROM books where book_id = $1 RETURNING *'

  //         const { rows } = await postgre.query(sql, [req.params.id])

  //         if (rows[0]) {
  //             return res.json({msg: "OK", data: rows[0]})
  //         }

  //         return res.status(404).json({msg: "not found"})

  //     } catch (error) {
  //         res.json({msg: error.msg})
  //     }
  // }
};
