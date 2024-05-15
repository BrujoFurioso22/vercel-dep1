import { pool } from "../database.js";

export const ventasController = {
  obtenerventas: async (req, res) => {
    try {
      const { idvendedor } = req.body;
      const { rows: rowsVentas } = await pool.query("SELECT venta.id, venta.id_cliente, users.name, users.cc, venta.fecha, venta.cantidad_normal, venta.cantidad_rapida, venta.cantidad_dinero, venta.numero_transaccion FROM public.venta, public.users WHERE users.id = venta.id_cliente and venta.id_vendedor = $1",
        [idvendedor]
      );
      let var1 = {}
      if (rowsVentas.length > 0) {
        var1 = rowsVentas.map(dato => [
          {
            id: dato.id,
            idcliente: dato.id_cliente,
            nombre: dato.name,
            cc: dato.cc,
            fecha: dato.fecha,
            cantidadnormal: dato.cantidad_normal,
            cantidadrapida: dato.cantidad_rapida,
            cantidadinero: dato.cantidad_dinero,
            numerotransaccion: dato.numero_transaccion
          },
        ]);
        return res.status(200).json({
          exists: true,
          data: var1,
        });
      }
      return res.status(404).json({ exists: false })
    } catch (error) {
      res.status(500).json({ msg: error.msg });
    }
  },
  obtenerventasporcliente: async (req, res) => {
    try {
      const { idvendedor } = req.body;
      const { rows: rowsPrimera } = await pool.query("SELECT venta.id_cliente, sum(cantidad_normal) AS total_normal, sum(cantidad_rapida) AS total_rapida, sum(cantidad_dinero) AS total_dinero FROM venta WHERE id_vendedor = $1 GROUP BY id_cliente;",
        [idvendedor]
      );
      if (rowsPrimera.length > 0) {
        let var1 = {}
        const resultados = [];
        for (let i = 0; i < rowsPrimera.length; i++) {
          const dato = rowsPrimera[i];
          const { rows: rowsSegunda } = await pool.query("SELECT users.name, users.cc FROM users WHERE id=$1;", [dato.id_cliente]);

          if (rowsSegunda.length > 0) {
            resultados.push({
              idcliente: dato.id_cliente,
              nombre: rowsSegunda[0].name,
              cc: rowsSegunda[0].cc,
              cantidadnormal: dato.total_normal,
              cantidadrapida: dato.total_rapida,
              cantidadinero: dato.total_dinero
            });
          }
        }
        var1 = resultados;
        return res.status(200).json({
          exists: true,
          data: var1,
        });
      }
      return res.status(404).json({ exists: false })
    } catch (error) {
      res.status(500).json({ msg: error.msg });
    }
  },
  obtenertotales: async (req, res) => {
    try {
      const { id_vendedor } = req.body;
      const { rows: rowsprimera } = await pool.query("SELECT sum(cantidad_normal) AS total_normal, sum(cantidad_rapida) AS total_rapida, sum(cantidad_normal+cantidad_rapida) AS total_juegos FROM public.venta WHERE id_vendedor=$1 GROUP BY id_vendedor",
        [id_vendedor]);
      const { rows: rowssegunda } = await pool.query("SELECT sum(cantidad_normal) AS total_normal, sum(cantidad_rapida) AS total_rapida, sum(cantidad_normal+cantidad_rapida) AS total_juegos FROM public.venta");
      let var1 = {};
      if (rowsprimera.length > 0 && rowssegunda.length > 0) {
        var1 = {
          juegos_normal_vendedor: rowsprimera[0].total_normal,
          juegos_rapida_vendedor: rowsprimera[0].total_rapida,
          juegos_total_vendedor: rowsprimera[0].total_juegos,
          total_normal: rowssegunda[0].total_normal,
          total_rapida: rowssegunda[0].total_rapida,
          total_juegos: rowssegunda[0].total_juegos,
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
