"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function validate() {
    const e = {};
    if (!form.message.trim()) e.message = "Please enter your message.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email.";
    }
    if (!form.firstName.trim()) e.firstName = "First name required.";
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Network response not ok");

      setStatus("success");
      setForm({ firstName: "", lastName: "", email: "", message: "" });
      setErrors({});
    } catch (err) {
      console.error("❌ Submission error:", err);
      setStatus("error");
    }
  }

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#0a0a0a] via-[#285289] to-[#0a0a0a] text-slate-100">
      <header className="w-full h-56 md:h-72 lg:h-96 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('contact-us-image.webp')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg no-color-change">
            Contact Us
          </h1>
        </div>
      </header>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto bg-black/40 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-orange-400">Get in touch</h2>
              <p className="text-sm text-yellow-200">
                For enquiries, donations or volunteer information — send us a message below.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Message us</h3>

              {status === "success" && (
                <div className="rounded-md bg-green-900/40 p-4 mb-6">
                  <p className="font-medium">✅ Thanks — your message has been sent.</p>
                  <p className="text-sm opacity-90">We will get back to you soon.</p>
                </div>
              )}

              {status === "error" && (
                <div className="rounded-md bg-red-900/40 p-4 mb-6">
                  <p className="font-medium">❌ Something went wrong. Please try again later.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-white/10"
                  />
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-white/10"
                  />
                </div>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-white/10"
                />

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Message"
                  className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-white/10"
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center rounded-full bg-purple-600 text-black px-6 py-2 font-semibold shadow-lg transform transition-transform hover:-translate-y-1 focus:ring-2 focus:ring-purple-300"
                >
                  {status === "sending" ? "Sending..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
