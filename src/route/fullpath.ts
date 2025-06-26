import { Hono } from "hono";
import { cache } from "hono/cache";
import { zValidator } from "@hono/zod-validator";

import * as QR from "qrcode";
import z from "zod/v4";

import { CACHE_CONTROL_QR, CACHE_NAME } from "../common/constants";
import { QuerySchema } from "../common/schema/param";

const ParamSchema = z.object({
	text: z.string().max(1000)
});

export function register(app: Hono) {
	app.get(
		"/qr/:text{.+}",
		zValidator("param", ParamSchema),
		zValidator("query", QuerySchema),
		cache({
			cacheName: CACHE_NAME,
			cacheControl: CACHE_CONTROL_QR
		}),
		async (c) => {
			const text = c.req.valid("param").text;
			const param = c.req.valid("query");

			const qr = await QR.toString(text, {
				type: "utf8",
				errorCorrectionLevel: param.error_correction_level
			});

			return c.text(qr + "\n", 200);
		}
	);
}
