import express from "express"
import cors from "cors"
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser"
import webhookRoutes from "./routes/webhook.route.js";
const app = express()

app.use(cors({ origin: true, credentials: true }));
app.use("/api",webhookRoutes)
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import authRoute from "./routes/auth.route.js"
import productRoute from "./routes/product.route.js"
import ShippingDetailsRoute from "./routes/shipping.route.js";
import orderRoute from "./routes/order.route.js"
import paymentRoute from "./routes/payment.route.js"
import adminRoute from "./routes/admin.route.js"
//routes declaration
app.use("/api/auth",authRoute)
app.use("/api/product",productRoute)
app.use("/api/shipping",ShippingDetailsRoute)
app.use("/api/order",orderRoute)
app.use("/api/payment",paymentRoute)
app.use("/api/admin",adminRoute)
app.use(errorHandler);


export { app }