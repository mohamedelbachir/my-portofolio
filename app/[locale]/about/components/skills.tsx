import { Section } from "@/components/section";
import { cn } from "@/lib/utils";
import { ViewAnimation } from "@/providers/view-animation";
import { skills } from "@/lib/data";
import { Icon } from "@iconify/react";
import { getTranslations } from "next-intl/server";

export const Skills = async () => {
    const t = await getTranslations("About.skills");

    return (
        <Section className={cn("flex flex-col gap-8 px-4 py-8", "sm:px-8")}>
            <ViewAnimation
                initial={{ opacity: 0, translateY: -8 }}
                whileInView={{ opacity: 1, translateY: 0 }}
            >
                <h2 className="font-bold text-2xl tracking-tight">
                    {t("title")}
                </h2>
                <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
            </ViewAnimation>
            <div className="flex flex-wrap gap-4 ">
                {skills.map((skill, index) => (
                    <ViewAnimation
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        delay={index * 0.05}
                    >
                        <div className="flex items-center gap-2 rounded-md border bg-muted px-3 py-2 transition-colors ">
                            <Icon icon={skill.icon} className="size-6" />
                            <span className="text-sm font-medium">
                                {skill.name}
                            </span>
                        </div>
                    </ViewAnimation>
                ))}
            </div>
        </Section>
    );
};
