import React, { useState } from "react";
import Navbar from '../Components/Navbar'

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form:", form);
    alert("Thank you for contacting GoTaxi. We will reply soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-black text-yellow-300 rounded-2xl shadow-xl p-8 border-4 border-yellow-300">
        <h1 className="text-3xl font-extrabold mb-2 text-yellow-300">
          Contact GoTaxi
        </h1>
        <p className="mb-6 text-sm text-yellow-100">
          Got a question about a ride, suggestion for the app, or want to report
          an issue? Send us a message and we’ll get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-xs font-semibold uppercase tracking-wide text-yellow-200">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg px-3 py-2 bg-yellow-50 text-black border border-yellow-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-semibold uppercase tracking-wide text-yellow-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg px-3 py-2 bg-yellow-50 text-black border border-yellow-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-semibold uppercase tracking-wide text-yellow-200">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full rounded-lg px-3 py-2 bg-yellow-50 text-black border border-yellow-300 outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 rounded-lg font-bold bg-yellow-400 text-black border-2 border-yellow-300 hover:bg-yellow-300 active:scale-[0.98] transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-6 text-xs text-yellow-100 space-y-1">
          <p>Support email: support@gotaxi.com</p>
          <p>Phone: +961 70 000 000</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Contact;
