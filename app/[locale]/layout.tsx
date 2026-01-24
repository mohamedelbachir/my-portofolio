import "./globals.css";
import { CallToAction } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { WindowsEmojiPolyfill } from "@/components/windows-emoji-polyfill";
import { env } from "@/lib/env";
import { ThemeProvider } from "@/providers/theme";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Script from "next/script";
type RootLayoutProps = {
    children: ReactNode;
    params: Promise<{ locale: string }>;
};

const name = "Mohamed el bachir";
const protocol = env?.VERCEL_PROJECT_PRODUCTION_URL?.includes("localhost")
    ? "http"
    : "https";
const siteUrl = new URL(`${protocol}://${env?.VERCEL_PROJECT_PRODUCTION_URL}`);

export const metadata: Metadata = {
    applicationName: name,
    authors: [
        {
            name,
            url: siteUrl.toString(),
        },
    ],
    creator: name,
    metadataBase: siteUrl,
    formatDetection: {
        telephone: false,
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
    },
    openGraph: {
        type: "website",
        siteName: name,
        locale: "en_US",
    },
    publisher: name,
    twitter: {
        card: "summary_large_image",
        creator: "@mohamedelbachir",
    },
};

const switzer = localFont({
    src: [
        {
            path: "./_fonts/Montserrat-Thin.ttf",
            weight: "100",
            style: "normal",
        },
        {
            path: "./_fonts/Montserrat-ExtraLight.ttf",
            weight: "200",
            style: "normal",
        },
        {
            path: "./_fonts/Montserrat-Light.ttf",
            weight: "300",
            style: "normal",
        },
        {
            path: "./_fonts/Montserrat-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "./_fonts/Montserrat-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "./_fonts/Montserrat-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "./_fonts/Montserrat-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "./_fonts/Montserrat-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
    ],
    variable: "--font-switzer",
});

const RootLayout = async ({ children, params }: RootLayoutProps) => {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <link
                    rel="stylesheet"
                    href="https://api.fontshare.com/css?f%5B%5D=jet-brains-mono@400&amp;display=swap"
                />
                <Script
                    src="https://cloud.umami.is/script.js"
                    data-website-id="fd40b144-fc95-4fae-aa97-808771bc3200"
                    strategy="afterInteractive"
                />
            </head>
            <body
                className={`overflow-x-hidden bg-backdrop ${switzer.variable} font-sans antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Header />
                        <div className="container mx-auto h-[52px] sm:h-16 sm:border-x" />
                        <main className="divide-y sm:border-b">
                            {children}
                            <CallToAction />
                        </main>
                        <Footer />
                    </ThemeProvider>
                    <Toaster />
                    <Analytics />
                    <WindowsEmojiPolyfill />
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export default RootLayout;
