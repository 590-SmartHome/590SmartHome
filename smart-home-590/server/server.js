import express from "express";
import cors from "cors"
import * as db from "./config/mongoCollections.js";
import configRoutes from "./routes/index.js";


const app = express();
const PORT = 4004;

app.use(cors())
app.use(express.json());

configRoutes(app);

app.listen(PORT, () => {
    
    console.log(`Server running on port ${PORT}`)
});