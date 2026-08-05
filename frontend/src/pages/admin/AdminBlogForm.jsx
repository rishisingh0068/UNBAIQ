import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import BlogContent from "../../components/blog/BlogContent";
import {
  createAdminBlog,
  getAdminBlog,
  updateAdminBlog,
  uploadAdminBlogImage,
} from "../../services/blog";
import { getAdminToken } from "../../utils/adminSession";

const initialForm = {
  title: "",
  author: "",
  excerpt: "",
  coverImage: "",
  content: "",
  status: "draft",
};

const AdminBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = getAdminToken();
  const isEditing = Boolean(id);
  const [formData, setFormData] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Populate the same editor when an existing blog is being updated.
  useEffect(() => {
    if (!isEditing) return undefined;

    let active = true;
    getAdminBlog(token, id)
      .then(({ blog }) => {
        if (active) {
          setFormData({
            title: blog.title,
            author: blog.author,
            excerpt: blog.excerpt,
            coverImage: blog.coverImage || "",
            content: blog.content,
            status: blog.status,
          });
          setImagePreview(blog.coverImage || "");
        }
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, isEditing, token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setError("");
  };

  // Validate the selected local image and show a preview before upload.
  const handleImageChange = (event) => {
    const image = event.target.files?.[0];

    if (!image) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(image.type)) {
      setError("Choose a JPG, PNG or WEBP image");
      event.target.value = "";
      return;
    }

    if (image.size > 5 * 1024 * 1024) {
      setError("Blog image must be 5 MB or smaller");
      event.target.value = "";
      return;
    }

    setSelectedImage(image);
    setImagePreview(URL.createObjectURL(image));
    setError("");
  };

  // Release temporary browser preview URLs when the selection changes/unmounts.
  useEffect(
    () => () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    },
    [imagePreview],
  );

  // Use one form for both creating a new post and updating an existing post.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      let coverImage = formData.coverImage;

      if (selectedImage) {
        const upload = await uploadAdminBlogImage(token, selectedImage);
        coverImage = upload.coverImage;
      }

      const blogData = { ...formData, coverImage };

      if (isEditing) {
        await updateAdminBlog(token, id, blogData);
      } else {
        await createAdminBlog(token, blogData);
      }
      navigate("/admin/blogs", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-lg border border-[#cedce6] bg-white px-4 py-3 text-sm text-[#173f61] outline-none focus:border-[#2776a2] focus:ring-2 focus:ring-[#2776a2]/10";

  if (isLoading) {
    return <p className="text-sm text-[#667d90]">Loading blog editor...</p>;
  }

  return (
    <section className="mx-auto max-w-5xl">
      <NavLink to="/admin/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-[#176b98]">
        <ArrowLeft size={17} /> Back to blogs
      </NavLink>

      <header className="mt-5">
        <h2 className="text-2xl font-semibold text-[#063d6b]">
          {isEditing ? "Edit blog post" : "Add new blog post"}
        </h2>
        <p className="mt-1 text-sm text-[#667d90]">
          Draft content stays private until its status is changed to published.
        </p>
      </header>

      {/* Phone forms use compact padding and expand to two columns on larger screens. */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-6 rounded-xl border border-[#dce5ec] bg-white p-4 shadow-[0_8px_28px_rgba(32,45,58,0.06)] sm:mt-7 sm:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-[#244b67]">Title *</span>
            <input name="title" value={formData.title} onChange={handleChange} className={inputClass} required />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-[#244b67]">Author *</span>
            <input name="author" value={formData.author} onChange={handleChange} className={inputClass} required />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-[#244b67]">Status *</span>
            <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
              {/* Keep the API value as draft while presenting it as Unpublished. */}
              <option value="draft">Unpublished</option>
              <option value="published">Published</option>
            </select>
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-[#244b67]">Cover image</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className={`${inputClass} file:mr-4 file:rounded-md file:border-0 file:bg-[#e9f4fa] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#176b98]`}
            />
            <span className="mt-2 block text-xs text-[#8496a5]">
              JPG, PNG or WEBP. Maximum file size 5 MB.
            </span>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected blog cover preview"
                className="mt-4 h-52 w-full max-w-xl rounded-xl border border-[#dce5ec] object-cover"
              />
            )}
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-[#244b67]">Short description *</span>
            <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} maxLength={500} className={`${inputClass} resize-y`} required />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-[#244b67]">Full content *</span>
            <textarea name="content" value={formData.content} onChange={handleChange} rows={18} className={`${inputClass} resize-y leading-7`} placeholder="Separate paragraphs with a blank line." required />
            <div className="mt-3 rounded-lg bg-[#f7fafc] p-4 text-xs leading-6 text-[#667d90]">
              <p className="font-semibold text-[#244b67]">Formatting guide</p>
              <p><code># Heading</code> or <code>## Heading</code> for headings</p>
              <p><code>- Point</code> for bullets · <code>1. Point</code> for numbered lists</p>
              <p>Leave one blank line between normal paragraphs.</p>
            </div>
          </label>
        </div>

        {formData.content.trim() && (
          <details className="rounded-xl border border-[#dce5ec] bg-[#fbfcfd] p-5">
            <summary className="cursor-pointer text-sm font-semibold text-[#176b98]">
              Preview structured content
            </summary>
            <div className="mt-5 border-t border-[#e6edf2] pt-5 text-[15px] leading-7 text-[#173f61]">
              <BlogContent content={formData.content} />
            </div>
          </details>
        )}

        {error && <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</p>}

        <div className="flex justify-end">
          <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#063d6b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0a527f] disabled:opacity-60 sm:w-auto">
            <Save size={17} /> {isSubmitting ? "Saving..." : "Save blog"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminBlogForm;
