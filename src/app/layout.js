// app/layout.js
import "./globals.css";
import ClientNav from "./components/ClientNav";

export const metadata = {
  title: "Versatile Service Trust",
  description: "Helping people through charity and service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-[#0a0a0a] via-[#285289] to-[#0a0a0a] p-0 flex flex-col min-h-screen text-white">
        <ClientNav />

        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-black/50 text-white p-6 sm:p-10 mt-10 animate-footer-reveal">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">About Us</h3>
              <p className="text-sm leading-relaxed text-slate-200">
                We are a team of change-makers who believe that every helping hand can raise a child and create a better future for them.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-purple-300 transition">Home</a></li>
                <li><a href="/biodata" className="hover:text-purple-300 transition">Biodata</a></li>
                <li><a href="/gallery" className="hover:text-purple-300 transition">Gallery</a></li>
                <li><a href="/contact" className="hover:text-purple-300 transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <div className="w-full h-48 sm:h-64 rounded overflow-hidden border-0">
                <iframe
                  title="Guntur Address"
                  src="https://www.google.com/maps?q=D.NO.%204-12-22,%20Naidupet%201st%20Line,%20Amaravathi%20Rd,%20Guntur,%20Andhra%20Pradesh%20522007&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-6 border-t border-white/20 pt-4">
            <p className="text-sm opacity-90">
              Copyright © 2025 Versatile Services Trust All rights reserved
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
