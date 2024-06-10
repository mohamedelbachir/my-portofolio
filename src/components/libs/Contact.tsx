import { render } from "@react-email/render";
import { ContactMail } from "@/email/Sample.tsx";
import { useState } from "react";
import toast from "react-hot-toast";

const EmailForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
    // ... potentially many more individual properties
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, subject, message } = formData;
    const finalHtml = render(<ContactMail userFirstname={email} />, {
      pretty: true,
    });
    const toClient = await fetch("/api/sendEmail.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: email,
        subject: `Thank You for Reaching Out!`,
        html: finalHtml,
      }),
    });
    const toMe = await fetch("/api/sendEmail.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "bachdev237@gmail.com",
        subject: `New client contact message ${subject}`,
        html: message,
      }),
    });
    toast.loading("loading");
    try {
      const fetchQuery = Promise.allSettled([toMe, toClient]);
      toast.success("sucess");
    } catch (error) {
      toast.error("error " + error);
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light outline-none"
            placeholder="name@email.com"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="subject" className="block mb-2 font-medium">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="block p-3 w-full text-gray-900 bg-gray-50 border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light outline-none"
            placeholder="Let us know how I can help you"
            required
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="block mb-2 font-medium">
            Your message
          </label>
          <textarea
            id="message"
            rows={6}
            name="message"
            className="block p-2.5 w-full text-gray-900 bg-gray-50 shadow-sm border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
            placeholder="Leave a comment..."
            value={formData.message}
            onChange={
              handleChange as unknown as React.ChangeEventHandler<HTMLTextAreaElement>
            }
            required
          ></textarea>
        </div>
        <button className="btn" disabled={isLoading} type="submit">
          Send message
        </button>
      </form>
    </>
  );
};
export default EmailForm;
