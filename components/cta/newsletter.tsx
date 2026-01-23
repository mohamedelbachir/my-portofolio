"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useForm as useFormspree } from "@formspree/react";
import { useTranslations } from "next-intl";

const newsletterSchema = z.object({
    email: z.string().email(),
});

export const Newsletter = () => {
    const t = useTranslations("CTA.newsletter");
    const [state, handleSubmit] = useFormspree("mojeezbl");
    const form = useForm<z.infer<typeof newsletterSchema>>({
        resolver: zodResolver(newsletterSchema as never),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof newsletterSchema>) => {
        const result = await handleSubmit(values);
    };
    useEffect(() => {
        if (state.succeeded) {
            form.reset();
            toast.success(t("success"));
        }
    }, [state.succeeded]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="space-y-0">
                            <FormLabel className="sr-only">Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("placeholder")}
                                    {...field}
                                    className="h-auto rounded-full bg-background px-8 py-4 pr-16"
                                    disabled={state.submitting}
                                />
                            </FormControl>
                            <FormDescription className="py-2">
                                {t("promise")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="absolute top-[3px] right-[3px] aspect-square h-auto rounded-full"
                    disabled={state.submitting || !form.formState.isValid}
                >
                    {state.submitting ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <ArrowRightIcon size={16} />
                    )}
                </Button>
            </form>
        </Form>
    );
};
