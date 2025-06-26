import { Hono } from "hono";

const links: Record<string, string> = {
	github: "https://github.com/dreamscached/qrify"
};

export function register(app: Hono) {
	app.get("/go/:keyword", (c) => {
		const keyword = c.req.param("keyword");
		const link = links[keyword];
		if (link == null) return c.notFound();
		return c.redirect(link);
	});
}
