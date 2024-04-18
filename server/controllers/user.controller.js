const postgre = require("../database");
const userController = {
  getAll: async (req, res) => {
    try {
      const { rows } = await postgre.query("select * from users;");
      res.json({ msg: "OK", data: rows });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  getVerificationUser: async (req, res) => {
    try {
      const { cedulacelular, password } = req.body;
      const { rows } = await postgre.query(
        `SELECT password, rol FROM users WHERE cc = '${cedulacelular}'`
      );

      if (rows.length > 0) {
        let validPassword = false;
        if (rows[0].password === password) {
          validPassword = true;
        }
        if (validPassword) {
          return res.status(200).json({ exists: true, rol: rows[0].rol });
        }
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

module.exports = userController;
