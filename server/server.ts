import express, { Express } from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index";
// import { init_posts_db } from "./init/initialUserPostsSeed";
// import { init_users_db } from "./init/initialSeed";

const app: Express = express();

const PORT: string | undefined = process.env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(routes);

app.get("/", (req, res) => {
  // init_users_db();
  // init_posts_db();
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});
