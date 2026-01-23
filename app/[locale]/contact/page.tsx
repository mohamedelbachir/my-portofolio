import { Section } from "@/components/section";
import { Suspense } from "react";
import { ContactForm } from "./components/contact-form";
import { Hero } from "./components/hero";
import { getLocale } from "next-intl/server";

export const generateMetadata = async () => {
    /*
  const { contact } = await basehub.query({
    contact: {
      metadata: {
        title: true,
        description: true,
      },
    },
  });
  */

    return {
        title: "Contact",
        description: "Get in touch.",
    };
};

const ContactPage = async () => {
    const locale = (await getLocale()) as "en" | "fr";
    return (
        <Section className="grid divide-y border-t sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="p-4 sm:p-8">
                <Hero />
            </div>
            <div className="p-4 sm:p-8">
                <Suspense fallback={null}>
                    <ContactForm locale={locale} />
                </Suspense>
            </div>
        </Section>
    );
};

export default ContactPage;
