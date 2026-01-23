import { Prose } from "@/components/prose";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { projects, skills } from "@/lib/data";
import { ViewAnimation } from "@/providers/view-animation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Balancer from "react-wrap-balancer";
import { getTranslations, getLocale } from "next-intl/server";
import { Icon } from "@iconify/react";

export const FeaturedProjects = async () => {
    const t = await getTranslations("Sections.SelectedWork");
    const tProjects = await getTranslations("Projects");
    const locale = (await getLocale()) as "en" | "fr";
    const featured = projects.slice(0, 2);

    return (
        <Section className="flex flex-col border-t">
            <div className="flex items-center justify-between px-4 py-8 sm:px-8">
                <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-2xl tracking-tight">
                        {t("title")}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        {t("subtitle")}
                    </p>
                </div>
                <Button variant="ghost" asChild className="group">
                    <Link href="/projects">
                        {t("viewAll")}
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
            <div className="grid md:grid-cols-2 border-t divide-y md:divide-y-0 md:divide-x">
                {featured.map((app, index) => (
                    <Link
                        href={app.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        key={index}
                        className={cn(
                            "group flex flex-col gap-8 px-4 pt-8 transition-colors hover:bg-muted/50 sm:px-8",
                        )}
                    >
                        <ViewAnimation
                            initial={{ opacity: 0, translateY: 8 }}
                            whileInView={{ opacity: 1, translateY: 0 }}
                            delay={index * 0.1}
                            className="flex flex-col gap-4 h-full"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                    <small className="text-muted-foreground font-medium uppercase tracking-wider text-[10px]">
                                        {tProjects(
                                            `categories.${app.category}`,
                                        )}
                                    </small>
                                    <h3 className="font-bold text-xl">
                                        {app.title}
                                    </h3>
                                </div>
                                <Prose className="prose-sm">
                                    <p className="line-clamp-2 text-muted-foreground leading-normal">
                                        <Balancer>
                                            {app.description[locale]}
                                        </Balancer>
                                    </p>
                                </Prose>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {app.tags.map((tag) => {
                                        const skill = skills.find(
                                            (s) => s.name === tag,
                                        );
                                        return (
                                            <div
                                                key={tag}
                                                className="flex items-center gap-1.5 rounded-md border bg-muted/30 px-2 py-1 transition-colors"
                                            >
                                                {skill && (
                                                    <Icon
                                                        icon={skill.icon}
                                                        className="size-3.5"
                                                    />
                                                )}
                                                <span className="text-[9px] font-medium uppercase tracking-tight">
                                                    {tag}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="relative aspect-video w-full mt-auto overflow-hidden rounded-t-lg border border-b-0 shadow-sm transition-all group-hover:shadow-md">
                                <Image
                                    src={app.image}
                                    alt={app.title}
                                    fill
                                    className="object-cover transition-transform duration-500 "
                                />
                            </div>
                        </ViewAnimation>
                    </Link>
                ))}
            </div>
        </Section>
    );
};
