import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import db from "./db/db";

import { userRoutes } from "./controllers/user.controller";
import { jobRoutes } from "./controllers/job.controller";

db();

const app = new Elysia()
  .use(
    cors({
      origin: ["http://localhost:5173", "http://192.168.56.1:5173"],
      allowedHeaders: ["Content-Type"],
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  )
  .group("/api/v1", (app) => app.use(userRoutes))
  .group("/api/v1", (app) => app.use(jobRoutes))
  .listen(3000);

console.log("Server on port: ", app.server?.port);
