import { navigation } from "@/lib/navigation";
import { social } from "@/lib/social";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { ReactNode } from "react";
import { ViewAnimation } from "../../providers/view-animation";
import { ActiveLink } from "../active-link";
import { getTranslations } from "next-intl/server";

export const Links = async () => {
    const t = await getTranslations("Navigation");
    const tFooter = await getTranslations("Footer");

    const lists: {
        title: string;
        href?: string;
        external?: boolean;
        items: {
            href: string;
            children: ReactNode;
        }[];
    }[] = [
        {
            title: tFooter("pages"),
            items: navigation.map((link) => ({
                href: link.href,
                children: t(link.label.toLowerCase()),
            })),
        },
        {
            title: tFooter("social"),
            items: Object.values(social).map((link) => ({
                href: link.href,
                children: (
                    <div className="flex items-center gap-2">
                        <Image
                            src={link.icon}
                            alt={link.label}
                            width={14}
                            height={14}
                            className="h-3.5 w-3.5 opacity-50 brightness-0 dark:invert"
                        />
                        {link.label}
                    </div>
                ),
                external: true,
            })),
        },
    ];

    return (
        <div className="flex flex-col gap-8 text-muted-foreground text-sm ">
            {lists.map((list, index) => (
                <ViewAnimation
                    initial={{ opacity: 0, translateY: -8 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    delay={index * 0.1}
                    key={list.title}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                    <div className="font-medium text-foreground text-xs uppercase tracking-wider">
                        {list.href ? (
                            <Link href={list.href}>{list.title}</Link>
                        ) : (
                            <p>{list.title}</p>
                        )}
                    </div>
                    <ul className="flex flex-col gap-2">
                        {list.items.map((item) => (
                            <li key={item.href}>
                                <ActiveLink
                                    href={item.href}
                                    target={
                                        list.external ? "_blank" : undefined
                                    }
                                    rel={
                                        list.external
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                >
                                    {item.children}
                                </ActiveLink>
                            </li>
                        ))}
                    </ul>
                </ViewAnimation>
            ))}
        </div>
    );
};
