import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(1, "Name is required").max(180),
    email: z.string().email("Invalid email address").max(180),
    message: z.string().min(1, "Message is required").max(1000),
    type: z.enum([
        "general",
        "work",
        "contract",
        "advisory",
        "agency",
        "event",
    ]),
    contentType: z.string().min(1, "Content type is required").max(180),
    lang: z.string().min(1, "Language is required").max(180),
});
