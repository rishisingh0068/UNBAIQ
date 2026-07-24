import PageTitle from "../components/common/PageTitle";
import BringIdeas from "../components/whatwedo/BringIdeas";
import RightSolutions from "../components/whatwedo/RightSolutions";
import OurWorkShowcase from "../components/whatwedo/OurWorkShowcase";
import Testimonials from "../components/home/Testimonials";
import LogoMarquee from "../components/home/LogoMarquee";
import LatestBlog from "../components/home/LatestBlog";
import FaqSection from "../components/home/FaqSection";
const WhatWeDo = () => {
  return (
    <>
      <PageTitle title="What-We-Do | Ai-driven software solutions
Quality" />
      <BringIdeas />
      <RightSolutions />
      <OurWorkShowcase />
      <Testimonials />
      <LogoMarquee />
      <LatestBlog />
      <FaqSection />
    </>
  );
};

export default WhatWeDo;