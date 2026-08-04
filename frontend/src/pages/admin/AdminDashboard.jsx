import { LogOut, MessageSquare, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { getEnquiryStats } from "../../services/enquiry";
import {
  clearAdminSession,
  getAdminToken,
  getStoredAdmin,
} from "../../utils/adminSession";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const admin = getStoredAdmin();
  const token = getAdminToken();
  const [enquiryStats, setEnquiryStats] = useState({ total: 0, new: 0 });
  const [statsError, setStatsError] = useState("");

  // Load enquiry totals whenever an authenticated admin opens the dashboard.
  useEffect(() => {
    let active = true;

    getEnquiryStats(token)
      .then(({ stats }) => {
        if (active) {
          setEnquiryStats(stats);
        }
      })
      .catch((requestError) => {
        if (active) {
          setStatsError(requestError.message);
        }
      });

    return () => {
      active = false;
    };
  }, [token]);

  // Clear the local session before returning to the login page.
  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin/login", { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#f3f7fa] px-5 py-10 font-lexend sm:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 rounded-[18px] border border-[#dce7ef] bg-white p-6 shadow-[0_18px_55px_rgba(6,61,107,0.08)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <span className="rounded-xl bg-[#e9f4fa] p-3 text-[#176b98]">
              <ShieldCheck size={28} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2776a2]">
                UNBAIQ Admin
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-[#063d6b]">
                Welcome, {admin?.name || "Admin"}
              </h1>
              <p className="mt-1 text-sm text-[#667d90]">
                {admin?.email} · {admin?.role}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#cbdbe6] px-4 py-2.5 text-sm font-semibold text-[#244b67] transition-colors hover:bg-[#f3f7fa]"
          >
            <LogOut size={17} />
            Log out
          </button>
        </header>

        <section className="mt-7">
          <h2 className="text-lg font-semibold text-[#063d6b]">Content inbox</h2>

          {statsError && (
            <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
              {statsError}
            </p>
          )}

          <NavLink
            to="/admin/enquiries"
            className="mt-4 flex max-w-md items-center justify-between rounded-[18px] border border-[#dce7ef] bg-white p-6 shadow-[0_12px_35px_rgba(6,61,107,0.06)] transition-transform hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-4">
              <span className="rounded-xl bg-[#e9f4fa] p-3 text-[#176b98]">
                <MessageSquare size={24} />
              </span>
              <span>
                <span className="block font-semibold text-[#063d6b]">Enquiries</span>
                <span className="mt-1 block text-sm text-[#667d90]">
                  {enquiryStats.total} total received
                </span>
              </span>
            </span>

            {enquiryStats.new > 0 && (
              <span className="min-w-8 rounded-full bg-red-600 px-2.5 py-1 text-center text-xs font-bold text-white">
                {enquiryStats.new}
              </span>
            )}
          </NavLink>
        </section>
      </section>
    </main>
  );
};

export default AdminDashboard;
