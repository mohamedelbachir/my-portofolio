"use server";

import { env } from "@/lib/env";
import { parseError } from "@/lib/utils";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import type { z } from "zod";
import type { contactSchema } from "@/schema/contact";
import nodemailer from "nodemailer";

export const contact = async (
    data: z.infer<typeof contactSchema>,
): Promise<
    | {
          message: string;
      }
    | {
          error: string;
      }
> => {
    //const head = await headers();

    try {
        // const ip = head.get("x-forwarded-for");
        // const redis = Redis.fromEnv();
        // const ratelimit = new Ratelimit({
        //     redis,
        //     // rate limit to 1 request every day
        //     limiter: Ratelimit.slidingWindow(1, "1d"),
        // });

        // const { success } = await ratelimit.limit(`ratelimit_${ip}`);

        // if (!success) {
        //     throw new Error(
        //         "You have reached your request limit. Please try again later.",
        //     );
        // }

        const transporter = nodemailer.createTransport({
            host: env.SMTP_HOST,
            port: Number(env.SMTP_PORT),
            secure: Number(env.SMTP_PORT) === 465, // true for 465, false for other ports
            auth: {
                user: env.SMTP_USER,
                pass: env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: env.SMTP_USER,
            to: env.RESEND_TO || "mail@gmail.com",
            subject: `New ${data.type} message from ${data.name}`,
            replyTo: data.email,
            text: `Name: ${data.name}\nEmail: ${data.email}\nType: ${data.type}\n\n Info:${data.contentType}\n\nMessage:\n${data.message} \n\nLanguage: ${data.lang}`,
        });

        revalidatePath("/contact");

        return { message: "Thanks! Your message has been sent." };
    } catch (error) {
        const errorMessage = parseError(error);

        return { error: errorMessage };
    }
};
