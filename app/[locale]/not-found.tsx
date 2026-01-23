import { Section } from "@/components/section";
import { HeroSection } from "@/components/sections/hero";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function NotFound() {
    const t = useTranslations("NotFound");

    return (
        <>
            <HeroSection title={t("title")} subtitle={t("description")}>
                <div className="flex items-center justify-center gap-4 mt-8">
                    <Button asChild>
                        <Link href="/">{t("button")}</Link>
                    </Button>
                </div>
            </HeroSection>
        </>
    );
}
