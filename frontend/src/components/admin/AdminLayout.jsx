import {
  ChevronRight,
  BookOpenText,
  CircleHelp,
  ContactRound,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Newspaper,
  PanelsTopLeft,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import logo from "../../assets/logo/logo.svg";
import { getEnquiries } from "../../services/enquiry";
import {
  clearAdminSession,
  getAdminToken,
  getStoredAdmin,
} from "../../utils/adminSession";

const AdminLayout = () => {
  const navigate = useNavigate();
  const token = getAdminToken();
  const [admin, setAdmin] = useState(() => getStoredAdmin());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [enquiriesError, setEnquiriesError] = useState("");

  // Load enquiry data once for sidebar badges and dashboard overview cards.
  useEffect(() => {
    let active = true;

    getEnquiries(token)
      .then(({ enquiries: enquiryList }) => {
        if (active) {
          setEnquiries(enquiryList);
        }
      })
      .catch((requestError) => {
        if (active) {
          setEnquiriesError(requestError.message);
        }
      });

    return () => {
      active = false;
    };
  }, [token]);

  const stats = useMemo(
    () => ({
      total: enquiries.length,
      new: enquiries.filter((item) => item.status === "new").length,
      read: enquiries.filter((item) => item.status === "read").length,
      replied: enquiries.filter((item) => item.status === "replied").length,
    }),
    [enquiries],
  );

  // Remove the browser session before returning to the login screen.
  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin/login", { replace: true });
  };

  // Close mobile/profile panels when a navigation item is selected.
  const handleNavigation = () => {
    setIsSidebarOpen(false);
  };

  const navigationClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md border-l-[3px] px-4 py-3 text-sm font-medium transition-colors ${
      isActive
        ? "border-[#52b7d8] bg-white/10 text-white"
        : "border-transparent text-slate-300 hover:bg-white/6 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-[#f3f6f9] font-lexend text-[#173f61]">
      {/* Responsive header preserves usable logo/profile space from phones through desktop. */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-[#dce5ec] bg-white px-3 shadow-sm sm:h-[72px] sm:px-6 lg:left-[250px] lg:pl-6 lg:pr-8">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg border border-[#d8e3eb] p-2 text-[#526b80] hover:bg-[#f3f6f9] lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={21} />
          </button>
          <NavLink
            to="/admin/dashboard"
            onClick={handleNavigation}
            aria-label="UNBAIQ admin dashboard"
          >
            <img src={logo} alt="UNBAIQ" className="h-9 w-auto max-w-[125px] sm:h-12 sm:max-w-[185px]" />
          </NavLink>
        </div>

        {/* Show the saved admin photo beside the welcome message with an initial fallback. */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#8496a5]">Welcome</p>
            <p className="mt-0.5 text-sm font-semibold text-[#173f61]">{admin?.name || "Admin"}</p>
          </div>
          {admin?.avatar ? (
            <img
              src={admin.avatar}
              alt={`${admin.name || "Admin"} profile`}
              className="h-9 w-9 shrink-0 rounded-full border-2 border-[#e1eaf0] object-cover shadow-sm sm:h-11 sm:w-11"
            />
          ) : (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#e1eaf0] bg-[#f2f6f9] text-sm font-bold uppercase text-[#173f61] shadow-sm sm:h-11 sm:w-11">
              {admin?.name?.charAt(0) || "A"}
            </span>
          )}
        </div>
      </header>

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/45 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex w-[min(86vw,280px)] flex-col bg-[#202d3a] shadow-2xl transition-transform duration-300 lg:w-[250px] lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5 sm:h-[72px]">
          <div>
            <p className="text-sm font-semibold tracking-[0.08em] text-white">
              UNBAIQ ADMIN
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-slate-500">
              Management console
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-300 hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-4 sm:py-5" aria-label="Admin navigation">
          <NavLink
            to="/admin/dashboard"
            onClick={handleNavigation}
            className={navigationClass}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/enquiries"
            onClick={handleNavigation}
            className={navigationClass}
          >
            <MessageSquare size={19} />
            <span>Enquiries</span>
            {stats.new > 0 && (
              <span className="ml-auto min-w-6 rounded-full bg-red-500 px-2 py-0.5 text-center text-[11px] font-bold text-white">
                {stats.new}
              </span>
            )}
          </NavLink>
          <NavLink
            to="/admin/hero-section"
            onClick={handleNavigation}
            className={navigationClass}
          >
            <PanelsTopLeft size={19} />
            <span>Hero Slider</span>
          </NavLink>
          <NavLink
            to="/admin/blogs"
            onClick={handleNavigation}
            className={navigationClass}
          >
            <Newspaper size={19} />
            <span>Blogs</span>
          </NavLink>
          <NavLink
            to="/admin/success-stories"
            onClick={handleNavigation}
            className={navigationClass}
          >
            <BookOpenText size={19} />
            <span>Success Stories</span>
          </NavLink>
          <NavLink
            to="/admin/faqs"
            onClick={handleNavigation}
            className={navigationClass}
          >
            <CircleHelp size={19} />
            <span>FAQs</span>
          </NavLink>
          {/* Open the singleton editor for the public Get in Touch information. */}
          <NavLink
            to="/admin/contact-content"
            onClick={handleNavigation}
            className={navigationClass}
          >
            <ContactRound size={19} />
            <span>Contact Content</span>
          </NavLink>
        </nav>

        {/* Bottom account area opens the full profile page and keeps logout accessible. */}
        <div className="border-t border-white/10 p-4">
          <NavLink to="/admin/profile" onClick={handleNavigation} className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/10">
            {admin?.avatar ? <img src={admin.avatar} alt={`${admin.name} profile`} className="h-10 w-10 shrink-0 rounded-full border border-white/15 object-cover" /> : <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-bold uppercase text-white">{admin?.name?.charAt(0) || "A"}</span>}
            <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-white">{admin?.name || "Admin"}</span><span className="block truncate text-[11px] capitalize text-slate-400">{admin?.role || "admin"}</span></span>
            <ChevronRight size={16} className="text-slate-400" />
          </NavLink>
          <button type="button" onClick={handleLogout} className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-300"><LogOut size={15} /> Log out</button>
        </div>

      </aside>

      <div className="min-h-screen pt-16 sm:pt-[72px] lg:pl-[250px]">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet
            context={{
              enquiries,
              enquiriesError,
              setEnquiries,
              stats,
              setAdmin,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
