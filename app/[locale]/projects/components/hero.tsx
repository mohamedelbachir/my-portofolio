import { HeroSection } from "@/components/sections/hero";
import { getTranslations } from "next-intl/server";

export const Hero = async () => {
    const t = await getTranslations('Projects.hero');

    return (
        <HeroSection caption={t('caption')} title={t('title')} />
    );
};

