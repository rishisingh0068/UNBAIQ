import PageTitle from "../components/common/PageTitle";
import OurServicesSection from "../components/OurServices/OurServices";
import RightSolutions from "../components/whatwedo/RightSolutions";
import Testimonials from "../components/home/Testimonials";
import LatestBlog from "../components/home/LatestBlog";
import FaqSection from "../components/home/FaqSection";

const OurServices = () => {
  return (
    <main>
      <PageTitle title="Services-Page | Ai-driven software solutions
Quality" />
      <OurServicesSection />
      <RightSolutions />
      <Testimonials />
      <LatestBlog />
      <FaqSection />
    </main>
  );
};

export default OurServices;
