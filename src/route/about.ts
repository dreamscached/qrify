import { Hono } from "hono";

import text from "../common/about.txt?raw";

export function register(app: Hono) {
	app.get("/", (c) => {
		return c.text(text);
	});
}
