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
        "SELECT * FROM juegos;"
      );

      // Convierte la cadena en un array de booleanos
      const array = JSON.parse(cadenaArray);

      // Array para almacenar los números activados
      const numerosActivados = [];

      // Recorre el array y guarda los números activados
      for (let i = 0; i < array.length; i++) {
        if (array[i]) {
          numerosActivados.push(i + 1); // Suma 1 al índice para obtener el número correspondiente
        }
      }

      // Verifica si se encontraron números activados
      if (numerosActivados.length > 0) {
        
        console.log("Los números activados son:", numerosActivados);
      } else {
        console.log("No se encontraron números activados.");
      }
      return res.status(404).json({ exists: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
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
