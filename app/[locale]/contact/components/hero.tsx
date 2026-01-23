import { Balancer } from "react-wrap-balancer";

import { getTranslations } from "next-intl/server";

export const Hero = async () => {
    const t = await getTranslations("Contact.hero");

    return (
        <div className="flex flex-col gap-4">
            <small className="text-muted-foreground font-medium uppercase tracking-wider">
                {t("caption")}
            </small>
            <h1 className="max-w-xl font-bold text-2xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
                {t("title")}
            </h1>
        </div>
    );
};
