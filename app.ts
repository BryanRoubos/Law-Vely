import express from "express";
import legislationRoutes from "./routes/legislationRoutes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/legislationSummaries", legislationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(
    `Server is running on port  http://localhost:${PORT}/api/legislationSummaries`
  );
});

export default app;
