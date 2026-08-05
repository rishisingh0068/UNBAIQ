import { ArrowLeft, ImagePlus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { heroSlides } from "../../data/heroSlides";
import { createHeroSlide, getAdminHeroSlide, getAdminHeroSlides, updateHeroSlide, uploadHeroImage } from "../../services/heroSlide";
import { getAdminToken } from "../../utils/adminSession";

const initialForm = { title: "", altText: "", image: "", order: 1, active: true };
const legacyImages = Object.fromEntries(heroSlides.map((slide) => [slide.id, slide.image]));

const AdminHeroSlideForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = getAdminToken();
  const isEditing = Boolean(id);
  const [form, setForm] = useState(initialForm);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // Load an existing slide for edit, or calculate the next order for a new slide.
  useEffect(() => {
    let active = true;
    const request = isEditing ? getAdminHeroSlide(token, id) : getAdminHeroSlides(token);
    request.then((data) => {
      if (!active) return;
      if (isEditing) {
        const slide = data.slide;
        setForm({ title: slide.title, altText: slide.altText, image: slide.image || "", order: slide.order, active: slide.active });
        setPreview(slide.image || legacyImages[slide.legacyImageKey] || "");
      } else {
        setForm((current) => ({ ...current, order: data.slides.length + 1 }));
      }
    }).catch((requestError) => active && setError(requestError.message)).finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, [id, isEditing, token]);

  // Validate and preview a selected local image before upload.
  const handleImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) {
      setError("Choose a JPG, PNG or WEBP image up to 10 MB");
      event.target.value = "";
      return;
    }
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setError("");
  };

  // Upload a replacement only when selected, then return to the slide list.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      let image = form.image;
      if (selectedImage) image = (await uploadHeroImage(token, selectedImage)).image;
      const data = { ...form, image, order: Number(form.order) };
      if (isEditing) await updateHeroSlide(token, id, data);
      else await createHeroSlide(token, data);
      navigate("/admin/hero-section", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = "mt-2 w-full rounded-lg border border-[#cedce6] bg-white px-4 py-3 text-sm text-[#173f61] outline-none focus:border-[#2776a2] focus:ring-2 focus:ring-[#2776a2]/10";
  if (isLoading) return <p className="text-sm text-[#667d90]">Loading slide editor...</p>;

  return <section className="mx-auto max-w-5xl">
    <NavLink to="/admin/hero-section" className="inline-flex items-center gap-2 text-sm font-semibold text-[#176b98]"><ArrowLeft size={17} /> Back to Hero Slider</NavLink>
    <header className="mt-5"><h2 className="text-2xl font-semibold text-[#063d6b]">{isEditing ? "Edit hero slide" : "Add new hero slide"}</h2><p className="mt-1 text-sm text-[#667d90]">Image and text styling remain fixed on the public website.</p></header>
    {/* Editor padding and save action scale cleanly from phone to desktop. */}
    <form onSubmit={handleSubmit} className="mt-5 rounded-xl border border-[#dce5ec] bg-white p-4 shadow-sm sm:mt-7 sm:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block md:col-span-2"><span className="text-sm font-medium text-[#244b67]">Slide text *</span><textarea value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} rows={4} className={`${inputClass} resize-y`} required /></label>
        <label className="block"><span className="text-sm font-medium text-[#244b67]">Image alt text *</span><input value={form.altText} onChange={(event) => setForm({ ...form, altText: event.target.value })} className={inputClass} required /></label>
        <label className="block"><span className="text-sm font-medium text-[#244b67]">Display order *</span><input type="number" min="1" value={form.order} onChange={(event) => setForm({ ...form, order: event.target.value })} className={inputClass} required /></label>
        <label className="block md:col-span-2"><span className="text-sm font-medium text-[#244b67]">Slide image {isEditing ? "(optional replacement)" : "*"}</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImage} required={!isEditing} className={`${inputClass} file:mr-4 file:rounded-md file:border-0 file:bg-[#e9f4fa] file:px-4 file:py-2 file:font-semibold file:text-[#176b98]`} />{preview ? <img src={preview} alt="Hero preview" className="mt-4 h-64 w-full rounded-xl object-cover" /> : <div className="mt-4 flex h-48 items-center justify-center rounded-xl border border-dashed text-[#8496a5]"><ImagePlus size={32} /></div>}</label>
        <label className="flex items-center gap-3 text-sm font-medium text-[#244b67] md:col-span-2"><input type="checkbox" checked={form.active} onChange={(event) => setForm({ ...form, active: event.target.checked })} /> Published</label>
      </div>
      {error && <p className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      <div className="mt-6 flex justify-end"><button type="submit" disabled={isSaving} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#063d6b] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60 sm:w-auto"><Save size={17} /> {isSaving ? "Saving..." : "Save slide"}</button></div>
    </form>
  </section>;
};

export default AdminHeroSlideForm;
