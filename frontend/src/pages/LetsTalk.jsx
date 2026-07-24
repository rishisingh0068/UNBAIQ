import PageTitle from "../components/common/PageTitle";
import LetsTalkHero from "../components/letsTalk/LetsTalkHero";
import ContactSection from "../components/letsTalk/ContactSection";
import FaqSection from "../components/home/FaqSection";
const LetsTalk = () => {
  return (
    <main>
      <PageTitle title="Let's Talk | Ai-driven software solutions
Quality" />
      <LetsTalkHero />
      <ContactSection />
      <FaqSection />
    </main>
  );
};

export default LetsTalk;