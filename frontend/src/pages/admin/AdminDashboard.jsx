import { BellRing, CheckCircle2, Eye, Inbox } from "lucide-react";
import { NavLink, useOutletContext } from "react-router-dom";

const AdminDashboard = () => {
  const { enquiries, enquiriesError, stats } = useOutletContext();
  const recentEnquiries = enquiries.slice(0, 5);

  // Dashboard cards use the enquiry data loaded once by the shared admin layout.
  const overviewCards = [
    {
      label: "Total Enquiries",
      value: stats.total,
      icon: Inbox,
      color: "bg-[#0d759f]",
    },
    {
      label: "New Enquiries",
      value: stats.new,
      icon: BellRing,
      color: "bg-[#e06a42]",
    },
    {
      label: "Read Enquiries",
      value: stats.read,
      icon: Eye,
      color: "bg-[#7067cf]",
    },
    {
      label: "Replied",
      value: stats.replied,
      icon: CheckCircle2,
      color: "bg-[#2d9a70]",
    },
  ];

  return (
    <section className="mx-auto max-w-[1500px]">
      <div className="mb-7">
        <h2 className="text-2xl font-semibold text-[#063d6b]">Overview</h2>
        <p className="mt-1 text-sm text-[#667d90]">
          Monitor new website enquiries from one place.
        </p>
      </div>

      {enquiriesError && (
        <p className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">
          {enquiriesError}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map(({ label, value, icon: Icon, color }) => (
          <article
            key={label}
            className="overflow-hidden rounded-xl border border-[#dce5ec] bg-white shadow-[0_8px_28px_rgba(32,45,58,0.07)]"
          >
            <div className="flex items-center justify-between p-6">
              <div>
                <p className="text-3xl font-bold text-[#173f61]">{value}</p>
                <p className="mt-2 text-sm font-medium text-[#667d90]">{label}</p>
              </div>
              <span className={`rounded-xl p-3 text-white ${color}`}>
                <Icon size={25} />
              </span>
            </div>
            <NavLink
              to="/admin/enquiries"
              className="block border-t border-[#e6edf2] bg-[#f8fafb] px-6 py-3 text-xs font-semibold text-[#176b98] hover:bg-[#eef5f8]"
            >
              View enquiries →
            </NavLink>
          </article>
        ))}
      </div>

      <section className="mt-8 overflow-hidden rounded-xl border border-[#dce5ec] bg-white shadow-[0_8px_28px_rgba(32,45,58,0.06)]">
        <header className="flex items-center justify-between border-b border-[#e6edf2] px-6 py-5">
          <div>
            <h3 className="font-semibold text-[#063d6b]">Recent enquiries</h3>
            <p className="mt-1 text-xs text-[#8496a5]">Latest messages from the website</p>
          </div>
          <NavLink to="/admin/enquiries" className="text-sm font-semibold text-[#176b98]">
            View all
          </NavLink>
        </header>

        {recentEnquiries.length === 0 ? (
          <p className="p-8 text-center text-sm text-[#8496a5]">
            No enquiries have arrived yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-[#f8fafb] text-xs uppercase tracking-wide text-[#667d90]">
                <tr>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Subject</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6edf2]">
                {recentEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-[#fbfcfd]">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#173f61]">{enquiry.name}</p>
                      <p className="mt-1 text-xs text-[#8496a5]">{enquiry.email}</p>
                    </td>
                    <td className="px-6 py-4 text-[#526b80]">{enquiry.subject}</td>
                    <td className="px-6 py-4 text-[#667d90]">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-[#e9f4fa] px-3 py-1 text-xs font-semibold capitalize text-[#176b98]">
                        {enquiry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
};

export default AdminDashboard;
