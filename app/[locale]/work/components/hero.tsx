import { HeroSection } from "@/components/sections/hero";
import { SocialButton } from "@/components/social-button";
import { Button } from "@/components/ui/button";
import { social } from "@/lib/social";
import { getTranslations } from "next-intl/server";

import { Link } from '@/i18n/routing';

export const Hero = async () => {
    const t = await getTranslations('Work.hero');

    return (
        <HeroSection caption={t('caption')} title={t('title')}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <SocialButton data={social.linkedin} />
                <Button asChild>
                    <Link href="/contact?type=work">{t('contact')}</Link>
                </Button>
            </div>
        </HeroSection>
    );
};
