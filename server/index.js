const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = require("./middleware/cors");
// const corsMiddleware = require("./middleware/cors")

require("dotenv").config();

app.use(cors(corsOptions));
// app.disable('x-powered-by');

app.use(express.json());

const userRouter = require("./routes/user.router");

app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => console.log("Server started on PORT 5000"));
