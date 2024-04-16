const express = require("express");
const app = express();

require("dotenv").config();

// Permitir peticiones de cualquier origen
app.use(cors());

// O configurar CORS para solo permitir un origen específico
app.use(cors({
    origin: 'https://vercel-dep1-client.vercel.app'
}));

app.use(express.json());

const userRouter = require("./routes/user.router");

app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => console.log("Server started on PORT 5000"));
