import { Prose } from "@/components/prose";
import { Section } from "@/components/section";
import { HeroSection } from "@/components/sections/hero";
import { richTextComponents } from "@/lib/rich-text";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";

type RoleProps = {
    params: Promise<{
        role: string;
    }>;
};

export const generateMetadata = async ({ params }: RoleProps) => {
    return {};
};

const Role = async ({ params }: RoleProps) => {
    return notFound();
};

export default Role;
