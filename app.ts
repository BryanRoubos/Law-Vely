import express from "express";
import legislationRoutes from "./routes/legislationRoutes";
import cors from "cors";
import authRoutes from "./routes/authRoutes"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/legislationSummaries", legislationRoutes);
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(
    `Server is running on port  http://localhost:${PORT}/api/legislationSummaries`
  );
});

export default app;
