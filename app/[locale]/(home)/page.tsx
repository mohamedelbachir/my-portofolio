import { Feed } from "./components/feed";
// import { GitHubActivity } from "./components/github-activity";
import { Hero } from "./components/hero";
import { FeaturedProjects } from "./components/featured-projects";
import { FeaturedPosts } from "./components/featured-posts";
import { AboutTeaser } from "./components/about-teaser";
import { StackTeaser } from "./components/stack-teaser";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async () => {
    const t = await getTranslations("Navigation");

    return {
        title: t("home"),
        description: "Welcome to the homepage.",
    };
};

const Home = async () => (
    <>
        <Hero />
        <FeaturedProjects />
        {/*<Experience />*/}
        <FeaturedPosts />
        <AboutTeaser />
        <StackTeaser />
        {/*<Feed />*/}
        {/*<GitHubActivity />*/}
    </>
);

export default Home;
