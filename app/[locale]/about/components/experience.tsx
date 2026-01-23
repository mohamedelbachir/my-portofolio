import { Section } from "@/components/section";
import { cn } from "@/lib/utils";
import { ViewAnimation } from "@/providers/view-animation";
import { workExperience } from "@/lib/data";
import { Briefcase } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations, getLocale } from "next-intl/server";
import { formatDateRange } from "@/lib/utils";

export const Experience = async () => {
    const t = await getTranslations("About.experience");
    const locale = await getLocale();

    return (
        <Section
            className={cn(
                "flex flex-col bg-muted dark:bg-muted/30 gap-8 px-0 py-8",
                "sm:px-4",
            )}
        >
            <ViewAnimation
                initial={{ opacity: 0, translateY: -8 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                className="px-4"
            >
                <h2 className="font-bold text-2xl tracking-tight">
                    {t("title")}
                </h2>
                <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
            </ViewAnimation>

            <div className="relative border-l border-border mx-6 space-y-12 py-4">
                {workExperience.map((job, index) => (
                    <ViewAnimation
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        delay={index * 0.1}
                        className="relative pl-4 sm:pl-8"
                    >
                        {/* Dot */}
                        <div className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-border ring-4 ring-background border border-border" />

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                <h3 className="font-semibold text-lg leading-none">
                                    {t(`items.${job.id}.role`)}
                                </h3>
                                <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded-full w-fit">
                                    {formatDateRange(
                                        job.startDate,
                                        job.endDate,
                                        locale,
                                    )}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <div className="relative size-7 border border-border overflow-hidden bg-white rounded-sm flex items-center justify-center bg-muted">
                                    {job.logo ? (
                                        <Image
                                            src={job.logo}
                                            alt={job.company}
                                            fill
                                            className="object-cover p-1 opacity-80"
                                        />
                                    ) : (
                                        <Briefcase className="size-3" />
                                    )}
                                </div>
                                <Link
                                    href={job.url}
                                    target={
                                        job.url !== "#" ? "_blank" : undefined
                                    }
                                    className={cn(
                                        "hover:text-foreground transition-colors",
                                        job.url === "#" &&
                                            "pointer-events-none",
                                    )}
                                >
                                    {job.company}
                                </Link>
                                <span>&bull;</span>
                                <span>{job.location}</span>
                            </div>

                            <p className="text-muted-foreground text-sm mt-1">
                                {t(`items.${job.id}.description`)}
                            </p>
                        </div>
                    </ViewAnimation>
                ))}
            </div>
        </Section>
    );
};
