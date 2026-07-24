import PageTitle from "../components/common/PageTitle";
import SchoolSecurityCaseStudy from "../components/caseStudy/SchoolSecurityCaseStudy";
import LatestBlog from "../components/home/LatestBlog";
import ContactSection from "../components/letsTalk/ContactSection";
import FaqSection from "../components/home/FaqSection";

const CaseStudy = () => {
  return (
    <main className="w-full">
      <PageTitle title="Case-Study | Ai-driven software solutions
Quality" />
      <SchoolSecurityCaseStudy />
        <LatestBlog />
        <ContactSection />
        <FaqSection />
    </main>
  );
};

export default CaseStudy;