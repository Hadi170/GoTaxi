import React, { useState } from "react";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErr(data?.error || "Failed to send message");
        return;
      }

      alert("Thank you for contacting GoTaxi. We will reply soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErr("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-black text-yellow-300 rounded-2xl shadow-xl p-8 border-4 border-yellow-300">
        <h1 className="text-3xl font-extrabold mb-2 text-yellow-300">
          Contact GoTaxi
        </h1>
        <p className="mb-6 text-sm text-yellow-100">
          Got a question about a ride, suggestion for the app, or want to report
          an issue? Send us a message and we’ll get back to you.
        </p>

        {err && (
          <div className="mb-4 bg-red-500/20 border border-red-500/40 text-red-200 rounded-lg px-3 py-2 text-sm">
            {err}
          </div>
        )}

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
            disabled={loading}
            className="w-full mt-2 px-4 py-2 rounded-lg font-bold bg-yellow-400 text-black border-2 border-yellow-300 hover:bg-yellow-300 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-6 text-xs text-yellow-100 space-y-1">
          <p>Support email: support@gotaxi.com</p>
          <p>Phone: +961 70 000 000</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
