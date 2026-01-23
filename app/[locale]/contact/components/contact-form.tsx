"use client";

import { contact } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { contactSchema } from "@/schema/contact";
import { useTranslations } from "next-intl";

export const ContactForm = ({ locale = "en" }: { locale: "fr" | "en" }) => {
    const t = useTranslations("Contact.form");
    const searchParams = useSearchParams();

    const typeOptions = [
        {
            value: "general",
            label: t("options.general.label"),
            subtitle: t("options.general.subtitle"),
        },
        {
            value: "work",
            label: t("options.work.label"),
            subtitle: t("options.work.subtitle"),
        },
        {
            value: "advisory",
            label: t("options.advisory.label"),
            subtitle: t("options.advisory.subtitle"),
        },
        {
            value: "agency",
            label: t("options.agency.label"),
            subtitle: t("options.agency.subtitle"),
        },
        {
            value: "event",
            label: t("options.event.label"),
            subtitle: t("options.event.subtitle"),
        },
    ];

    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema as never),
        defaultValues: {
            name: "",
            email: "",
            message: "",
            lang: locale,
            contentType: "general",
            type:
                (searchParams.get("type") as z.infer<
                    typeof contactSchema
                >["type"]) ?? "general",
        },
    });

    const onSubmit = async (values: z.infer<typeof contactSchema>) => {
        try {
            const response = await contact({
                ...values,
                contentType:
                    typeOptions.find((o) => o.value === values.type)
                        ?.subtitle || "General",
            });

            if ("error" in response) {
                throw new Error(response.error);
            }

            form.reset();
            toast.success(response.message);
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "An error occurred",
            );
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("name")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("namePlaceholder")}
                                    className="bg-background"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("email")}</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder={t("emailPlaceholder")}
                                    className="bg-background"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("message")}</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={t("messagePlaceholder")}
                                    className="bg-background"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => {
                        const selectedType = typeOptions.find(
                            (option) => option.value === field.value,
                        );

                        return (
                            <FormItem>
                                <FormLabel>{t("type")}</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue asChild>
                                                {selectedType ? (
                                                    <div className="flex items-center gap-1 truncate">
                                                        <p>
                                                            {selectedType.label}
                                                        </p>
                                                        <p className="truncate hidden sm:block text-muted-foreground text-xs">
                                                            {
                                                                selectedType.subtitle
                                                            }
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p>
                                                        {t("typePlaceholder")}
                                                    </p>
                                                )}
                                            </SelectValue>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-w-sm sm:max-w-none">
                                        {typeOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                <div className="text-left">
                                                    <div>{option.label}</div>
                                                    <div className="text-muted-foreground max-w-sm sm:max-w-none text-xs">
                                                        {option.subtitle}
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full"
                >
                    {form.formState.isSubmitting ? (
                        <>
                            {t("submitting")}
                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        </>
                    ) : (
                        <>
                            {t("submit")}
                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </>
                    )}
                </Button>
            </form>
        </Form>
    );
};
