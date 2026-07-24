import PageTitle from "../components/common/PageTitle";
import AboutHero from "../components/about/AboutHero";
import WhyChooseUs from "../components/home/WhyChooseUs";
import RightSolutions from "../components/whatwedo/RightSolutions";
import LatestBlog from "../components/home/LatestBlog";
import FaqSection from "../components/home/FaqSection";
const About = () => {
  return (
    <main className="w-full">
      <PageTitle title="About-Page | Ai-driven software solutions
Quality" />
      <AboutHero />
      <WhyChooseUs />
      <RightSolutions />
      <LatestBlog />
      <FaqSection />
    </main>
  );
};

export default About;