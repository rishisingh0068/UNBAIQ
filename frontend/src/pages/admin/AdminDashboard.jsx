import { LogOut, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  clearAdminSession,
  getStoredAdmin,
} from "../../utils/adminSession";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const admin = getStoredAdmin();

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

        <section className="mt-7 rounded-[18px] border border-dashed border-[#b9cedc] bg-white/70 p-8 text-center sm:p-12">
          <h2 className="text-xl font-semibold text-[#063d6b]">
            Dashboard foundation is ready
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#667d90]">
            Content management modules for success stories, services, and website
            sections will be added here next.
          </p>
        </section>
      </section>
    </main>
  );
};

export default AdminDashboard;
