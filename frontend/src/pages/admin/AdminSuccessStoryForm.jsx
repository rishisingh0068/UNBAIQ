import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import {
  createAdminSuccessStory,
  getAdminSuccessStory,
  updateAdminSuccessStory,
  uploadAdminSuccessStoryImage,
} from "../../services/successStory";
import { getAdminToken } from "../../utils/adminSession";

const initialForm = {
  title: "", description: "", industry: "", timeline: "", platform: "",
  coverImage: "", imageAlt: "", challenge: "", approach: "", resultsText: "",
  testimonial: "", clientName: "", clientDesignation: "", companyName: "", status: "draft",
};

const AdminSuccessStoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = getAdminToken();
  const isEditing = Boolean(id);
  const [form, setForm] = useState(initialForm);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // Fill the same fixed form when an existing story is edited.
  useEffect(() => {
    if (!isEditing) return undefined;
    let active = true;
    getAdminSuccessStory(token, id)
      .then(({ story }) => {
        if (!active) return;
        setForm({ ...story, resultsText: story.results.join("\n") });
        setPreview(story.coverImage);
      })
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, [id, isEditing, token]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  };

  // Validate a local cover image and preview it before saving.
  const handleImage = (event) => {
    const image = event.target.files?.[0];
    if (!image) return;
    // Accept SVG story covers alongside the existing raster formats.
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'].includes(image.type) || image.size > 10 * 1024 * 1024) {
      setError("Choose a JPG, PNG, WEBP or SVG image up to 10 MB");
      event.target.value = "";
      return;
    }
    setSelectedImage(image);
    setPreview(URL.createObjectURL(image));
    setError("");
  };

  // Upload the image first and convert one-result-per-line text into a structured array.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      let coverImage = form.coverImage;
      if (selectedImage) coverImage = (await uploadAdminSuccessStoryImage(token, selectedImage)).coverImage;
      const data = {
        ...form,
        coverImage,
        results: form.resultsText.split("\n").map((item) => item.trim()).filter(Boolean),
      };
      if (isEditing) await updateAdminSuccessStory(token, id, data);
      else await createAdminSuccessStory(token, data);
      navigate("/admin/success-stories", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = "mt-2 w-full rounded-lg border border-[#cedce6] bg-white px-4 py-3 text-sm text-[#173f61] outline-none focus:border-[#2776a2] focus:ring-2 focus:ring-[#2776a2]/10";
  if (isLoading) return <p className="text-sm text-[#667d90]">Loading success-story editor...</p>;

  return <section className="mx-auto max-w-5xl">
    <NavLink to="/admin/success-stories" className="inline-flex items-center gap-2 text-sm font-semibold text-[#176b98]"><ArrowLeft size={17} /> Back to success stories</NavLink>
    <header className="mt-5"><h2 className="text-2xl font-semibold text-[#063d6b]">{isEditing ? "Edit success story" : "Add success story"}</h2><p className="mt-1 text-sm text-[#667d90]">Content follows the approved design structure automatically.</p></header>
    {/* Long structured fields use mobile-safe padding before the desktop grid begins. */}
    <form onSubmit={handleSubmit} className="mt-5 space-y-6 rounded-xl border border-[#dce5ec] bg-white p-4 shadow-[0_8px_28px_rgba(32,45,58,0.06)] sm:mt-7 sm:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block md:col-span-2"><span className="text-sm font-medium text-[#244b67]">Story title *</span><input name="title" value={form.title} onChange={handleChange} className={inputClass} required /></label>
        <label className="block md:col-span-2"><span className="text-sm font-medium text-[#244b67]">Short description *</span><textarea name="description" value={form.description} onChange={handleChange} rows={3} className={`${inputClass} resize-y`} required /></label>
        <label className="block"><span className="text-sm font-medium text-[#244b67]">Industry *</span><input name="industry" value={form.industry} onChange={handleChange} className={inputClass} required /></label>
        <label className="block"><span className="text-sm font-medium text-[#244b67]">Timeline *</span><input name="timeline" value={form.timeline} onChange={handleChange} className={inputClass} required /></label>
        <label className="block"><span className="text-sm font-medium text-[#244b67]">Platform *</span><input name="platform" value={form.platform} onChange={handleChange} className={inputClass} required /></label>
        <label className="block"><span className="text-sm font-medium text-[#244b67]">Status *</span><select name="status" value={form.status} onChange={handleChange} className={inputClass}><option value="draft">Unpublished</option><option value="published">Published</option></select></label>
        <label className="block md:col-span-2"><span className="text-sm font-medium text-[#244b67]">Cover image {isEditing ? "(optional replacement)" : "*"}</span><input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" onChange={handleImage} className={`${inputClass} file:mr-4 file:rounded-md file:border-0 file:bg-[#e9f4fa] file:px-4 file:py-2 file:font-semibold file:text-[#176b98]`} required={!isEditing} />{preview && <img src={preview} alt="Success story preview" className="mt-4 h-56 w-full rounded-xl object-cover" />}</label>
        <label className="block md:col-span-2"><span className="text-sm font-medium text-[#244b67]">Image alt text *</span><input name="imageAlt" value={form.imageAlt} onChange={handleChange} className={inputClass} required /></label>
        <label className="block md:col-span-2"><span className="text-sm font-medium text-[#244b67]">The Challenge *</span><textarea name="challenge" value={form.challenge} onChange={handleChange} rows={6} className={`${inputClass} resize-y`} required /></label>
        <label className="block md:col-span-2"><span className="text-sm font-medium text-[#244b67]">Our Approach *</span><textarea name="approach" value={form.approach} onChange={handleChange} rows={6} className={`${inputClass} resize-y`} required /></label>
        <label className="block md:col-span-2"><span className="text-sm font-medium text-[#244b67]">Results We Delivered *</span><textarea name="resultsText" value={form.resultsText} onChange={handleChange} rows={6} className={`${inputClass} resize-y`} placeholder="Write one result per line" required /><span className="mt-2 block text-xs text-[#8496a5]">Each line automatically becomes one bullet point.</span></label>
        <label className="block md:col-span-2"><span className="text-sm font-medium text-[#244b67]">Client testimonial *</span><textarea name="testimonial" value={form.testimonial} onChange={handleChange} rows={4} className={`${inputClass} resize-y`} required /></label>
        <label className="block"><span className="text-sm font-medium text-[#244b67]">Client name *</span><input name="clientName" value={form.clientName} onChange={handleChange} className={inputClass} required /></label>
        <label className="block"><span className="text-sm font-medium text-[#244b67]">Designation *</span><input name="clientDesignation" value={form.clientDesignation} onChange={handleChange} className={inputClass} required /></label>
        <label className="block md:col-span-2"><span className="text-sm font-medium text-[#244b67]">Company name *</span><input name="companyName" value={form.companyName} onChange={handleChange} className={inputClass} required /></label>
      </div>
      {error && <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</p>}
      <div className="flex justify-end"><button type="submit" disabled={isSaving} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#063d6b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0a527f] disabled:opacity-60 sm:w-auto"><Save size={17} /> {isSaving ? "Saving..." : "Save success story"}</button></div>
    </form>
  </section>;
};

export default AdminSuccessStoryForm;
