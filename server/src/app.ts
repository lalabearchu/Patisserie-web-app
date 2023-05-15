import "express-async-errors";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import ExpressMongoSanitize from "express-mongo-sanitize";
import { connectDB } from "./db/connectDB";
import { authRoutes } from "./routes/auth-routes";
import { userRoutes } from "./routes/user-routes";
import { productRoutes } from "./routes/product-routes";
import { orderRoutes } from "./routes/order-routes";
import { notFound } from "./middleware/not-found";
import { errorHandler } from "./middleware/error-handler";

// Config
dotenv.config();
const app = express();
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
// app.use(helmet());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://checkout.stripe.com",
          "https://js.stripe.com/v3",
          "https://js.stripe.com/v3/fingerprinted/js/trusted-types-checker-239db17d86d6320632b024ca9e43ba9c.js",
        ],
        connectSrc: ["'self'", "https://checkout.stripe.com"],
        frameSrc: [
          "'self'",
          "https://checkout.stripe.com",
          "https://js.stripe.com/",
        ],
        imgSrc: [
          "'self'",
          "https://*.stripe.com",
          "https://images.unsplash.com/",
        ],
      },
    },
  })
);
app.use(cors());
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);

app.use(express.static(path.join(__dirname, "../../client/dist")));
app.get("*", (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"))
);

app.use(notFound);
app.use(errorHandler);

// Server Setup
const port = process.env.PORT || 4242;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL!);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
