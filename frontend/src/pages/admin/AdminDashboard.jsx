import { BookOpenText, CircleHelp, Images, Inbox, Newspaper } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";

import { getAdminBlogs } from "../../services/blog";
import { getAdminFaqs } from "../../services/faq";
import { getAdminHeroSlides } from "../../services/heroSlide";
import { getAdminSuccessStories } from "../../services/successStory";
import { getAdminToken } from "../../utils/adminSession";

const initialContentStats = {
  blogs: { total: 0, published: 0 },
  heroSlides: { total: 0, published: 0 },
  successStories: { total: 0, published: 0 },
  faqs: { total: 0, published: 0 },
};

const AdminDashboard = () => {
  const token = getAdminToken();
  const { enquiries, enquiriesError, stats } = useOutletContext();
  const [contentStats, setContentStats] = useState(initialContentStats);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [contentError, setContentError] = useState("");
  const recentEnquiries = enquiries.slice(0, 5);

  // Load every managed content collection in parallel for one dashboard snapshot.
  useEffect(() => {
    let active = true;
    const loadContentStats = async (showLoading = false) => {
      if (showLoading) setIsLoadingContent(true);
      setContentError("");
      try {
        const [blogData, heroData, storyData, faqData] = await Promise.all([
          getAdminBlogs(token),
          getAdminHeroSlides(token),
          getAdminSuccessStories(token),
          getAdminFaqs(token),
        ]);
        if (!active) return;
        setContentStats({
          blogs: {
            total: blogData.blogs.length,
            published: blogData.blogs.filter((item) => item.status === "published").length,
          },
          heroSlides: {
            total: heroData.slides.length,
            published: heroData.slides.filter((item) => item.active).length,
          },
          successStories: {
            total: storyData.stories.length,
            published: storyData.stories.filter((item) => item.status === "published").length,
          },
          faqs: {
            total: faqData.faqs.length,
            published: faqData.faqs.filter((item) => item.active).length,
          },
        });
      } catch (requestError) {
        if (active) setContentError(requestError.message);
      } finally {
        if (active) setIsLoadingContent(false);
      }
    };

    loadContentStats(true);
    const handleWindowFocus = () => loadContentStats();
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      active = false;
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [token]);

  // Each module card shows its total plus the most useful live status count.
  const overviewCards = [
    { label: "Enquiries", value: stats.total, detail: `${stats.new} new`, icon: Inbox, color: "bg-[#e8f5fa] text-[#0d759f]", accent: "bg-[#0d759f]", path: "/admin/enquiries" },
    { label: "Blogs", value: contentStats.blogs.total, published: contentStats.blogs.published, unpublished: contentStats.blogs.total - contentStats.blogs.published, icon: Newspaper, color: "bg-[#efedff] text-[#7067cf]", accent: "bg-[#7067cf]", path: "/admin/blogs" },
    { label: "Hero Slides", value: contentStats.heroSlides.total, published: contentStats.heroSlides.published, unpublished: contentStats.heroSlides.total - contentStats.heroSlides.published, icon: Images, color: "bg-[#fff0ea] text-[#d85c34]", accent: "bg-[#e06a42]", path: "/admin/hero-section" },
    { label: "Success Stories", value: contentStats.successStories.total, published: contentStats.successStories.published, unpublished: contentStats.successStories.total - contentStats.successStories.published, icon: BookOpenText, color: "bg-[#e8f7f1] text-[#2d9a70]", accent: "bg-[#2d9a70]", path: "/admin/success-stories" },
    { label: "FAQs", value: contentStats.faqs.total, published: contentStats.faqs.published, unpublished: contentStats.faqs.total - contentStats.faqs.published, icon: CircleHelp, color: "bg-[#fff4e7] text-[#a86628]", accent: "bg-[#b27033]", path: "/admin/faqs" },
  ];

  return <section className="mx-auto max-w-[1500px]">
    {/* Responsive spacing and breakpoints prevent overview content from crowding on smaller screens. */}
    <div className="mb-5 rounded-xl border border-[#dce5ec] bg-gradient-to-r from-white to-[#f3f8fb] px-4 py-4 shadow-[0_6px_22px_rgba(32,45,58,0.05)] sm:mb-7 sm:px-6 sm:py-5"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8496a5] sm:text-xs">Admin workspace</p><h2 className="mt-1 text-xl font-semibold text-[#063d6b] sm:text-2xl">Dashboard Overview</h2><p className="mt-1 text-xs leading-5 text-[#667d90] sm:text-sm">Monitor enquiries and all website content from one place.</p></div>

    {(enquiriesError || contentError) && <p className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">{enquiriesError || contentError}</p>}

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {overviewCards.map(({ label, value, published, unpublished, icon: Icon, color, accent, path }) => <article key={label} className="group relative overflow-hidden rounded-xl border border-[#dce5ec] bg-white shadow-[0_7px_22px_rgba(32,45,58,0.07)] transition duration-200 hover:-translate-y-1 hover:border-[#c5d6e1] hover:shadow-[0_13px_30px_rgba(32,45,58,0.11)]">
        <span className={`absolute inset-x-0 top-0 h-1 ${accent}`} />
        {/* Equal-height content and aligned status rows keep all cards visually consistent. */}
        <div className="px-4 pb-4 pt-5">
          <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-[12px] font-semibold text-[#526b80]">{label}</p><div className="mt-2 flex items-end gap-2"><p className="text-[29px] font-bold leading-none text-[#173f61]">{isLoadingContent && label !== "Enquiries" ? "—" : value}</p><span className="pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#93a2ae]">Total</span></div></div><span className={`rounded-xl p-2.5 ${color}`}><Icon size={20} /></span></div>
          {/* Separate total, published, and unpublished values without changing the card size. */}
          {label === "Enquiries" ? <div className="mt-5 flex h-[38px] items-start"><span className="text-[13px] font-semibold text-[#0d759f]">{stats.new}&nbsp;&nbsp;New</span></div> : <div className="mt-5 flex h-[38px] flex-col items-start justify-between"><span className="whitespace-nowrap text-[7px] font-semibold text-green-700"><strong>{isLoadingContent ? "—" : published}</strong>&nbsp;&nbsp;Published</span><span className="whitespace-nowrap text-[7px] font-semibold text-amber-700"><strong>{isLoadingContent ? "—" : unpublished}</strong>&nbsp;&nbsp;Unpublished</span></div>}
        </div>
        <NavLink to={path} className="flex items-center justify-between border-t border-[#e6edf2] bg-[#fafcfd] px-4 py-2.5 text-[11px] font-semibold text-[#176b98] transition-colors group-hover:bg-[#f1f7fa]">Manage <span aria-hidden="true">→</span></NavLink>
      </article>)}
    </div>

    <section className="mt-6 overflow-hidden rounded-xl border border-[#dce5ec] bg-white shadow-[0_8px_28px_rgba(32,45,58,0.06)] sm:mt-8">
      <header className="flex items-center justify-between gap-3 border-b border-[#e6edf2] bg-gradient-to-r from-white to-[#f7fafc] px-4 py-4 sm:px-6 sm:py-5"><div className="min-w-0"><h3 className="font-semibold text-[#063d6b]">Recent enquiries</h3><p className="mt-1 text-xs text-[#8496a5]">Latest messages from the website</p></div><NavLink to="/admin/enquiries" className="shrink-0 rounded-lg bg-[#e9f4fa] px-3 py-2 text-xs font-semibold text-[#176b98] transition hover:bg-[#dceef6]">View all</NavLink></header>
      {recentEnquiries.length === 0 ? <p className="p-8 text-center text-sm text-[#8496a5]">No enquiries have arrived yet.</p> : <div className="overflow-x-auto overscroll-x-contain"><table className="w-full min-w-[680px] text-left text-sm">
        <thead className="bg-[#f8fafb] text-xs uppercase tracking-wide text-[#667d90]"><tr><th className="px-6 py-4 font-semibold">Name</th><th className="px-6 py-4 font-semibold">Subject</th><th className="px-6 py-4 font-semibold">Date</th><th className="px-6 py-4 font-semibold">Status</th></tr></thead>
        <tbody className="divide-y divide-[#e6edf2]">{recentEnquiries.map((enquiry) => <tr key={enquiry._id} className="hover:bg-[#fbfcfd]"><td className="px-6 py-4"><p className="font-semibold text-[#173f61]">{enquiry.name}</p><p className="mt-1 text-xs text-[#8496a5]">{enquiry.email}</p></td><td className="px-6 py-4 text-[#526b80]">{enquiry.subject}</td><td className="px-6 py-4 text-[#667d90]">{new Date(enquiry.createdAt).toLocaleDateString()}</td><td className="px-6 py-4"><span className="rounded-full bg-[#e9f4fa] px-3 py-1 text-xs font-semibold capitalize text-[#176b98]">{enquiry.status}</span></td></tr>)}</tbody>
      </table></div>}
    </section>
  </section>;
};

export default AdminDashboard;
