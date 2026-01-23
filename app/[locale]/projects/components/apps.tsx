import { Prose } from "@/components/prose";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import Balancer from "react-wrap-balancer";
import { ProjectVideo } from "./video";

//import { Prose } from '@/components/prose';
//import { Section } from '@/components/section';
//import { Badge } from '@/components/ui/badge';
//import { cn } from '@/lib/utils';
//import Link from 'next/link';
//import Balancer from 'react-wrap-balancer';
import { projects, skills } from "@/lib/data";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Icon } from "@iconify/react";

export const Apps = async () => {
    const t = await getTranslations("Projects");
    const locale = (await getLocale()) as "en" | "fr";

    return (
        <Section className="grid md:grid-cols-2">
            {projects.map((app, index) => (
                <Link
                    href={app.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    key={index}
                    className={cn(
                        "flex flex-col gap-8 px-4 pt-4 transition-all",
                        "sm:px-8 sm:pt-8",
                        "hover:bg-muted dark:hover:bg-muted/30 hover:shadow-sm",
                        index && "border-t",
                        index < 2 && "sm:border-t-0",
                        index % 2 === 0 && "sm:border-r",
                    )}
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-col gap-1">
                                <small className="text-muted-foreground font-medium uppercase tracking-wider text-[10px]">
                                    {t(`categories.${app.category}`)}
                                </small>
                                <h2 className="font-bold text-2xl">
                                    {app.title}
                                </h2>
                            </div>
                        </div>
                        <Prose>
                            <p className="leading-normal">
                                <Balancer>{app.description[locale]}</Balancer>
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
                                        className="flex items-center gap-1.5 rounded-md border bg-muted/50 px-2 py-1 transition-colors"
                                    >
                                        {skill && (
                                            <Icon
                                                icon={skill.icon}
                                                className="size-4"
                                            />
                                        )}
                                        <span className="text-[10px] font-medium uppercase tracking-tight">
                                            {tag}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-t-lg border-x border-t">
                        <Image
                            src={app.image}
                            alt={app.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </Link>
            ))}
            {projects.length % 2 === 1 && (
                <div className="size-full border-t bg-dashed" />
            )}
        </Section>
    );
};
