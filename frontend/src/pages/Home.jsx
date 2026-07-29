import PageTitle from "../components/common/PageTitle";
import HeroSlider from "../components/home/HeroSlider";
import WhyChooseUs from "../components/home/WhyChooseUs";
import SolutionsSection from "../components/home/SolutionsSection";
import OurWorkSection from "../components/home/OurWorkSection";
import BusinessGrowthSection from "../components/home/BusinessGrowthSection";
import Testimonials from "../components/home/Testimonials";
import LogoMarquee from "../components/home/LogoMarquee";
import LatestBlog from "../components/home/LatestBlog";
import FaqSection from "../components/home/FaqSection";

const Home = () => {
  return (
    <main className="w-full overflow-hidden">
      <PageTitle title="UNBAIQ-Home | Ai-driven software solutions
Quality" />
      <HeroSlider />
      <WhyChooseUs />
      <SolutionsSection />
      <OurWorkSection />
      <BusinessGrowthSection />
      <Testimonials />
      <LogoMarquee />
      <LatestBlog />
      <FaqSection />
    </main>
  );
};

export default Home;
