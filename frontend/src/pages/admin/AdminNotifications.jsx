import { ArrowRight, Bell, Clock } from "lucide-react";
import { NavLink, useOutletContext } from "react-router-dom";

const AdminNotifications = () => {
  const { enquiries, enquiriesError } = useOutletContext();
  const newEnquiries = enquiries.filter((enquiry) => enquiry.status === "new");

  return (
    <section className="mx-auto max-w-[1500px]">
      {/* Present live new-enquiry alerts separately without changing their workflow status. */}
      <header className="mb-5 sm:mb-7">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold text-[#063d6b]">Notifications</h2>
          {newEnquiries.length > 0 && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              {newEnquiries.length} new
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-[#667d90]">
          New enquiries submitted through the website appear here automatically.
        </p>
      </header>

      {enquiriesError && (
        <p className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">
          {enquiriesError}
        </p>
      )}

      {newEnquiries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#b9cedc] bg-white px-5 py-14 text-center shadow-[0_8px_28px_rgba(32,45,58,0.04)]">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e9f4fa] text-[#176b98]">
            <Bell size={25} />
          </span>
          <h3 className="mt-4 font-semibold text-[#173f61]">You&apos;re all caught up</h3>
          <p className="mt-1 text-sm text-[#8496a5]">No new enquiry notifications right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {newEnquiries.map((enquiry) => (
            <article
              key={enquiry._id}
              className="rounded-xl border border-[#dce5ec] border-l-4 border-l-[#e94b55] bg-white p-4 shadow-[0_8px_28px_rgba(32,45,58,0.06)] sm:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-[#063d6b]">{enquiry.name}</h3>
                    <span className="rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-700">
                      New enquiry
                    </span>
                  </div>
                  <p className="mt-2 font-medium text-[#244b67]">{enquiry.subject}</p>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#667d90]">{enquiry.message}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#8496a5]">
                    <Clock size={14} /> {new Date(enquiry.createdAt).toLocaleString()}
                  </p>
                </div>

                <NavLink
                  to="/admin/enquiries"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#063d6b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0a527f]"
                >
                  View enquiry <ArrowRight size={15} />
                </NavLink>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminNotifications;
