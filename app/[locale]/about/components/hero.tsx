import { Section } from "@/components/section";
import { cn } from "@/lib/utils";
import { ViewAnimation } from "@/providers/view-animation";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import Logo from "@/components/header/elbachir.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";

export const Hero = async () => {
    const t = await getTranslations("About.hero");
    const locale = (await getLocale()) as "en" | "fr";

    return (
        <Section className="p-4">
            <div
                className={cn(
                    "flex flex-col-reverse gap-8 py-8",
                    "md:flex-row md:items-center md:justify-between",
                    "sm:rounded-lg sm:border sm:bg-muted sm:px-8 sm:py-12 sm:shadow-sm",
                )}
            >
                <div className="flex flex-1 flex-col gap-4">
                    <ViewAnimation
                        initial={{ opacity: 0, translateY: -8 }}
                        whileInView={{ opacity: 1, translateY: 0 }}
                    >
                        <small className="block text-muted-foreground text-sm sm:text-base">
                            {t("about")}
                        </small>
                    </ViewAnimation>
                    <ViewAnimation
                        initial={{ opacity: 0, translateY: -8 }}
                        whileInView={{ opacity: 1, translateY: 0 }}
                        delay={0.2}
                    >
                        <h1
                            className={cn(
                                "max-w-4xl font-bold text-3xl leading-tight tracking-tight",
                                "md:text-4xl md:leading-tight",
                            )}
                        >
                            <Balancer>{t("title")}</Balancer>
                        </h1>
                        <p className="text-muted-foreground text-base sm:text-2xl">
                            {t("subtitle")}
                        </p>
                        <div className="flex flex-col mt-4 gap-4 sm:flex-row sm:items-center">
                            <Button asChild>
                                <a
                                    href={
                                        locale === "en"
                                            ? "/cv/RESUME_MOHAMED_ELBACHIR.pdf"
                                            : "/cv/CV_MOHAMED_ELBACHIR.pdf"
                                    }
                                    target="_blank"
                                >
                                    {t("downloadCV")}
                                </a>
                            </Button>
                            <Button variant={"outline"} asChild>
                                <Link href="/contact?type=work">
                                    {t("talkWork")}
                                </Link>
                            </Button>
                        </div>
                    </ViewAnimation>
                </div>

                <ViewAnimation
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    delay={0.4}
                    className="relative aspect-square w-full max-w-[180px] flex-shrink-0 self-center overflow-hidden rounded-2xl border-4 border-border md:max-w-[320px] md:self-auto"
                >
                    <Image
                        src={Logo}
                        alt="Mohamed El Bachir"
                        fill
                        className="object-cover"
                        priority
                    />
                </ViewAnimation>
            </div>
        </Section>
    );
};
