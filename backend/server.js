require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require("morgan")
const cors = require('cors');
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/db")
const authRoutes = require('./routes/auth')


const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"*",
    credentials:true,
}));
app.use("/app/auth",authRoutes);

connectToDb(process.env.MONGODB_URL)

app.listen(process.env.PORT,()=>console.log("Server started at: ",process.env.PORT))


