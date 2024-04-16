const express = require("express");
const app = express();

// app.use("/", (req, res) => {
//   res.send("Server is running");
// });
require("dotenv").config();

app.use(express.json());

const userRouter = require("./routes/user.router");

app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => console.log("Server started on PORT 5000"));
