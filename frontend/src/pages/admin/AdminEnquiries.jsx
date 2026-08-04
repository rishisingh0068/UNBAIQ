import { ArrowLeft, Check, Mail, MessageSquare, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  getEnquiries,
  updateEnquiryStatus,
} from "../../services/enquiry";
import { getAdminToken } from "../../utils/adminSession";

const statusStyles = {
  new: "bg-red-100 text-red-700",
  read: "bg-blue-100 text-blue-700",
  replied: "bg-green-100 text-green-700",
};

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const token = getAdminToken();

  // Load the newest enquiries whenever the protected page opens.
  useEffect(() => {
    let active = true;

    getEnquiries(token)
      .then(({ enquiries: enquiryList }) => {
        if (active) {
          setEnquiries(enquiryList);
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [token]);

  // Update one enquiry locally after the backend confirms its new status.
  const handleStatusChange = async (enquiryId, status) => {
    setUpdatingId(enquiryId);
    setError("");

    try {
      const { enquiry } = await updateEnquiryStatus(token, enquiryId, status);
      setEnquiries((current) =>
        current.map((item) => (item._id === enquiryId ? enquiry : item)),
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f7fa] px-5 py-10 font-lexend sm:px-8">
      <section className="mx-auto max-w-6xl">
        <NavLink
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#176b98]"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </NavLink>

        <header className="mt-6 rounded-[18px] border border-[#dce7ef] bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2776a2]">
            Content inbox
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#063d6b]">
            Enquiries
          </h1>
          <p className="mt-2 text-sm text-[#667d90]">
            Review messages submitted through the Let&apos;s Talk form.
          </p>
        </header>

        {error && (
          <p className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        {isLoading ? (
          <p className="mt-7 text-sm text-[#667d90]">Loading enquiries...</p>
        ) : enquiries.length === 0 ? (
          <section className="mt-7 rounded-[18px] border border-dashed border-[#b9cedc] bg-white p-10 text-center text-[#667d90]">
            No enquiries have arrived yet.
          </section>
        ) : (
          <div className="mt-7 space-y-5">
            {enquiries.map((enquiry) => (
              <article
                key={enquiry._id}
                className="rounded-[18px] border border-[#dce7ef] bg-white p-6 shadow-[0_12px_35px_rgba(6,61,107,0.06)]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-semibold text-[#063d6b]">
                        {enquiry.name}
                      </h2>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[enquiry.status]}`}>
                        {enquiry.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#8496a5]">
                      {new Date(enquiry.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {enquiry.status === "new" && (
                      <button
                        type="button"
                        disabled={updatingId === enquiry._id}
                        onClick={() => handleStatusChange(enquiry._id, "read")}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#e9f4fa] px-3 py-2 text-xs font-semibold text-[#176b98] disabled:opacity-60"
                      >
                        <Check size={15} /> Mark as read
                      </button>
                    )}
                    {enquiry.status !== "replied" && (
                      <button
                        type="button"
                        disabled={updatingId === enquiry._id}
                        onClick={() => handleStatusChange(enquiry._id, "replied")}
                        className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 disabled:opacity-60"
                      >
                        Mark replied
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="mt-5 font-semibold text-[#244b67]">
                  {enquiry.subject}
                </h3>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#526b80]">
                  {enquiry.message}
                </p>

                <div className="mt-5 flex flex-col gap-2 border-t border-[#e7eef3] pt-4 text-sm text-[#526b80] sm:flex-row sm:gap-6">
                  <a className="inline-flex items-center gap-2 hover:text-[#176b98]" href={`mailto:${enquiry.email}`}>
                    <Mail size={16} /> {enquiry.email}
                  </a>
                  <a className="inline-flex items-center gap-2 hover:text-[#176b98]" href={`tel:${enquiry.phone}`}>
                    <Phone size={16} /> {enquiry.phone}
                  </a>
                  <span className="inline-flex items-center gap-2 sm:ml-auto">
                    <MessageSquare size={16} /> Enquiry
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminEnquiries;
