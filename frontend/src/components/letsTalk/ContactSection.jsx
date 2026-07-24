import { useState } from "react";
import { MapPin, Clock3, Phone } from "lucide-react";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const ContactSection = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

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
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Validation is local until a form API is connected.
    setFormData(initialFormData);
    setErrors({});
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
            Get in Touch
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
            Get in touch to start discussing your software product needs.
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
            Not sure where to start? We can help with that too.
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
                  Our Address in India
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
                  Bhutani CyberPark, C-712A
                  <br />
                  Sec-62, Noida, Uttar Pradesh
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
      Our Address in Dubai
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
      Sharjah Media City, Sharjah UAE
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
                  We Are Available
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
                  Mon - Fri: 9.00am to 6.00pm
                </p>

                <p className="mt-1 text-[12px] text-[#063d6b]">
                  Sunday Holiday
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
                  Contact
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
                  9911916600
                  <br />
                  contact@unbaiq.com
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
              "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
