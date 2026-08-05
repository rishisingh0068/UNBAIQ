import { FileText, Plus, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { deleteAdminBlog, getAdminBlogs, updateAdminBlog } from "../../services/blog";
import { getAdminToken } from "../../utils/adminSession";

const AdminBlogs = () => {
  const token = getAdminToken();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [changingId, setChangingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");

  // Load drafts and published posts for the authenticated admin.
  useEffect(() => {
    let active = true;

    getAdminBlogs(token)
      .then(({ blogs: blogList }) => {
        if (active) setBlogs(blogList);
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
  }, [token]);

  // Publish or unpublish from the list while preserving the complete blog content.
  const toggleStatus = async (blog) => {
    setChangingId(blog._id);
    setError("");

    try {
      const nextStatus = blog.status === "published" ? "draft" : "published";
      const { blog: updatedBlog } = await updateAdminBlog(token, blog._id, {
        ...blog,
        status: nextStatus,
      });
      setBlogs((currentBlogs) =>
        currentBlogs.map((item) =>
          item._id === blog._id ? updatedBlog : item,
        ),
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setChangingId("");
    }
  };

  // Require confirmation before permanently removing a blog and its local cover.
  const handleDelete = async (blog) => {
    if (!window.confirm(`Delete blog "${blog.title}"?`)) return;
    setDeletingId(blog._id);
    setError("");
    try {
      await deleteAdminBlog(token, blog._id);
      setBlogs((currentBlogs) => currentBlogs.filter((item) => item._id !== blog._id));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDeletingId("");
    }
  };

  return (
    <section className="mx-auto max-w-[1500px]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#063d6b]">Blog posts</h2>
          <p className="mt-1 text-sm text-[#667d90]">
            Create drafts, publish posts and update existing content.
          </p>
        </div>
        <NavLink
          to="/admin/blogs/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#063d6b] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0a527f]"
        >
          <Plus size={18} /> Add new blog
        </NavLink>
      </header>

      {error && (
        <p className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      {isLoading ? (
        <p className="mt-7 text-sm text-[#667d90]">Loading blog posts...</p>
      ) : blogs.length === 0 ? (
        <div className="mt-7 rounded-xl border border-dashed border-[#b9cedc] bg-white p-10 text-center">
          <FileText className="mx-auto text-[#8496a5]" size={32} />
          <p className="mt-3 text-sm text-[#667d90]">No blog posts found.</p>
        </div>
      ) : (
        <div className="mt-7 overflow-hidden rounded-xl border border-[#dce5ec] bg-white shadow-[0_8px_28px_rgba(32,45,58,0.06)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-[#f8fafb] text-xs uppercase tracking-wide text-[#667d90]">
                <tr>
                  <th className="px-6 py-4 font-semibold">Title</th>
                  <th className="px-6 py-4 font-semibold">Author</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Updated</th>
                  <th className="px-6 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6edf2]">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-[#fbfcfd]">
                    <td className="px-6 py-4">
                      <p className="max-w-md font-semibold text-[#173f61]">{blog.title}</p>
                      <p className="mt-1 text-xs text-[#8496a5]">/{blog.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-[#526b80]">{blog.author}</td>
                    <td className="px-6 py-4">
                      {/* Present the internal draft state consistently as Unpublished. */}
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${blog.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                        {blog.status === "published" ? "Published" : "Unpublished"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#667d90]">
                      {new Date(blog.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => toggleStatus(blog)}
                          disabled={changingId === blog._id}
                          className="rounded-lg bg-[#f1f4f6] px-3 py-2 text-xs font-semibold text-[#526b80] transition hover:bg-[#e5eaee] disabled:opacity-60"
                        >
                          {changingId === blog._id
                            ? "Updating..."
                            : blog.status === "published"
                              ? "Unpublish"
                              : "Publish"}
                        </button>
                      <NavLink
                        to={`/admin/blogs/${blog._id}/edit`}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#e9f4fa] px-3 py-2 text-xs font-semibold text-[#176b98]"
                      >
                        <SquarePen size={15} /> Edit
                      </NavLink>
                        <button
                          type="button"
                          onClick={() => handleDelete(blog)}
                          disabled={deletingId === blog._id}
                          className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-60"
                        >
                          <Trash2 size={15} /> {deletingId === blog._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminBlogs;
