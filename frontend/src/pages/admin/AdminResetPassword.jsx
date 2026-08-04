import { LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { resetAdminPassword } from "../../services/adminAuth";

const AdminResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setError("");
  };

  // Validate both new-password fields before requesting a database reset.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (formData.newPassword.length < 8) {
      setError("New password must contain at least 8 characters");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirmation do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await resetAdminPassword({
        email: formData.email,
        newPassword: formData.newPassword,
      });
      setSuccess(response.message);
      setTimeout(() => navigate("/admin/login", { replace: true }), 1500);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    "min-w-0 flex-1 bg-transparent py-3.5 text-sm text-[#173f61] outline-none placeholder:text-[#9aaab7]";
  const fieldWrapperClass =
    "mt-2 flex items-center gap-3 rounded-lg border border-[#cedce6] px-4 focus-within:border-[#2776a2] focus-within:ring-2 focus-within:ring-[#2776a2]/10";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f7fa] px-5 py-12 font-lexend">
      <section className="w-full max-w-[460px] rounded-[18px] border border-[#dce7ef] bg-white p-7 shadow-[0_24px_70px_rgba(6,61,107,0.12)] sm:p-9">
        <NavLink
          to="/admin/login"
          className="text-[13px] font-medium text-[#557086] hover:text-[#063d6b]"
        >
          &larr; Back to login
        </NavLink>

        <div className="mt-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#2776a2]">
            UNBAIQ Admin
          </p>
          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.03em] text-[#063d6b]">
            Reset password
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#667d90]">
            Enter the registered admin email and choose a new password.
          </p>
        </div>

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-[13px] font-medium text-[#244b67]">Admin email</span>
            <span className={fieldWrapperClass}>
              <Mail size={18} className="shrink-0 text-[#7690a4]" />
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@unbaiq.com"
                className={fieldClass}
                required
              />
            </span>
          </label>

          <label className="block">
            <span className="text-[13px] font-medium text-[#244b67]">New password</span>
            <span className={fieldWrapperClass}>
              <LockKeyhole size={18} className="shrink-0 text-[#7690a4]" />
              <input
                name="newPassword"
                type="password"
                autoComplete="new-password"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                className={fieldClass}
                required
              />
            </span>
          </label>

          <label className="block">
            <span className="text-[13px] font-medium text-[#244b67]">Confirm new password</span>
            <span className={fieldWrapperClass}>
              <LockKeyhole size={18} className="shrink-0 text-[#7690a4]" />
              <input
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter new password again"
                className={fieldClass}
                required
              />
            </span>
          </label>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700" role="status">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || Boolean(success)}
            className="w-full rounded-lg bg-[#063d6b] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#0a527f] disabled:cursor-not-allowed disabled:opacity-65"
          >
            {isSubmitting ? "Updating password..." : "Update password"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default AdminResetPassword;
