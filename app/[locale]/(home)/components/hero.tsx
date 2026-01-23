import { HeroSection } from "@/components/sections/hero";
import { Button } from "@/components/ui/button";
// import { BaseHubImage } from 'basehub/next-image';
// import { Pump } from 'basehub/react-pump';
import { Link } from "@/i18n/routing";
import Image from "next/image";
import Logo from "@/components/header/elbachir.jpg";
import { getTranslations } from "next-intl/server";

export const Hero = async () => {
    const t = await getTranslations("Hero");

    return (
        <HeroSection
            caption={t("caption")}
            title={t("title")}
            subtitle={t("subtitle")}
            image={
                <Image
                    src={Logo}
                    alt=""
                    width={64}
                    height={64}
                    className="size-12 overflow-hidden rounded-full object-cover"
                    priority
                />
            }
        >
            <div className="flex items-center justify-center gap-4">
                <Button
                    asChild
                    variant="outline"
                    className="dark:hover:bg-background"
                >
                    <Link href="/projects">{t("viewProjects")}</Link>
                </Button>
                <Button asChild>
                    <Link href="/contact">{t("contact")}</Link>
                </Button>
            </div>
        </HeroSection>
    );
};
