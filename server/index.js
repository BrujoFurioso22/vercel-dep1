const express = require("express");
const app = express();
const corsMiddleware = require("./middleware/cors")

require("dotenv").config();

app.use(corsMiddleware());
// app.disable('x-powered-by');

app.use(express.json());

const userRouter = require("./routes/user.router");

app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => console.log("Server started on PORT 5000"));
