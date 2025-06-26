import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import * as QR from "qrcode";

import { QuerySchema } from "../common/schema/param";
import z from "zod/v4";

const ParamSchema = z.object({
	text: z.string().max(1000)
});

export function register(app: Hono) {
	app.get(
		"/qr/:text{.+}",
		zValidator("param", ParamSchema),
		zValidator("query", QuerySchema),
		async (c) => {
			const text = c.req.valid("param").text;
			const param = c.req.valid("query");

			const qr = await QR.toString(text, {
				type: "utf8",
				errorCorrectionLevel: param.error_correction_level
			});

			return c.text(qr + "\n", 200, {
				"Cache-Control": "public, max-age=31536000, immutable"
			});
		}
	);
}
