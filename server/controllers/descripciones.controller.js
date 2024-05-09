import { pool } from "../database.js";

export const descripcionController = {
  obtenerdescripcionesnormal: async (req, res) => {
    try {
      const { rows } = await pool.query("SELECT * FROM descripcionnormal");
      let var1 = {};
      if (rows.length > 0) {
        const arreglopremios = rows[0].premios.split(",");
        const arregloletras = rows[0].letras.split(",");
        var1 = {
          contenido: rows[0].contenido,
          premio1: rows[0].premio1,
          premio2: rows[0].premio2,
          premio3: rows[0].premio3,
          premios: arreglopremios,
          fecha_hora: rows[0].fecha_hora,
          cantidad_letras: rows[0].cantidad_letras,
          letras: arregloletras,
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
  obtenerdescripcionesrapida: async (req, res) => { 
    try {
      const { rows } = await pool.query("SELECT * FROM descripcionrapida");
      let var1 = {};
      if (rows.length > 0) {
        var1 = {
          contenido: rows[0].contenido,
          premio1: rows[0].premio,
          fecha_hora: rows[0].fecha_hora,
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
  insertardescripcionesnormal: async (req, res) => {
    
    try {
      const {
        contenido,
        premio1,
        premio2,
        premio3,
        premios,
        fecha_hora,
        cantidad_letras,
        letras,
      } = req.body;
      const rows = await pool.query(
        "UPDATE public.descripcionnormal SET contenido=$1, premio1=$2, premio2=$3, premio3=$4, premios=$5, fecha_hora=$6, cantidad_letras=$7, letras=$8 WHERE id=7",
        [
          contenido,
          premio1,
          premio2,
          premio3,
          premios,
          fecha_hora,
          cantidad_letras,
          letras,
        ]
      );
      if (rows) {
        return res.status(200).json({ ok: true });
      }
      return res.status(404).json({ ok: false });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  insertardescripcionesrapida: async (req, res) => {
    //const { data1, data2 } = req.body;
    try {
    const { contenido, premio1, fecha_hora } = req.body;

      const rows = await pool.query(
        "UPDATE public.descripcionrapida SET contenido=$1, premio=$2, fecha_hora=$3 WHERE id=4",
        [contenido, premio1, fecha_hora]
      );
      if (rows) {
        return res.status(200).json({ ok: true });
      }
      return res.status(404).json({ ok: false });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
};
