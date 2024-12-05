import userRouter from "./users.js";
import { error } from "console";

const constructorMethod = (app) => {
  app.get("/", (req, res) => {
    return res.status(200).json({status: "Server Healthy"});
  });
  app.use("/users", userRouter);
  app.use("*", (req, res) => {
    return res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
