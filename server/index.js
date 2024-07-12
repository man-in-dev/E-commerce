import express from "express";
import dotenv from "dotenv";
import colors from "colors"
import cors from "cors";

//importing routes
import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import brandRoutes from "./routes/brand.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";

import connectDb from "./db/index.js";

// configure dotenv
dotenv.config();

//initialise express app
const app = express();

//connect to database
connectDb()

//middlewares
app.use(express.json());
app.use(cors());

//routing
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/brand", brandRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT}`.yellow.bold)
})