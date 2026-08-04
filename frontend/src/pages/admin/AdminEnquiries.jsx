import { Check, Mail, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { updateEnquiryStatus } from "../../services/enquiry";
import { getAdminToken } from "../../utils/adminSession";

const statusStyles = {
  new: "bg-red-100 text-red-700",
  read: "bg-blue-100 text-blue-700",
  replied: "bg-green-100 text-green-700",
};

const AdminEnquiries = () => {
  const { enquiries, enquiriesError, setEnquiries } = useOutletContext();
  const [actionError, setActionError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const token = getAdminToken();
  const error = actionError || enquiriesError;

  // Update shared enquiry data so every dashboard badge changes immediately.
  const handleStatusChange = async (enquiryId, status) => {
    setUpdatingId(enquiryId);
    setActionError("");

    try {
      const { enquiry } = await updateEnquiryStatus(token, enquiryId, status);
      setEnquiries((current) =>
        current.map((item) => (item._id === enquiryId ? enquiry : item)),
      );
    } catch (requestError) {
      setActionError(requestError.message);
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <section className="mx-auto max-w-[1500px]">
      <header className="mb-7">
        <h2 className="text-2xl font-semibold text-[#063d6b]">Enquiry inbox</h2>
        <p className="mt-1 text-sm text-[#667d90]">
          Review messages submitted through the Let&apos;s Talk form.
        </p>
      </header>

      {error && (
        <p className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      {enquiries.length === 0 ? (
        <section className="rounded-xl border border-dashed border-[#b9cedc] bg-white p-10 text-center text-[#667d90]">
          No enquiries have arrived yet.
        </section>
      ) : (
        <div className="space-y-5">
          {enquiries.map((enquiry) => (
            <article
              key={enquiry._id}
              className="rounded-xl border border-[#dce5ec] bg-white p-6 shadow-[0_8px_28px_rgba(32,45,58,0.06)]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-[#063d6b]">
                      {enquiry.name}
                    </h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[enquiry.status]}`}
                    >
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

              <h4 className="mt-5 font-semibold text-[#244b67]">
                {enquiry.subject}
              </h4>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#526b80]">
                {enquiry.message}
              </p>

              <div className="mt-5 flex flex-col gap-2 border-t border-[#e7eef3] pt-4 text-sm text-[#526b80] sm:flex-row sm:gap-6">
                <a
                  className="inline-flex items-center gap-2 hover:text-[#176b98]"
                  href={`mailto:${enquiry.email}`}
                >
                  <Mail size={16} /> {enquiry.email}
                </a>
                <a
                  className="inline-flex items-center gap-2 hover:text-[#176b98]"
                  href={`tel:${enquiry.phone}`}
                >
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
  );
};

export default AdminEnquiries;
