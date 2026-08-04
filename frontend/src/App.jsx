import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";

// Other pages are loaded as separate route chunks.
const WhatWeDo = lazy(() => import("./pages/WhatWeDo"));
const OurApproach = lazy(() => import("./pages/OurApproach"));
const Services = lazy(() => import("./pages/Services"));
const LetsTalk = lazy(() => import("./pages/LetsTalk"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const UnbaiqDubai = lazy(() => import("./pages/UnbaiqDubai"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const SuccessStories = lazy(() => import("./pages/SuccessStories"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminRoute = lazy(() => import("./components/admin/AdminRoute"));

const PageLoader = () => (
  <div
    className="flex min-h-[45vh] items-center justify-center bg-white"
    role="status"
    aria-label="Loading page"
  >
    <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#003866]/20 border-t-[#003866]" />
  </div>
);

const App = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/our-approach" element={<OurApproach />} />
          <Route path="/services" element={<Services />} />
          <Route path="/unbaiq-dubai" element={<UnbaiqDubai />} />
          <Route path="/about" element={<About />} />
          <Route path="/lets-talk" element={<LetsTalk />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
