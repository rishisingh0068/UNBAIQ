import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import WhatWeDo from "./pages/WhatWeDo";
import OurApproach from "./pages/OurApproach";
import Services from "./pages/Services";
import About from "./pages/About";
import LetsTalk from "./pages/LetsTalk";
import CaseStudy from "./pages/CaseStudy";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/our-approach" element={<OurApproach />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/lets-talk" element={<LetsTalk />} />
        <Route path="/case-study" element={<CaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;