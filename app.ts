import express from "express";
import legislationRoutes from "./routes/legislationRoutes";


const app = express();

app.use(express.json());

app.use("/api/legislationSummaries", legislationRoutes);



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
