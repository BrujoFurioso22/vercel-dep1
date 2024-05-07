import CryptoJS from 'crypto-js';
import { pool } from "../database.js";

// Función para descifrar un texto cifrado
function decryptText(cipherText, secretKey) {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export const userController = {
  getVerificationUser: async (req, res) => {
    try {
      // console.log(req);
      const { cedulacelular, password } = req.body;
      const { rows } = await pool.query(
        "SELECT password, rol, name FROM users WHERE cc = '$1'",
        [cedulacelular]
      );

      if (rows.length > 0) {
        let validPassword = false;
        const info = rows[0].password;
        const partes = info.split('=');
        const encriptado = `${partes[0]}=`;
        const secretKey = `${partes[1]}`;
        const contra = decryptText(encriptado, secretKey);
        rows[0].password = contra;
        if (rows.password === password) {
          validPassword = true;
        }
        if (validPassword) {
          return res
            .status(200)
            .json({ exists: true, rol: rows[0].rol, nombre: rows[0].name });
        }
      }
      return res.status(404).json({ exists: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
  getIdUser: async (req, res) => {
    try {
      // console.log(req);
      const { cedulacelular } = req.body;
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE cc = '$1'",
        [cedulacelular]
      );

      if (rows.length > 0) {
        return res
          .status(200)
          .json({ exists: true, id: rows[0].id, nombre: rows[0].name });
      }
      return res.status(404).json({ exists: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
  getCliente: async (req, res) => {
    try {
      // console.log(req);
      const { cedulacelular } = req.body;
      const { rows } = await pool.query(
        "SELECT name,cc,password FROM users WHERE cc = $1 and rol=0;",
        [cedulacelular]
      );

      if (rows.length > 0) {
        const info = rows[0].password;
        const partes = info.split('=');
        const encriptado = `${partes[0]}=`;
        const secretKey = `${partes[1]}`;
        const contra = decryptText(encriptado, secretKey);
        rows[0].password = contra;
        return res.status(200).json({
          exists: true,
          nombre: rows[0].name,
          cc: rows[0].cc,
          password: rows[0].password
        });
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