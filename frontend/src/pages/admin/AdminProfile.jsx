import { Camera, Save, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { getCurrentAdmin, updateCurrentAdmin, uploadCurrentAdminAvatar } from "../../services/adminAuth";
import { getAdminToken, updateStoredAdmin } from "../../utils/adminSession";

const formatDate = (value) => value ? new Date(value).toLocaleString() : "Not available";

const AdminProfile = () => {
  const token = getAdminToken();
  const { setAdmin } = useOutletContext();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", avatar: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Always load current database details instead of relying only on session storage.
  useEffect(() => {
    let active = true;
    getCurrentAdmin(token)
      .then(({ admin }) => {
        if (!active) return;
        setProfile(admin);
        setForm({ name: admin.name, email: admin.email, avatar: admin.avatar || "" });
        setPreview(admin.avatar || "");
        updateStoredAdmin(admin);
        setAdmin(admin);
      })
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, [setAdmin, token]);

  // Validate and preview a local photo before the profile is saved.
  const handleImage = (event) => {
    const image = event.target.files?.[0];
    if (!image) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.type) || image.size > 5 * 1024 * 1024) {
      setError("Choose a JPG, PNG or WEBP profile photo up to 5 MB");
      event.target.value = "";
      return;
    }
    setSelectedImage(image);
    setPreview(URL.createObjectURL(image));
    setError("");
    setSuccess("");
  };

  // Save editable fields and immediately refresh every visible profile location.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");
    try {
      let avatar = form.avatar;
      if (selectedImage) avatar = (await uploadCurrentAdminAvatar(token, selectedImage)).avatar;
      const { admin, message } = await updateCurrentAdmin(token, { ...form, avatar });
      setProfile(admin);
      setForm({ name: admin.name, email: admin.email, avatar: admin.avatar || "" });
      setPreview(admin.avatar || "");
      setSelectedImage(null);
      updateStoredAdmin(admin);
      setAdmin(admin);
      setSuccess(message);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = "mt-2 w-full rounded-lg border border-[#cedce6] bg-white px-4 py-3 text-sm text-[#173f61] outline-none focus:border-[#2776a2] focus:ring-2 focus:ring-[#2776a2]/10";
  if (isLoading) return <p className="text-sm text-[#667d90]">Loading admin profile...</p>;
  if (!profile) return <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error || "Unable to load admin profile"}</p>;

  return <section className="mx-auto max-w-5xl">
    {/* Profile columns, padding, and save action adapt from phones to desktop. */}
    <header><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8496a5]">Account settings</p><h2 className="mt-1 text-2xl font-semibold text-[#063d6b]">Admin Profile</h2><p className="mt-1 text-sm text-[#667d90]">View account information and update your personal details.</p></header>

    <div className="mt-7 grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-xl border border-[#dce5ec] bg-white p-5 text-center shadow-sm sm:p-6">
        {preview ? <img src={preview} alt={`${profile.name} profile`} className="mx-auto h-24 w-24 rounded-full border-4 border-[#eef3f6] object-cover shadow-sm" /> : <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#cddbe5] bg-[#f1f5f8] text-2xl font-bold uppercase text-[#274860]">{profile.name?.charAt(0) || "A"}</span>}
        <h3 className="mt-4 text-lg font-semibold text-[#173f61]">{profile.name}</h3>
        <p className="mt-1 break-all text-xs text-[#8496a5]">{profile.email}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#e9f4fa] px-3 py-1 text-xs font-semibold capitalize text-[#176b98]"><ShieldCheck size={14} /> {profile.role}</span>
        <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#063d6b] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0a527f]"><Camera size={15} /> {profile.avatar ? "Change photo" : "Upload photo"}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImage} className="sr-only" /></label>
        <p className="mt-2 text-[10px] text-[#8496a5]">JPG, PNG or WEBP · Max 5 MB</p>
      </aside>

      <form onSubmit={handleSubmit} className="min-w-0 rounded-xl border border-[#dce5ec] bg-white p-5 shadow-sm sm:p-8">
        <div className="flex items-center gap-3 border-b border-[#e6edf2] pb-5"><span className="rounded-lg bg-[#e9f4fa] p-2.5 text-[#176b98]"><UserRound size={20} /></span><div><h3 className="font-semibold text-[#063d6b]">Account information</h3><p className="mt-0.5 text-xs text-[#8496a5]">Name and email can be updated.</p></div></div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <label className="block"><span className="text-sm font-medium text-[#244b67]">Full name *</span><input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className={inputClass} required /></label>
          <label className="block"><span className="text-sm font-medium text-[#244b67]">Email address *</span><input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className={inputClass} required /></label>
          <label className="block"><span className="text-sm font-medium text-[#244b67]">Role</span><input value={profile.role} className={`${inputClass} bg-[#f3f6f8] capitalize`} readOnly /></label>
          <label className="block"><span className="text-sm font-medium text-[#244b67]">Admin ID</span><input value={profile.id} className={`${inputClass} bg-[#f3f6f8]`} readOnly /></label>
          <div className="rounded-lg bg-[#f7fafc] p-4"><p className="text-xs font-semibold uppercase tracking-wide text-[#8496a5]">Account created</p><p className="mt-2 text-sm font-medium text-[#526b80]">{formatDate(profile.createdAt)}</p></div>
          <div className="rounded-lg bg-[#f7fafc] p-4"><p className="text-xs font-semibold uppercase tracking-wide text-[#8496a5]">Last updated</p><p className="mt-2 text-sm font-medium text-[#526b80]">{formatDate(profile.updatedAt)}</p></div>
        </div>
        {error && <p className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {success && <p className="mt-5 rounded-lg bg-green-50 p-4 text-sm text-green-700">{success}</p>}
        <div className="mt-6 flex justify-end"><button type="submit" disabled={isSaving} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#063d6b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0a527f] disabled:opacity-60 sm:w-auto"><Save size={17} /> {isSaving ? "Saving..." : "Save changes"}</button></div>
      </form>
    </div>
  </section>;
};

export default AdminProfile;
