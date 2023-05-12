import { z } from "zod";

const configSchema = z.object({
  DATABASE_URL: z.string().url(),
});

const result = configSchema.safeParse(process.env);

if (!result.success) {
  console.error(result.error);
  throw new Error("Invalid configuration");
}

export const config = result.data;
