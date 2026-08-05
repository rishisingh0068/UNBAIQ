import { Building2, Clock3, Mail, MapPin, Phone, Save } from "lucide-react";
import { useEffect, useState } from "react";

import { defaultContactContent, getAdminContactContent, saveAdminContactContent } from "../../services/contactContent";
import { getAdminToken } from "../../utils/adminSession";

const AdminContactContent = () => {
  const token = getAdminToken();
  const [form, setForm] = useState(defaultContactContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load the singleton record so every field starts with the current website value.
  useEffect(() => {
    let active = true;
    getAdminContactContent(token)
      .then(({ content }) => active && setForm({ ...defaultContactContent, ...content }))
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, [token]);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
    setSuccess("");
  };

  // Save all fields together so the public contact block always stays complete.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");
    try {
      const { content, message } = await saveAdminContactContent(token, form);
      setForm({ ...defaultContactContent, ...content });
      setSuccess(message);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = "mt-2 w-full rounded-lg border border-[#cedce6] bg-white px-4 py-3 text-sm text-[#173f61] outline-none transition focus:border-[#2776a2] focus:ring-2 focus:ring-[#2776a2]/10";
  const sectionClass = "rounded-xl border border-[#dce5ec] bg-white p-5 shadow-sm sm:p-6";

  if (isLoading) return <p className="text-sm text-[#667d90]">Loading contact content...</p>;

  return <section className="mx-auto max-w-6xl">
    {/* Contact editor uses compact mobile cards and full-width phone actions. */}
    <header><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8496a5]">Website content</p><h2 className="mt-1 text-2xl font-semibold text-[#063d6b]">Contact Content</h2><p className="mt-1 text-sm text-[#667d90]">Update the information displayed beside the Let&apos;s Talk enquiry form.</p></header>

    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
      {/* Introductory copy remains structurally fixed while its text is fully editable. */}
      <div className={sectionClass}><div className="mb-5 flex items-center gap-3"><span className="rounded-lg bg-[#e9f4fa] p-2.5 text-[#176b98]"><Mail size={19} /></span><div><h3 className="font-semibold text-[#063d6b]">Section introduction</h3><p className="text-xs text-[#8496a5]">Main heading and supporting lines</p></div></div><div className="grid gap-5"><label><span className="text-sm font-medium text-[#244b67]">Heading *</span><input name="heading" value={form.heading} onChange={updateField} className={inputClass} required /></label><label><span className="text-sm font-medium text-[#244b67]">Description line 1 *</span><input name="descriptionOne" value={form.descriptionOne} onChange={updateField} className={inputClass} required /></label><label><span className="text-sm font-medium text-[#244b67]">Description line 2 *</span><input name="descriptionTwo" value={form.descriptionTwo} onChange={updateField} className={inputClass} required /></label></div></div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className={sectionClass}><div className="mb-5 flex items-center gap-3"><MapPin size={20} className="text-[#176b98]" /><h3 className="font-semibold text-[#063d6b]">India office</h3></div><label><span className="text-sm font-medium text-[#244b67]">Label *</span><input name="indiaLabel" value={form.indiaLabel} onChange={updateField} className={inputClass} required /></label><label className="mt-5 block"><span className="text-sm font-medium text-[#244b67]">Address *</span><textarea name="indiaAddress" value={form.indiaAddress} onChange={updateField} rows={3} className={`${inputClass} resize-y`} required /></label></div>
        <div className={sectionClass}><div className="mb-5 flex items-center gap-3"><Building2 size={20} className="text-[#176b98]" /><h3 className="font-semibold text-[#063d6b]">Dubai office</h3></div><label><span className="text-sm font-medium text-[#244b67]">Label *</span><input name="dubaiLabel" value={form.dubaiLabel} onChange={updateField} className={inputClass} required /></label><label className="mt-5 block"><span className="text-sm font-medium text-[#244b67]">Address *</span><textarea name="dubaiAddress" value={form.dubaiAddress} onChange={updateField} rows={3} className={`${inputClass} resize-y`} required /></label></div>
        <div className={sectionClass}><div className="mb-5 flex items-center gap-3"><Clock3 size={20} className="text-[#176b98]" /><h3 className="font-semibold text-[#063d6b]">Availability</h3></div><div className="grid gap-5"><label><span className="text-sm font-medium text-[#244b67]">Label *</span><input name="availabilityLabel" value={form.availabilityLabel} onChange={updateField} className={inputClass} required /></label><label><span className="text-sm font-medium text-[#244b67]">Working hours *</span><input name="workingHours" value={form.workingHours} onChange={updateField} className={inputClass} required /></label><label><span className="text-sm font-medium text-[#244b67]">Holiday text *</span><input name="holidayText" value={form.holidayText} onChange={updateField} className={inputClass} required /></label></div></div>
        <div className={sectionClass}><div className="mb-5 flex items-center gap-3"><Phone size={20} className="text-[#176b98]" /><h3 className="font-semibold text-[#063d6b]">Contact details</h3></div><div className="grid gap-5"><label><span className="text-sm font-medium text-[#244b67]">Label *</span><input name="contactLabel" value={form.contactLabel} onChange={updateField} className={inputClass} required /></label><label><span className="text-sm font-medium text-[#244b67]">Phone *</span><input name="phone" value={form.phone} onChange={updateField} className={inputClass} required /></label><label><span className="text-sm font-medium text-[#244b67]">Email *</span><input type="email" name="email" value={form.email} onChange={updateField} className={inputClass} required /></label></div></div>
      </div>

      {error && <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</p>}
      {success && <p className="rounded-lg bg-green-50 p-4 text-sm text-green-700" role="status">{success}</p>}
      <div className="flex justify-end"><button type="submit" disabled={isSaving} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#063d6b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0a527f] disabled:opacity-60 sm:w-auto"><Save size={17} /> {isSaving ? "Saving..." : "Save changes"}</button></div>
    </form>
  </section>;
};

export default AdminContactContent;
