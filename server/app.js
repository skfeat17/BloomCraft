import express from "express"
import cors from "cors"
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser"
const app = express()


app.use(cors({ origin: true, credentials: true }));
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import authRoute from "./routes/auth.route.js"

//routes declaration
app.use("/api/auth",authRoute)

app.use(errorHandler);


export { app }