import { pool } from "../database.js";

export const descripcionController = {
  obtenerdescripciones: async (req, res) => {
    try {

      const { rows: rowsDescripcion1 } = await pool.query("SELECT * FROM descripcion WHERE tipo='juego1'");
      const { rows: rowsDescripcion2 } = await pool.query("SELECT * FROM descripcion WHERE tipo='juego2'");
      let var1 = {}, var2 = {};
      if (rowsDescripcion1.length > 0) {
        var1 =
        {
          contenido: rowsDescripcion1[0].contenido,
          premio1: rowsDescripcion1[0].premio1,
          premio2: rowsDescripcion1[0].premio2,
          premio3: rowsDescripcion1[0].premio3,
          premios: rowsDescripcion1[0].premios,
          fecha: rowsDescripcion1[0].fecha,
          hora_juego: rowsDescripcion1[0].hora_juego,
        }
      }
      if (rowsDescripcion2.length > 0) {
        var2 =
        {
          contenido: rowsDescripcion2[0].contenido,
          premio1: rowsDescripcion2[0].premio1,
          premio2: rowsDescripcion2[0].premio2,
          premio3: rowsDescripcion2[0].premio3,
          premios: rowsDescripcion2[0].premios,
          fecha: rowsDescripcion2[0].fecha,
          hora_juego: rowsDescripcion2[0].hora_juego,
        }
      }
      return res.status(200).json({
        exists: true,
        data1: var1,
        data2: var2,
      });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },

  insertardescripciones: async (req, res) => {
    //const { data1, data2 } = req.body;
    try {
      const rowsDescripcion1 = await pool.query("UPDATE public.descripcion SET contenido=$1, premio1=$2, premio2=$3, premio3=$4, premios=$5, fecha=CURRENT_TIMESTAMP, hora_juego=$6 WHERE tipo='juego1'"
      );
      //const { rows : rowsDescripcion2 } = await pool.query("UPDATE public.descripcion SET contenido=$1, premio1=$2, premio2=$3, premio3=$4, premios=$5, fecha=$6, hora_juego=$7 WHERE tipo='juego2'",
      //[...data2]);
      if (rowsDescripcion1) {
        return res.status(200).json({ ok: true });
      }

      return res.status(404).json({ ok: false });
    } catch (error) {
      res.json({ msg: error.msg });
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
