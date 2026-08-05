import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { heroSlides } from "../../data/heroSlides";
import { deleteHeroSlide, getAdminHeroSlides, updateHeroSlide } from "../../services/heroSlide";
import { getAdminToken } from "../../utils/adminSession";

const legacyImages = Object.fromEntries(heroSlides.map((slide) => [slide.id, slide.image]));
const getSlideImage = (slide) => slide.image || legacyImages[slide.legacyImageKey] || "";

const AdminHeroSlides = () => {
  const token = getAdminToken();
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [changingId, setChangingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");

  // Load active and inactive slides for the list-only management page.
  useEffect(() => {
    let active = true;
    getAdminHeroSlides(token)
      .then(({ slides: list }) => active && setSlides(list))
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, [token]);

  // Publish or unpublish without opening the separate editor.
  const toggleStatus = async (slide) => {
    setChangingId(slide._id);
    setError("");
    try {
      const { slide: updatedSlide } = await updateHeroSlide(token, slide._id, { ...slide, active: !slide.active });
      setSlides((current) => current.map((item) => item._id === slide._id ? updatedSlide : item));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setChangingId("");
    }
  };

  // Permanently delete a slide only after explicit confirmation.
  const handleDelete = async (slide) => {
    if (!window.confirm(`Delete hero slide "${slide.title.replace(/\s+/g, " ").trim()}"?`)) return;
    setDeletingId(slide._id);
    setError("");
    try {
      await deleteHeroSlide(token, slide._id);
      setSlides((current) => current.filter((item) => item._id !== slide._id));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDeletingId("");
    }
  };

  return <section className="mx-auto max-w-[1500px]">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-2xl font-semibold text-[#063d6b]">Hero Slider</h2><p className="mt-1 text-sm text-[#667d90]">Manage slide content, publishing and display order.</p></div><NavLink to="/admin/hero-section/new" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#063d6b] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0a527f]"><Plus size={18} /> Add new slide</NavLink></header>
    {error && <p className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    {isLoading ? <p className="mt-7 text-sm text-[#667d90]">Loading hero slides...</p> : <div className="mt-7 overflow-hidden rounded-xl border border-[#dce5ec] bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm">
      <thead className="bg-[#f8fafb] text-xs uppercase tracking-wide text-[#667d90]"><tr><th className="px-5 py-4 font-semibold">Image</th><th className="px-5 py-4 font-semibold">Title</th><th className="px-5 py-4 font-semibold">Order</th><th className="px-5 py-4 font-semibold">Status</th><th className="px-5 py-4 text-right font-semibold">Actions</th></tr></thead>
      <tbody className="divide-y divide-[#e6edf2]">{slides.map((slide) => <tr key={slide._id} className="hover:bg-[#fbfcfd]">
        <td className="px-5 py-4">{getSlideImage(slide) ? <img src={getSlideImage(slide)} alt={slide.altText} className="h-16 w-28 rounded-lg object-cover" /> : <div className="flex h-16 w-28 items-center justify-center rounded-lg bg-[#eef3f6] text-xs text-[#667d90]">No image</div>}</td>
        <td className="px-5 py-4"><p className="max-w-sm whitespace-pre-line font-semibold text-[#173f61]">{slide.title}</p></td><td className="px-5 py-4 text-[#526b80]">{slide.order}</td>
        <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${slide.active ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{slide.active ? "Published" : "Unpublished"}</span></td>
        <td className="px-5 py-4"><div className="flex justify-end gap-2"><button type="button" onClick={() => toggleStatus(slide)} disabled={changingId === slide._id} className="rounded-lg bg-[#f1f4f6] px-3 py-2 text-xs font-semibold text-[#526b80] disabled:opacity-60">{changingId === slide._id ? "Updating..." : slide.active ? "Unpublish" : "Publish"}</button><NavLink to={`/admin/hero-section/${slide._id}/edit`} className="inline-flex items-center gap-2 rounded-lg bg-[#e9f4fa] px-3 py-2 text-xs font-semibold text-[#176b98]"><Pencil size={15} /> Edit</NavLink><button type="button" onClick={() => handleDelete(slide)} disabled={deletingId === slide._id} className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 disabled:opacity-60"><Trash2 size={15} /> {deletingId === slide._id ? "Deleting..." : "Delete"}</button></div></td>
      </tr>)}</tbody>
    </table></div></div>}
  </section>;
};

export default AdminHeroSlides;
