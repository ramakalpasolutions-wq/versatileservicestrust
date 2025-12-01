// app/donate/page.jsx
"use client";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0a0a0a] via-[#285289] to-[#0a0a0a] p-6 md:p-10 text-center text-white">
      <h1 className="text-2xl md:text-3xl font-bold">Support Our Versatile Services Trust 🤝</h1>
      <p className="mt-2 text-base md:text-lg">Your contribution helps our Mission.</p>

      <div className="mt-6 flex flex-col items-center gap-4">
        <button
          className="px-6 py-3 rounded-full bg-green-400 text-black font-semibold transition transform hover:-translate-y-2 hover:shadow-xl"
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
        >
          DONATE NOW 😇
        </button>

        <div className="mt-4">
          <img
            src="/versatile-services-trust-bank-account-details.webp"
            alt="Bank details"
            className="w-full max-w-xs sm:max-w-md rounded-lg shadow-lg"
            loading="lazy"
            decoding="async"
          />
        </div>

        <p className="text-xl md:text-2xl mt-4">➡ UPI ID: <strong className="font-bold">versatileservicestrust@sbi</strong></p>
        <h2 className="mt-2">Thank you for your kindness 🫶</h2>
      </div>
    </div>
  );
}
