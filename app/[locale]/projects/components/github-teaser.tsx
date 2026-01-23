import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ViewAnimation } from "@/providers/view-animation";
import { Github } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const GitHubTeaser = async () => {
    const t = await getTranslations("Projects.github");

    return (
        <Section className="bg-muted/50">
            <ViewAnimation
                initial={{ opacity: 0, translateY: 20 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                className="flex flex-col items-center justify-center gap-6 px-4 py-8 text-center sm:px-8 sm:py-16"
            >
                <div className="flex size-16 items-center justify-center rounded-2xl border bg-muted/50 shadow-sm">
                    <Github className="size-8" />
                </div>
                <div className="flex max-w-xl flex-col gap-2">
                    <h2 className="font-bold text-2xl tracking-tight sm:text-3xl">
                        {t("title")}
                    </h2>
                    <p className="text-muted-foreground sm:text-lg">
                        {t("description")}
                    </p>
                </div>
                <Button asChild size="lg" className="rounded-full">
                    <a
                        href="https://github.com/mohamedelbachir"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                    >
                        <Github className="size-4" />
                        {t("button")}
                    </a>
                </Button>
            </ViewAnimation>
        </Section>
    );
};
