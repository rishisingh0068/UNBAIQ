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
const AdminResetPassword = lazy(
  () => import("./pages/admin/AdminResetPassword"),
);
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminEnquiries = lazy(() => import("./pages/admin/AdminEnquiries"));
const AdminBlogs = lazy(() => import("./pages/admin/AdminBlogs"));
const AdminBlogForm = lazy(() => import("./pages/admin/AdminBlogForm"));
const AdminHeroSlides = lazy(() => import("./pages/admin/AdminHeroSlides"));
const AdminSuccessStories = lazy(() => import("./pages/admin/AdminSuccessStories"));
const AdminSuccessStoryForm = lazy(() => import("./pages/admin/AdminSuccessStoryForm"));
const AdminFaqs = lazy(() => import("./pages/admin/AdminFaqs"));
const AdminHeroSlideForm = lazy(() => import("./pages/admin/AdminHeroSlideForm"));
const AdminFaqForm = lazy(() => import("./pages/admin/AdminFaqForm"));
const AdminProfile = lazy(() => import("./pages/admin/AdminProfile"));
const AdminContactContent = lazy(() => import("./pages/admin/AdminContactContent"));
const SuccessStoryDetail = lazy(() => import("./pages/SuccessStoryDetail"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminRoute = lazy(() => import("./components/admin/AdminRoute"));
const AdminProtectedRoute = lazy(
  () => import("./components/admin/AdminProtectedRoute"),
);

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
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />
        {/* All admin workspace pages share one verified, responsive layout. */}
        <Route
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/enquiries" element={<AdminEnquiries />} />
          {/* Contact content uses one protected editor for the public Let's Talk details. */}
          <Route path="/admin/contact-content" element={<AdminContactContent />} />
          <Route path="/admin/hero-section" element={<AdminHeroSlides />} />
          <Route path="/admin/hero-section/new" element={<AdminHeroSlideForm />} />
          <Route path="/admin/hero-section/:id/edit" element={<AdminHeroSlideForm />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />
          <Route path="/admin/blogs/new" element={<AdminBlogForm />} />
          <Route path="/admin/blogs/:id/edit" element={<AdminBlogForm />} />
          <Route path="/admin/success-stories" element={<AdminSuccessStories />} />
          <Route path="/admin/success-stories/new" element={<AdminSuccessStoryForm />} />
          <Route path="/admin/success-stories/:id/edit" element={<AdminSuccessStoryForm />} />
          <Route path="/admin/faqs" element={<AdminFaqs />} />
          <Route path="/admin/faqs/new" element={<AdminFaqForm />} />
          <Route path="/admin/faqs/:id/edit" element={<AdminFaqForm />} />
        </Route>

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
          <Route path="/success-stories/:slug" element={<SuccessStoryDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
