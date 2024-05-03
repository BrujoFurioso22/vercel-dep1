import { pool } from "../database.js";

export const ventasController = {
  obtenerventas: async (req, res) => {
    try {
      const { idvendedor } = req.body;
      const { rows: rowsVentas } = await pool.query("SELECT venta.id, venta.id_cliente, users.name, venta.fecha, venta.cantidad_normal, venta.cantidad_rapida, venta.cantidad_dinero, venta.numero_transaccion FROM public.venta, public.users WHERE users.id = venta.id_cliente and venta.id_vendedor = $1",
      [idvendedor]
      );
      let var1 = {}
      if (rowsVentas.length > 0) {
        var1 = rowsVentas.map(dato => [
          {
            id: dato.id,
            idcliente: dato.id_cliente,
            nombre: dato.name,
            fecha: dato.fecha,
            cantidadnormal: dato.cantidad_normal,
            cantidadrapida: dato.cantidad_rapida,
            cantidadinero: dato.cantidad_dinero,
            numerotransaccion: dato.numero_transaccion
          },
        ]);
        return res.status(200).json({exists:true,
          data: var1,
        });
      }
      return res.status(404).json( {exists:false})
    } catch (error) {
      res.status(500).json({ msg: error.msg });
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
