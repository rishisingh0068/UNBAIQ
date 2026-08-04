import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const profileRef = useRef(null);
  const admin = getStoredAdmin();
  const token = getAdminToken();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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

  // Close the profile dropdown when the admin clicks elsewhere.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

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
    setIsProfileOpen(false);
  };

  const navigationClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md border-l-[3px] px-4 py-3 text-sm font-medium transition-colors ${
      isActive
        ? "border-[#52b7d8] bg-white/10 text-white"
        : "border-transparent text-slate-300 hover:bg-white/6 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-[#f3f6f9] font-lexend text-[#173f61]">
      {/* Keep the header compact so the page title and profile remain visible. */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-[72px] items-center justify-between border-b border-[#dce5ec] bg-white px-4 shadow-sm sm:px-6 lg:left-[250px] lg:pl-6 lg:pr-8">
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
            <img src={logo} alt="UNBAIQ" className="h-9 w-auto max-w-[145px]" />
          </NavLink>
        </div>

        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen((current) => !current)}
              className="flex shrink-0 items-center gap-3 rounded-lg px-1.5 py-1.5 text-left transition-colors hover:bg-[#f3f6f9] sm:px-2"
            aria-expanded={isProfileOpen}
            aria-label="Open admin profile"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d7e1e8] bg-[#f3f6f8] text-sm font-bold uppercase text-[#34495c] sm:h-10 sm:w-10">
              {admin?.name?.charAt(0) || "A"}
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold text-[#173f61]">
                {admin?.name || "Admin"}
              </span>
              <span className="block text-xs capitalize text-[#8496a5]">
                {admin?.role || "admin"}
              </span>
            </span>
            <ChevronDown
              size={16}
              className={`hidden text-[#8496a5] transition-transform sm:block ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-[280px] overflow-hidden rounded-xl border border-[#dce5ec] bg-white shadow-[0_18px_50px_rgba(6,61,107,0.16)]">
              <div className="border-b border-[#e6edf2] p-5">
                <p className="font-semibold text-[#063d6b]">
                  {admin?.name || "Admin"}
                </p>
                <p className="mt-1 break-all text-xs text-[#667d90]">
                  {admin?.email}
                </p>
                <span className="mt-3 inline-flex rounded-full bg-[#edf2f5] px-3 py-1 text-[11px] font-semibold capitalize text-[#526b80]">
                  {admin?.role || "admin"}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-5 py-4 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut size={17} />
                Log out
              </button>
            </div>
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
        className={`fixed inset-y-0 left-0 z-[60] flex w-[250px] flex-col bg-[#202d3a] shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/10 px-5">
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

        <nav className="flex-1 space-y-2 px-4 py-5" aria-label="Admin navigation">
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
        </nav>

      </aside>

      <div className="min-h-screen pt-[72px] lg:pl-[250px]">
        <div className="p-5 sm:p-7 lg:p-8">
          <Outlet
            context={{
              enquiries,
              enquiriesError,
              setEnquiries,
              stats,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
