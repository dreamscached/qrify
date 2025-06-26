import { z } from "zod/v4";

export const QuerySchema = z.object({
	error_correction_level: z
		.enum(["low", "medium", "quartile", "high"])
		.optional()
		.default("medium")
});
