import { TeaserTitle } from "./teaser-title";
import { getTranslations } from "next-intl/server";

export const Teaser = async () => {
    const t = await getTranslations("CTA.teaser");

    return (
        <div className="flex flex-col gap-4">
            <TeaserTitle contacts={10} title={t("title")} />
            {/*<div className="-space-x-2 flex items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background ring-2 ring-secondary">
                    <span className="text-[8px] text-muted-foreground">
                        +
                        {new Intl.NumberFormat("en-US", {
                            notation: "compact",
                        }).format(10 - 0)}
                    </span>
                </div>
            </div>*/}
        </div>
    );
};
