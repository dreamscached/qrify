import { Hono } from "hono";
import * as route from "./route";

const app = new Hono();
route.about.register(app);
route.quick.register(app);
route.fullpath.register(app);
route.go.register(app);

export default app;
