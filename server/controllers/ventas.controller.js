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
  obtenertotales: async (req, res) => {
    try {
      const { id_vendedor } = req.body;
      const { rows: rowsprimera } = await pool.query("SELECT sum(cantidad_normal) AS total_normal, sum(cantidad_rapida) AS total_rapida, sum(cantidad_normal+cantidad_rapida) AS total_hojas FROM public.venta WHERE id_vendedor=$1 GROUP BY id_vendedor",
        [id_vendedor]);
      const { rows: rowssegunda } = await pool.query("SELECT sum(cantidad_normal) AS total_normal, sum(cantidad_rapida) AS total_rapida, sum(cantidad_normal+cantidad_rapida) AS total_hojas FROM public.venta");
      let var1 = {};
      if (rowsprimera.length > 0 && rowssegunda.length > 0) {
        var1 = {
          total_normal_id: rowsprimera[0].total_normal,
          total_rapida_id: rowsprimera[0].total_rapida,
          total_hojas_id: rowsprimera[0].total_hojas,
          total_normal: rowssegunda[0].total_normal,
          total_rapida: rowssegunda[0].total_rapida,
          total_hojas: rowssegunda[0].total_hojas,
        };
      }
      return res.status(200).json({
        exists: true,
        data: var1,
      });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
};
