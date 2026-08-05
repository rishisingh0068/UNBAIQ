import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { createAdminFaq, getAdminFaq, getAdminFaqs, updateAdminFaq } from "../../services/faq";
import { getAdminToken } from "../../utils/adminSession";

const initialForm = { question: "", answer: "", order: 1, active: true };

const AdminFaqForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = getAdminToken();
  const isEditing = Boolean(id);
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // Load an existing FAQ for edit, or calculate the next order for a new FAQ.
  useEffect(() => {
    let active = true;
    const request = isEditing ? getAdminFaq(token, id) : getAdminFaqs(token);
    request.then((data) => {
      if (!active) return;
      if (isEditing) {
        const faq = data.faq;
        setForm({ question: faq.question, answer: faq.answer, order: faq.order, active: faq.active });
      } else {
        setForm((current) => ({ ...current, order: data.faqs.length + 1 }));
      }
    }).catch((requestError) => active && setError(requestError.message)).finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, [id, isEditing, token]);

  // Save the fixed question/answer structure and return to the FAQ list.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      const data = { ...form, order: Number(form.order) };
      if (isEditing) await updateAdminFaq(token, id, data);
      else await createAdminFaq(token, data);
      navigate("/admin/faqs", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = "mt-2 w-full rounded-lg border border-[#cedce6] bg-white px-4 py-3 text-sm text-[#173f61] outline-none focus:border-[#2776a2] focus:ring-2 focus:ring-[#2776a2]/10";
  if (isLoading) return <p className="text-sm text-[#667d90]">Loading FAQ editor...</p>;

  return <section className="mx-auto max-w-5xl">
    <NavLink to="/admin/faqs" className="inline-flex items-center gap-2 text-sm font-semibold text-[#176b98]"><ArrowLeft size={17} /> Back to FAQs</NavLink>
    <header className="mt-5"><h2 className="text-2xl font-semibold text-[#063d6b]">{isEditing ? "Edit FAQ" : "Add new FAQ"}</h2><p className="mt-1 text-sm text-[#667d90]">The public accordion design remains fixed.</p></header>
    {/* FAQ editor uses compact phone padding and a full-width mobile save action. */}
    <form onSubmit={handleSubmit} className="mt-5 rounded-xl border border-[#dce5ec] bg-white p-4 shadow-sm sm:mt-7 sm:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block md:col-span-2"><span className="text-sm font-medium text-[#244b67]">Question *</span><textarea value={form.question} onChange={(event) => setForm({ ...form, question: event.target.value })} rows={3} className={`${inputClass} resize-y`} required /></label>
        <label className="block md:col-span-2"><span className="text-sm font-medium text-[#244b67]">Answer *</span><textarea value={form.answer} onChange={(event) => setForm({ ...form, answer: event.target.value })} rows={8} className={`${inputClass} resize-y`} required /></label>
        <label className="block"><span className="text-sm font-medium text-[#244b67]">Display order *</span><input type="number" min="1" value={form.order} onChange={(event) => setForm({ ...form, order: event.target.value })} className={inputClass} required /></label>
        <label className="flex items-center gap-3 self-end pb-3 text-sm font-medium text-[#244b67]"><input type="checkbox" checked={form.active} onChange={(event) => setForm({ ...form, active: event.target.checked })} /> Published</label>
      </div>
      {error && <p className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      <div className="mt-6 flex justify-end"><button type="submit" disabled={isSaving} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#063d6b] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60 sm:w-auto"><Save size={17} /> {isSaving ? "Saving..." : "Save FAQ"}</button></div>
    </form>
  </section>;
};

export default AdminFaqForm;
