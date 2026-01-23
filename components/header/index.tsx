import { Button } from "@/components/ui/button";
import { navigation } from "@/lib/navigation";
import { HeaderProvider } from "@/providers/header";
import { Link } from "@/i18n/routing";
import { ViewAnimation } from "../../providers/view-animation";
import { ActiveLink } from "../active-link";
import { MobileMenu } from "./mobile-menu";
import { MobileMenuTrigger } from "./mobile-menu-trigger";
import { ThemeSwitcher } from "@/components/footer/theme-switcher";
import { LanguageSwitcher } from "./language-switcher";
import { getTranslations } from "next-intl/server";

export const Header = async () => {
    const t = await getTranslations('Navigation');
    const tHero = await getTranslations('Hero');

    return (
    <>
        <HeaderProvider className="container fixed top-0 right-0 left-0 z-50 mx-auto flex items-center justify-between border-x bg-backdrop/90 px-4 py-2 backdrop-blur-md transition-all sm:py-4">
            <div className="w-32">
                <ViewAnimation
                    initial={{ opacity: 0, translateY: -8 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                >
                    <Link href="/" aria-label="Mohamed El Bachir">
                        <svg
                            viewBox="0 0 256 256"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMinYMin meet"
                            className="h-8 w-8 overflow-hidden rounded-full object-cover fill-black dark:fill-white"
                        >
                            <path d="M178.496 124.737l-14.205-14.205 7.306-30.035-30.441 6.9-13.8-13.8 68.187-17.047-17.047 68.187z" />
                            <path d="M154.956 218.901L33.192 97.138 101.38 80.09l13.8 13.8-48.706 12.176 27.6 27.6 32.064-7.712-8.117 31.658 27.6 27.6 12.176-48.705 14.205 14.206-17.046 68.187z" />
                        </svg>
                    </Link>
                </ViewAnimation>
            </div>
            <nav className="hidden gap-6 md:flex">
                {navigation.map((link, index) => (
                    <ViewAnimation
                        key={link.href}
                        initial={{ opacity: 0, translateY: -8 }}
                        whileInView={{ opacity: 1, translateY: 0 }}
                        delay={0.4 + index * 0.1}
                    >
                        <ActiveLink href={link.href}>{t(link.label.toLowerCase())}</ActiveLink>
                    </ViewAnimation>
                ))}
            </nav>
            <div className="hidden w-32 justify-end md:flex">
                <ViewAnimation
                    initial={{ opacity: 0, translateY: -8 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    delay={0.8}
                >
                    <div className="flex items-center gap-2">
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/contact">{tHero('contact')}</Link>
                        </Button>
                    </div>
                </ViewAnimation>
            </div>
            <div className="flex w-32 justify-end md:hidden">
                <ViewAnimation
                    initial={{ opacity: 0, translateY: -8 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    delay={0.8}
                >
                    <div className="flex items-center gap-2">
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                        <MobileMenuTrigger />
                    </div>
                </ViewAnimation>
            </div>
        </HeaderProvider>
        <MobileMenu />
    </>
);
};