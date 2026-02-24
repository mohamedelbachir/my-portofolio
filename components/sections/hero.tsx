import { cn } from "@/lib/utils";
import { Children, type ReactNode } from "react";
import { Balancer } from "react-wrap-balancer";
import { ViewAnimation } from "../../providers/view-animation";
import { Section } from "../section";

type HeroProps = {
    image?: ReactNode;
    caption?: string | null;
    title: string;
    subtitle?: string;
    children?: ReactNode;
};

export const HeroSection = ({
    image,
    caption,
    title,
    subtitle,
    children,
}: HeroProps) => (
    <Section className="p-4">
        <div
            className={cn(
                "flex flex-col items-start justify-center gap-4 py-8",
                "sm:items-center sm:rounded-lg sm:border sm:bg-muted sm:px-8 sm:py-20 sm:shadow-sm",
            )}
        >
            {image && (
                <ViewAnimation
                    initial={{ opacity: 0, translateY: -8 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                >
                    {image}
                </ViewAnimation>
            )}
            <div className="flex flex-col gap-4 sm:items-center">
                {caption && (
                    <ViewAnimation
                        initial={{ opacity: 0, translateY: -8 }}
                        whileInView={{ opacity: 1, translateY: 0 }}
                    >
                        <small className="block text-muted-foreground text-sm sm:text-base">
                            <Balancer>{caption}</Balancer>
                        </small>
                    </ViewAnimation>
                )}
                <ViewAnimation
                    initial={{ opacity: 0, translateY: -8 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    delay={0.4}
                >
                    <h1
                        className={cn(
                            "max-w-4xl font-bold text-3xl leading-tight tracking-tight",
                            "sm:text-center sm:text-4xl sm:leading-tight",
                            "md:text-4xl md:leading-tight",
                        )}
                    >
                        <Balancer>{title}</Balancer>
                    </h1>
                </ViewAnimation>
                <ViewAnimation
                    initial={{ opacity: 0, translateY: -8 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    delay={0.4}
                >
                    <p className={cn("font-sans md:text-2xl md:leading-tight")}>
                        <Balancer>{subtitle}</Balancer>
                    </p>
                </ViewAnimation>
            </div>
            {Children.map(children, (child, index) => (
                <ViewAnimation
                    initial={{ opacity: 0, translateY: -8 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    delay={0.8 + index * 0.4}
                >
                    {child}
                </ViewAnimation>
            ))}
        </div>
    </Section>
);
