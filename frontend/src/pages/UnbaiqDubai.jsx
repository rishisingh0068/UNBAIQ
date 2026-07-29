import PageTitle from "../components/common/PageTitle";
import DubaiHero from "../components/UnbaiqDubai/DubaiHero";
import DubaiOffice from "../components/UnbaiqDubai/DubaiOffice";
import SolutionsShaped from "../components/whatwedo/SolutionsShaped";
import ContactSection from "../components/letsTalk/ContactSection";
import RightSolutions from "../components/whatwedo/RightSolutions";
import FaqSection from "../components/home/FaqSection";
const UnbaiqDubai = () => {
  return (
    <main className="w-full">
      <PageTitle title="Unbaiq Dubai | AI-driven software solutions" />
      <DubaiHero />
      <SolutionsShaped />
      <DubaiOffice />
      <ContactSection />
      <RightSolutions/>
      <FaqSection />
    </main>
  );
};

export default UnbaiqDubai;
