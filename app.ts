import express from "express";
import legislationRoutes from "./routes/legislationRoutes";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://your-netlify-domain.netlify.app",
];

const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/legislationSummaries", legislationRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(
    `Server is running on port  http://localhost:${PORT}/api/legislationSummaries`
  );
});

export default app;
