import express from "express";
import constructorMethod from "./routes";
const app = express();
const PORT = process.env.PORT || 5000;

constructorMethod(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));