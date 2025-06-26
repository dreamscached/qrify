import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import * as QR from "qrcode";
import z from "zod/v4";

import { QuerySchema } from "../common/schema/param";

const ParamSchema = z.object({
	text: z
		.string()
		.max(100)
		.transform((it) => replaceUnderscores(it))
});

export function register(app: Hono) {
	app.get(
		"/:text",
		zValidator("param", ParamSchema),
		zValidator("query", QuerySchema),
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

function replaceUnderscores(param: string): string {
	return param.replaceAll("__", "_").replace("_", " ");
}
