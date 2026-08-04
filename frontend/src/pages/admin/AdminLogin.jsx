import { useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

import { loginAdmin } from "../../services/adminAuth";
import { getAdminToken, saveAdminSession } from "../../utils/adminSession";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submit credentials to the backend and save the returned admin session.
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const session = await loginAdmin({ email, password });
      saveAdminSession(session);
      navigate("/admin/dashboard", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (getAdminToken()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f7fa] px-5 py-12 font-lexend">
      <section className="w-full max-w-[430px] rounded-[18px] border border-[#dce7ef] bg-white p-7 shadow-[0_24px_70px_rgba(6,61,107,0.12)] sm:p-9">
        <NavLink
          to="/"
          className="text-[13px] font-medium text-[#557086] transition-colors hover:text-[#063d6b]"
        >
          &larr; Back to website
        </NavLink>

        <div className="mt-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#2776a2]">
            UNBAIQ Admin
          </p>
          <h1 className="mt-2 text-[30px] font-semibold tracking-[-0.03em] text-[#063d6b]">
            Welcome back
          </h1>
          <p className="mt-2 text-[14px] leading-6 text-[#667d90]">
            Sign in to access the content management dashboard.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-[13px] font-medium text-[#244b67]">Email address</span>
            <span className="mt-2 flex items-center gap-3 rounded-[8px] border border-[#cedce6] px-4 focus-within:border-[#2776a2] focus-within:ring-2 focus-within:ring-[#2776a2]/10">
              <Mail size={18} className="shrink-0 text-[#7690a4]" />
              <input
                type="email"
                autoComplete="email"
                placeholder="admin@unbaiq.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="min-w-0 flex-1 bg-transparent py-3.5 text-[14px] text-[#173f61] outline-none placeholder:text-[#9aaab7]"
              />
            </span>
          </label>

          <label className="block">
            <span className="text-[13px] font-medium text-[#244b67]">Password</span>
            <span className="mt-2 flex items-center gap-3 rounded-[8px] border border-[#cedce6] px-4 focus-within:border-[#2776a2] focus-within:ring-2 focus-within:ring-[#2776a2]/10">
              <LockKeyhole size={18} className="shrink-0 text-[#7690a4]" />
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="min-w-0 flex-1 bg-transparent py-3.5 text-[14px] text-[#173f61] outline-none placeholder:text-[#9aaab7]"
              />
            </span>
          </label>

          {error && (
            <p
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-[8px] bg-[#063d6b] px-5 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#0a527f] disabled:cursor-not-allowed disabled:opacity-65"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-[12px] leading-5 text-[#8496a5]">
          Secure access for authorized UNBAIQ administrators only.
        </p>
      </section>
    </main>
  );
};

export default AdminLogin;
