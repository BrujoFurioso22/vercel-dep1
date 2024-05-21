import CryptoJS from "crypto-js";
import crypto from "crypto";
import { pool } from "../database.js";
import { exists } from "fs";

// Función para descifrar un texto cifrado
function decryptText(cipherText, secretKey) {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
const secretKey = crypto.randomBytes(32).toString("hex");

function encryptText(text, secretKey) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

export const userController = {
  getVerificationUser: async (req, res) => {
    try {
      // console.log(req);
      const { cedulacelular, password } = req.body;
      const { rows } = await pool.query(
        "SELECT password, rol, name, intentos, estado FROM users WHERE cc = $1 and estado = false",
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
        let intentos;
        if (rows[0].password === password) {
          validPassword = true;
          intentos = 0;
          const { rows } = await pool.query(
            "UPDATE public.users SET intentos=$1 WHERE cc = $2;",
            [intentos, cedulacelular]
          );
        }
        else {
          intentos = rows[0].intentos;
          if (intentos < 3) {
            intentos = intentos + 1;
            const { rows } = await pool.query(
              "UPDATE public.users SET intentos=$1 WHERE cc = $2;",
              [intentos, cedulacelular]
            );
          } else {
            const { rows } = await pool.query(
              "UPDATE public.users SET estado = true WHERE cc = $1;",
              [cedulacelular]
            );
          }
        }
        if (validPassword) {
          return res
            .status(200)
            .json({ exists: true, rol: rows[0].rol, nombre: rows[0].name, intentos: intentos, estado: rows[0].estado });
        }
      }
      return res.status(404).json({ exists: false, intentos: intentos, estado: rows[0].estado });
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
        "SELECT * FROM users WHERE cc = $1",
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
  getVendedores: async (req, res) => {
    try {
      // console.log(req);
      const { cedulacelular } = req.body;
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE rol=23;",
      );
      let data = [];
      if (rows.length > 0) {
        for (let i = 0; i < rows.length; i++) {
          const info = rows[i].password;
          const partes = info.split('=');
          const encriptado = `${partes[0]}=`;
          const secretKey = `${partes[1]}`;
          const contra = decryptText(encriptado, secretKey);
          rows[i].password = contra;

          data.push({
            name: rows[i].name,
            cc: rows[i].cc,
            password: rows[i].password,
            rol: rows[i].rol,
            alias: rows[i].alias,
            estado: rows[i].estado,
            intentos: rows[i].intentos,
          }
          )
        }
        return res.status(200).json({
          exists: true,
          datos: data
        });
      }
      return res.status(404).json({ exists: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
  actualizarDatos: async (req, res) => {
    try {
      // console.log(req);
      const { cedulacelular, nombre, alias, passwd } = req.body;
      const encriptado = encryptText(passwd, secretKey);
      const password = `${encriptado}${secretKey}`;

      const { rows } = await pool.query(
        "UPDATE public.users SET name=$1, password=$2, alias=$3 WHERE cc=$4;",
        [nombre, password, alias, cedulacelular]
      );
      if (rows) {
        return res.status(200).json({ ok: true })
      } else {
        return res.status(404).json({ ok: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
  actualizarEstado: async (req, res) => {
    try {
      // console.log(req);
      const { cedulacelular } = req.body;

      const { rows: rowsconsulta } = await pool.query(
        "SELECT estado FROM public.users WHERE cc=$1;",
        [cedulacelular]
      );
      let estadonuevo = false;
      if (rowsconsulta[0].estado === true) {
        estadonuevo = false
      } else {
        estadonuevo = true;
      }
      const { rows: rowsactualizarestado } = await pool.query(
        "UPDATE public.users SET estado=$1, intentos=0 WHERE cc=$2;",
        [estadonuevo, cedulacelular]
      );
      if (rowsactualizarestado) {
        return res.status(200).json({ ok: true })
      } else {
        return res.status(404).json({ ok: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },
  CrearVendedor: async (req, res) => {
    try {
      // console.log(req);
      const { nombrecliente, cccliente, alias, password } = req.body;

      const {rows:rowscliente} = await pool.query("SELECT * FROM users WHERE cc = $1;",
        [cccliente]
      );

      if (rowscliente.length > 0) {
        return res.status(400).json({ok:false});
      } else {
        const encriptado = encryptText(password, secretKey);
        const final = `${encriptado}${secretKey}`;

        const quse = await pool.query(
          "INSERT INTO users(name, cc, password, alias) VALUES ($1, $2, $3, $4);",
          [nombrecliente, cccliente, final, alias]
        );
        return res.status(200).json({ok:true});
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  },
};