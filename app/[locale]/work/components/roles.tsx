import { Prose } from "@/components/prose";
import { Section } from "@/components/section";
import { cn, formatDateRange } from "@/lib/utils";
import { ViewAnimation } from "@/providers/view-animation";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Briefcase } from "lucide-react";
import { workExperience } from "@/lib/data";
import { getTranslations, getLocale } from "next-intl/server";

export const Roles = async () => {
    const t = await getTranslations("About.experience");
    const locale = await getLocale();

    return (
        <Section className="grid sm:grid-cols-2">
            {workExperience.map((role, index) => (
                <ViewAnimation
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    delay={index % 2 ? 0.2 : 0}
                    className={cn(
                        index % 2 === 0 ? "sm:border-r" : "",
                        index < workExperience.length - 2 ? "border-b" : "",
                    )}
                    key={role.company + role.id}
                >
                    <Link
                        href={role.url}
                        target={role.url !== "#" ? "_blank" : undefined}
                        rel={
                            role.url !== "#" ? "noreferrer noopener" : undefined
                        }
                        className={cn(
                            "flex flex-col items-start gap-6 px-4 py-8 transition-colors hover:bg-muted h-full",
                            "sm:flex-row sm:px-8",
                            role.url === "#" && "pointer-events-none",
                        )}
                    >
                        <div className="relative  size-12 flex-shrink-0 border border-border overflow-hidden rounded-lg bg-white flex items-center justify-center">
                            {role.logo ? (
                                <Image
                                    src={role.logo}
                                    alt={role.company}
                                    fill
                                    className="object-cover p-2"
                                />
                            ) : (
                                <Briefcase className="size-6 text-muted-foreground" />
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2 className="font-semibold text-xl tracking-tight">
                                <span className="block leading-tight">
                                    {t(`items.${role.id}.role`)}
                                </span>
                                <span className="block text-muted-foreground">
                                    {role.company}
                                </span>
                            </h2>
                            <Prose className="prose-sm">
                                <p>{t(`items.${role.id}.description`)}</p>
                            </Prose>
                            <p className="text-muted-foreground text-sm">
                                {formatDateRange(
                                    role.startDate,
                                    role.endDate,
                                    locale,
                                )}{" "}
                                &bull; {role.location}
                            </p>
                        </div>
                    </Link>
                </ViewAnimation>
            ))}
            {workExperience.length % 2 === 1 && (
                <div className="hidden border-t bg-dashed sm:block" />
            )}
        </Section>
    );
};
