import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { skills } from "@/lib/data";
import { ViewAnimation } from "@/providers/view-animation";
import { ArrowRight, Layers } from "lucide-react";
import { Link } from '@/i18n/routing';
import { Icon } from "@iconify/react";
import { getTranslations } from "next-intl/server";

export const StackTeaser = async () => {
    const t = await getTranslations('Sections.Stack');
    // Show a subset of skills
    const featuredSkills = skills.slice(0, 8);

    return (
        <Section className="flex flex-col border-t py-12 md:py-20">
            <div className="flex flex-col items-center justify-center gap-4 text-center px-4 sm:px-8">
                <ViewAnimation
                    initial={{ opacity: 0, translateY: 8 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                >
                    <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                        <Layers className="size-5" />
                        <span className="text-sm font-medium uppercase tracking-wider">
                            {t('label')}
                        </span>
                    </div>
                    <h2 className="font-bold text-3xl tracking-tight sm:text-4xl mb-6">
                        {t('title')}
                    </h2>
                </ViewAnimation>

                <ViewAnimation
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    delay={0.1}
                    className="flex flex-wrap justify-center gap-2 max-w-3xl"
                >
                    {featuredSkills.map((skill) => (
                        <div
                            key={skill.name}
                            className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm transition-colors hover:bg-muted/50"
                        >
                            <Icon icon={skill.icon} className="size-5" />
                            <span className="text-sm font-medium">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                    {skills.length > 8 && (
                        <div className="flex items-center gap-2 rounded-full border border-dashed bg-muted/20 px-4 py-2 text-muted-foreground text-sm">
                            +{skills.length - 8} {t('more')}
                        </div>
                    )}
                </ViewAnimation>

                <ViewAnimation
                    initial={{ opacity: 0, translateY: 8 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    delay={0.2}
                    className="mt-8"
                >
                    <Button variant="outline" asChild className="group">
                        <Link href="/stack">
                            {t('viewFull')}
                            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </ViewAnimation>
            </div>
        </Section>
    );
};
