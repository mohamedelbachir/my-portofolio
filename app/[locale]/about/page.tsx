import { Certifications } from "./components/certifications";
import { Content } from "./components/content";
import { Experience } from "./components/experience";
import { Hero } from "./components/hero";
import { Skills } from "./components/skills";

export const generateMetadata = async () => {
    // const { about } = await basehub.query({
    //   about: {
    //     metadata: {
    //       title: true,
    //       description: true,
    //     },
    //   },
    // });

    return {
        title: "About",
        description: "About this page.",
    };
};

const About = () => (
    <>
        <Hero />
        <Content />
        <Experience />
        <Skills />
        {/*<Certifications />*/}
    </>
);

export default About;
