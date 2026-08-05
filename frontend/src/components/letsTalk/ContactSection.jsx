import { useEffect, useState } from "react";
import { MapPin, Clock3, Phone } from "lucide-react";

import { submitEnquiry } from "../../services/enquiry";
import { defaultContactContent, getPublicContactContent } from "../../services/contactContent";
import { subscribeToContentUpdates } from "../../services/liveUpdates";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const ContactSection = () => {
  const [contactContent, setContactContent] = useState(defaultContactContent);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  // 🔴 Changed: tracks successful form submission.
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Load contact copy and refetch it after every successful admin save broadcast.
  useEffect(() => {
    let active = true;
    const loadContactContent = () => getPublicContactContent()
      .then(({ content }) => active && setContactContent({ ...defaultContactContent, ...content }))
      .catch(() => {});

    loadContactContent();
    const unsubscribe = subscribeToContentUpdates("contact-content", loadContactContent);
    return () => { active = false; unsubscribe(); };
  }, []);

  // Automatically dismiss successful submission feedback after two seconds.
  useEffect(() => {
    if (!isSubmitted) return undefined;
    const hideMessageTimer = window.setTimeout(() => setIsSubmitted(false), 2000);
    return () => window.clearTimeout(hideMessageTimer);
  }, [isSubmitted]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      // Enquiries accept exactly ten numeric digits to avoid incomplete or oversized numbers.
      newErrors.phone = "Enter a 10-digit phone number";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // hides the previous success message when editing starts.
    if (isSubmitted) {
      setIsSubmitted(false);
    }

    if (submitError) {
      setSubmitError("");
    }

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: "",
      }));
    }
  };

  // Validate locally, then save the enquiry through the public backend API.
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitted(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await submitEnquiry(formData);
      setFormData(initialFormData);
      setErrors({});
      setIsSubmitted(true);
    } catch (requestError) {
      setIsSubmitted(false);
      setSubmitError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (fieldName) => `
    w-full
    rounded-[3px]
    border
    ${errors[fieldName] ? "border-red-500" : "border-transparent"}
    bg-white
    px-4
    py-4
    text-[13px]
    text-[#173b5e]
    outline-none
    transition
    duration-200
    placeholder:text-[#7d8793]
    focus:border-[#064675]
    focus:ring-2
    focus:ring-[#064675]/10
  `;

  return (
    <section
      className="
        w-full
        bg-[#f7f7f7]
        px-5
        py-14
        sm:px-7
        sm:py-16
        lg:px-10
        xl:px-14
        lg:py-20
      "
    >
      {/* Keep successful submission feedback visible at the top of every viewport size. */}
      {isSubmitted && (
        <div
          className="fixed left-1/2 top-[92px] z-[100] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-semibold text-green-700 shadow-[0_10px_35px_rgba(22,101,52,0.18)] sm:top-[104px]"
          role="status"
          aria-live="polite"
        >
          Your enquiry has been submitted successfully.
        </div>
      )}

      <div
        className="
          mx-auto
          grid
          max-w-[1320px]
          grid-cols-1
          gap-12
          lg:grid-cols-[0.95fr_1.05fr]
          lg:gap-16
        "
      >
        {/* Left Side */}
        <div>
          <h2
            className="
              text-[30px]
              font-extrabold
              leading-tight
              tracking-[-0.02em]
              text-[#063d6b]
              sm:text-[36px]
              lg:text-[40px]
            "
          >
            {contactContent.heading}
          </h2>

          <p
            className="
              mt-2
              max-w-[540px]
              text-[14px]
              leading-[1.65]
              text-[#5f7288]
              sm:text-[15px]
            "
          >
            {contactContent.descriptionOne}
          </p>

          <p
            className="
              mt-1
              max-w-[540px]
              text-[14px]
              leading-[1.65]
              text-[#5f7288]
              sm:text-[15px]
            "
          >
            {contactContent.descriptionTwo}
          </p>

          <div
            className="
              mt-10
              bg-white
              px-6
              py-8
              sm:px-8
              sm:py-10
            "
          >
            {/* Noida office Address */}
            <div className="flex items-start gap-4">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#f2f7fa]
                  text-[#064675]
                "
              >
                <MapPin size={18} strokeWidth={2.4} />
              </div>

              <div>
                <p className="text-[12px] font-medium text-[#294861]">
                  {contactContent.indiaLabel}
                </p>

                <p
                  className="
                    mt-1
                    text-[14px]
                    font-extrabold
                    leading-[1.55]
                    text-[#063d6b]
                    sm:text-[15px]
                  "
                >
                  <span className="whitespace-pre-line">{contactContent.indiaAddress}</span>
                </p>
              </div>
            </div>
            {/* Dubai office */}
<div className="mt-8 flex items-start gap-4">
  <div
    className="
      flex
      h-11
      w-11
      shrink-0
      items-center
      justify-center
      rounded-full
      bg-[#f2f7fa]
      text-[#064675]
    "
  >
    <MapPin size={18} strokeWidth={2.4} />
  </div>

  <div>
    <p
      className="
        text-[13px]
        font-medium
        text-[#5f7288]
      "
    >
      {contactContent.dubaiLabel}
    </p>

    <p
      className="
        mt-1
        text-[15px]
        font-extrabold
        leading-[1.5]
        text-[#063d6b]
        sm:text-[16px]
      "
    >
      <span className="whitespace-pre-line">{contactContent.dubaiAddress}</span>
    </p>
  </div>
</div>

            <div className="mt-8 flex items-start gap-4">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#f2f7fa]
                  text-[#064675]
                "
              >
                <Clock3 size={18} strokeWidth={2.4} />
              </div>

              <div>
                <p className="text-[12px] font-medium text-[#294861]">
                  {contactContent.availabilityLabel}
                </p>

                <p
                  className="
                    mt-1
                    text-[14px]
                    font-extrabold
                    leading-[1.55]
                    text-[#063d6b]
                    sm:text-[15px]
                  "
                >
                  {contactContent.workingHours}
                </p>

                <p className="mt-1 text-[12px] text-[#063d6b]">
                  {contactContent.holidayText}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-4">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#f2f7fa]
                  text-[#064675]
                "
              >
                <Phone size={18} strokeWidth={2.4} />
              </div>

              <div>
                <p className="text-[12px] font-medium text-[#294861]">
                  {contactContent.contactLabel}
                </p>

                <p
                  className="
                    mt-1
                    text-[14px]
                    font-extrabold
                    leading-[1.55]
                    text-[#063d6b]
                    sm:text-[15px]
                  "
                >
                  {contactContent.phone}
                  <br />
                  {contactContent.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-[13px] font-medium text-[#123b5f]"
            >
              Name*
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={inputClass("name")}
            />

            {errors.name && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          <div className="mt-5">
            <label
              htmlFor="email"
              className="mb-2 block text-[13px] font-medium text-[#123b5f]"
            >
              Email Address*
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={inputClass("email")}
            />

            {errors.email && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div className="mt-5">
            <label
              htmlFor="phone"
              className="mb-2 block text-[13px] font-medium text-[#123b5f]"
            >
              Phone*
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className={inputClass("phone")}
            />

            {errors.phone && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="mt-5">
            <label
              htmlFor="subject"
              className="mb-2 block text-[13px] font-medium text-[#123b5f]"
            >
              Subject*
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className={inputClass("subject")}
            />

            {errors.subject && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.subject}
              </p>
            )}
          </div>

          <div className="mt-5">
            <label
              htmlFor="message"
              className="mb-2 block text-[13px] font-medium text-[#123b5f]"
            >
              Message
            </label>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`${inputClass("message")} resize-none`}
            />

            {errors.message && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.message}
              </p>
            )}
          </div>

          <div className="mt-8 flex justify-center sm:justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                min-w-[190px]
                rounded-full
                bg-[#064675]
                px-8
                py-4
                text-[14px]
                font-medium
                text-white
                transition
                duration-300
                hover:bg-[#04385e]
                focus:outline-none
                focus:ring-4
                focus:ring-[#064675]/20
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>

          {submitError && (
            <p
              className="mt-4 text-center text-[14px] font-medium text-red-600 sm:text-right"
              role="alert"
            >
              {submitError}
            </p>
          )}

        </form>
      </div>
    </section>
  );
};

export default ContactSection;
