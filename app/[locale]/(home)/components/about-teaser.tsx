import { Prose } from "@/components/prose";
//import { Prose } from "@/components/prose";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ViewAnimation } from "@/providers/view-animation";
import { ArrowRight, User } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import NumberFlow from "@number-flow/react";

export const AboutTeaser = async () => {
    const t = await getTranslations("Sections.About");

    return (
        <Section className="grid bg-muted items-center justify-between gap-8 border-t py-12 md:grid-cols-2 md:gap-12 md:py-24">
            <ViewAnimation
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="px-4 sm:px-8 md:pr-0"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="size-5" />
                        <span className="text-sm font-medium uppercase tracking-wider">
                            {t("label")}
                        </span>
                    </div>
                    <h2 className="font-bold text-2xl tracking-tight sm:text-3xl">
                        {t("title")}
                    </h2>
                    <Prose className="text-base sm:text-lg text-muted-foreground">
                        <p>{t("description")}</p>
                    </Prose>
                    <div className="pt-2">
                        <Button asChild size="lg" className="group">
                            <Link href="/about">
                                {t("more")}
                                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </ViewAnimation>

            {/* Decorative or additional content could go here, for now keeping it clean or maybe a large subtle icon/graphic */}
            <ViewAnimation
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                delay={0.2}
                className="hidden md:flex justify-center items-center px-4 sm:px-8"
            >
                <div className="relative size-64 rounded-full bg-gradient-to-tr from-primary/10 to-transparent p-12">
                    <div className="absolute inset-0 rounded-full border border-dashed border-primary/20 animate-[spin_10s_linear_infinite]" />
                    <div className="flex flex-col items-center justify-center text-center gap-2 h-full text-muted-foreground">
                        <span className="font-bold text-4xl text-primary">
                            <NumberFlow value={4} />+
                        </span>
                        <span className="text-sm">{t("experience")}</span>
                    </div>
                </div>
            </ViewAnimation>
        </Section>
    );
};
