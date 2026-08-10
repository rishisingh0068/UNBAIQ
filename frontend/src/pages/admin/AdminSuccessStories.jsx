import { BookOpenText, Plus, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { deleteAdminSuccessStory, getAdminSuccessStories, updateAdminSuccessStory } from "../../services/successStory";
import { getAdminToken } from "../../utils/adminSession";

const AdminSuccessStories = () => {
  const token = getAdminToken();
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [changingId, setChangingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");

  // Show published and unpublished records in one admin table.
  useEffect(() => {
    let active = true;
    getAdminSuccessStories(token)
      .then(({ stories: list }) => active && setStories(list))
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, [token]);

  // Publish or unpublish directly while retaining the complete structured record.
  const toggleStatus = async (story) => {
    setChangingId(story._id);
    setError("");
    try {
      const nextStatus = story.status === "published" ? "draft" : "published";
      const { story: updatedStory } = await updateAdminSuccessStory(token, story._id, { ...story, status: nextStatus });
      setStories((current) => current.map((item) => item._id === story._id ? updatedStory : item));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setChangingId("");
    }
  };

  // Require confirmation before permanently removing a story and its local image.
  const handleDelete = async (story) => {
    if (!window.confirm(`Delete success story "${story.title}"?`)) return;
    setDeletingId(story._id);
    setError("");
    try {
      await deleteAdminSuccessStory(token, story._id);
      setStories((current) => current.filter((item) => item._id !== story._id));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDeletingId("");
    }
  };

  return (
    <section className="mx-auto max-w-[1500px]">
      {/* Responsive toolbar and touch-scroll table keep every story action accessible. */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#063d6b]">Success Stories</h2>
          <p className="mt-1 text-sm text-[#667d90]">Add, edit, publish or unpublish structured client stories.</p>
        </div>
        <NavLink to="/admin/success-stories/new" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#063d6b] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0a527f] sm:w-auto">
          <Plus size={18} /> Add success story
        </NavLink>
      </header>

      {error && <p className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</p>}
      {isLoading ? (
        <p className="mt-7 text-sm text-[#667d90]">Loading success stories...</p>
      ) : stories.length === 0 ? (
        <div className="mt-7 rounded-xl border border-dashed border-[#b9cedc] bg-white p-10 text-center">
          <BookOpenText className="mx-auto text-[#8496a5]" size={32} />
          <p className="mt-3 text-sm text-[#667d90]">No success stories found.</p>
        </div>
      ) : (
        <div className="mt-7 overflow-hidden rounded-xl border border-[#dce5ec] bg-white shadow-[0_8px_28px_rgba(32,45,58,0.06)]">
          <div className="overflow-x-auto overscroll-x-contain">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-[#f8fafb] text-xs uppercase tracking-wide text-[#667d90]"><tr>
                <th className="px-6 py-4 font-semibold">Image</th><th className="px-6 py-4 font-semibold">Story</th><th className="px-6 py-4 font-semibold">Industry</th><th className="px-6 py-4 font-semibold">Status</th><th className="px-6 py-4 font-semibold">Updated</th><th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-[#e6edf2]">
                {stories.map((story) => <tr key={story._id} className="hover:bg-[#fbfcfd]">
                  {/* Show the saved success-story cover beside its structured content. */}
                  <td className="px-6 py-4">
                    {story.coverImage ? (
                      <img src={story.coverImage} alt={`${story.title} cover`} className="h-16 w-28 rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-16 w-28 items-center justify-center rounded-lg bg-[#eef3f6] text-xs font-medium text-[#7890a3]">No image</div>
                    )}
                  </td>
                  <td className="px-6 py-4"><p className="max-w-md font-semibold text-[#173f61]">{story.title}</p><p className="mt-1 text-xs text-[#8496a5]">/{story.slug}</p></td>
                  <td className="px-6 py-4 text-[#526b80]">{story.industry}</td>
                  <td className="px-6 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${story.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{story.status === "published" ? "Published" : "Unpublished"}</span></td>
                  <td className="px-6 py-4 text-[#667d90]">{new Date(story.updatedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4"><div className="flex flex-wrap justify-end gap-2">
                    <button type="button" onClick={() => toggleStatus(story)} disabled={changingId === story._id} className="rounded-lg bg-[#f1f4f6] px-3 py-2 text-xs font-semibold text-[#526b80] disabled:opacity-60">{changingId === story._id ? "Updating..." : story.status === "published" ? "Unpublish" : "Publish"}</button>
                    <NavLink to={`/admin/success-stories/${story._id}/edit`} className="inline-flex items-center gap-2 rounded-lg bg-[#e9f4fa] px-3 py-2 text-xs font-semibold text-[#176b98]"><SquarePen size={15} /> Edit</NavLink>
                    <button type="button" onClick={() => handleDelete(story)} disabled={deletingId === story._id} className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-60"><Trash2 size={15} /> {deletingId === story._id ? "Deleting..." : "Delete"}</button>
                  </div></td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminSuccessStories;
