import { HelpCircle, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { deleteAdminFaq, getAdminFaqs, updateAdminFaq } from "../../services/faq";
import { getAdminToken } from "../../utils/adminSession";

const AdminFaqs = () => {
  const token = getAdminToken();
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [changingId, setChangingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");

  // Load active and inactive FAQs for the list-only management page.
  useEffect(() => {
    let active = true;
    getAdminFaqs(token).then(({ faqs: list }) => active && setFaqs(list)).catch((requestError) => active && setError(requestError.message)).finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, [token]);

  // Publish or unpublish without opening the separate editor.
  const toggleStatus = async (faq) => {
    setChangingId(faq._id);
    setError("");
    try {
      const { faq: updatedFaq } = await updateAdminFaq(token, faq._id, { ...faq, active: !faq.active });
      setFaqs((current) => current.map((item) => item._id === faq._id ? updatedFaq : item));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setChangingId("");
    }
  };

  // Permanently delete a FAQ only after explicit confirmation.
  const handleDelete = async (faq) => {
    if (!window.confirm(`Delete FAQ "${faq.question}"?`)) return;
    setDeletingId(faq._id);
    setError("");
    try {
      await deleteAdminFaq(token, faq._id);
      setFaqs((current) => current.filter((item) => item._id !== faq._id));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDeletingId("");
    }
  };

  return <section className="mx-auto max-w-[1500px]">
    {/* Full-width phone action and touch scrolling keep FAQ controls accessible. */}
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-2xl font-semibold text-[#063d6b]">FAQs</h2><p className="mt-1 text-sm text-[#667d90]">Manage questions shared across website FAQ sections.</p></div><NavLink to="/admin/faqs/new" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#063d6b] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0a527f] sm:w-auto"><Plus size={18} /> Add new FAQ</NavLink></header>
    {error && <p className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    {isLoading ? <p className="mt-7 text-sm text-[#667d90]">Loading FAQs...</p> : faqs.length === 0 ? <div className="mt-7 rounded-xl border border-dashed border-[#b9cedc] bg-white p-10 text-center"><HelpCircle className="mx-auto text-[#8496a5]" /><p className="mt-3 text-sm text-[#667d90]">No FAQs found.</p></div> : <div className="mt-7 overflow-hidden rounded-xl border border-[#dce5ec] bg-white shadow-sm"><div className="overflow-x-auto overscroll-x-contain"><table className="w-full min-w-[900px] text-left text-sm">
      <thead className="bg-[#f8fafb] text-xs uppercase tracking-wide text-[#667d90]"><tr><th className="px-5 py-4 font-semibold">Question</th><th className="px-5 py-4 font-semibold">Answer</th><th className="px-5 py-4 font-semibold">Order</th><th className="px-5 py-4 font-semibold">Status</th><th className="px-5 py-4 text-right font-semibold">Actions</th></tr></thead>
      <tbody className="divide-y divide-[#e6edf2]">{faqs.map((faq) => <tr key={faq._id} className="hover:bg-[#fbfcfd]"><td className="px-5 py-4"><p className="max-w-xs font-semibold text-[#173f61]">{faq.question}</p></td><td className="px-5 py-4"><p className="max-w-md line-clamp-3 leading-6 text-[#667d90]">{faq.answer}</p></td><td className="px-5 py-4 text-[#526b80]">{faq.order}</td><td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${faq.active ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{faq.active ? "Published" : "Unpublished"}</span></td><td className="px-5 py-4"><div className="flex flex-wrap justify-end gap-2"><button type="button" onClick={() => toggleStatus(faq)} disabled={changingId === faq._id} className="rounded-lg bg-[#f1f4f6] px-3 py-2 text-xs font-semibold text-[#526b80] disabled:opacity-60">{changingId === faq._id ? "Updating..." : faq.active ? "Unpublish" : "Publish"}</button><NavLink to={`/admin/faqs/${faq._id}/edit`} className="inline-flex items-center gap-2 rounded-lg bg-[#e9f4fa] px-3 py-2 text-xs font-semibold text-[#176b98]"><Pencil size={15} /> Edit</NavLink><button type="button" onClick={() => handleDelete(faq)} disabled={deletingId === faq._id} className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 disabled:opacity-60"><Trash2 size={15} /> {deletingId === faq._id ? "Deleting..." : "Delete"}</button></div></td></tr>)}</tbody>
    </table></div></div>}
  </section>;
};

export default AdminFaqs;
