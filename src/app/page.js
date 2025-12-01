"use client";

import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  // HERO images
  const [images, setImages] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  // videos / player
  const [youtubeFolders, setYoutubeFolders] = useState([]);
  const [currentVideoEmbed, setCurrentVideoEmbed] = useState(null);
  const playerRef = useRef(null);

  /* ---------------- Helpers ---------------- */
  function normalizeHeroItem(item) {
    if (!item) return null;
    if (typeof item === "string") return { src: item, name: "", about: "" };
    const src = item.original || item.optimized || item.thumb || item.url || item.src || "";
    const name = item.title || item.name || item.caption || "";
    const about = item.about || item.description || item.alt || "";
    return src ? { src, name, about } : null;
  }

  function parseYouTubeId(url) {
    if (!url) return null;
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
      if (u.hostname.includes("youtu.be")) return u.pathname.substring(1);
    } catch (e) {
      const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
      return m ? m[1] : null;
    }
    return null;
  }

  function youtubeThumbUrl(url) {
    const id = parseYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  }

  function youTubeEmbedSrc(url) {
    const id = parseYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}?rel=0` : null;
  }

  /* ---------------- Load assets ---------------- */
  async function loadHeroAssets() {
    try {
      const res = await fetch("/api/event-photos", { cache: "no-store" });
      const text = await res.text();
      if (!text) return;

      let body;
      try {
        body = JSON.parse(text);
      } catch (err) {
        console.warn("Invalid JSON for event-photos", err);
        return;
      }

      const gallery = body.gallery ?? body;
      const sliderRaw = body.slider ?? body.home_slider ?? body.homeSlider ?? [];
      const processed = sliderRaw.map(normalizeHeroItem).filter(Boolean);

      setImages(processed);

      const yFolders = Object.entries(gallery || {}).filter(
        ([_, items]) => Array.isArray(items) && items[0]?.youtube === true
      );

      setYoutubeFolders(yFolders);
    } catch (e) {
      console.warn(e);
    }
  }

  useEffect(() => {
    loadHeroAssets();
  }, []);

  /* ---------------- Auto-rotation for hero ---------------- */
  useEffect(() => {
    if (images.length === 0) return;
    const t = setInterval(() => setHeroIndex((i) => (i + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);

  /* ---------------- Touch swipe handler ---------------- */
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);
  const touchThreshold = 40;

  function onTouchStart(e) {
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
  }
  function onTouchMove(e) {
    if (touchStartX.current == null) return;
    touchDeltaX.current = (e.touches?.[0]?.clientX ?? 0) - touchStartX.current;
  }
  function onTouchEnd() {
    if (Math.abs(touchDeltaX.current) > touchThreshold) {
      if (touchDeltaX.current > 0)
        setHeroIndex((i) => (i - 1 + images.length) % images.length);
      else setHeroIndex((i) => (i + 1) % images.length);
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  }

  /* ---------------- Render ---------------- */
  return (
    <>
      {/* HERO */}
      <section
        className="relative w-full overflow-hidden flex items-center justify-center"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="w-full max-w-7xl px-6">
          <div className="relative h-[40vh] sm:h-[55vh] md:h-[70vh] rounded-xl shadow-lg overflow-hidden">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  heroIndex === i ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}

            {/* indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`w-3 h-3 rounded-full ${
                    heroIndex === i ? "bg-blue-800" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TITLE */}
      <div className="mt-6 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold">Versatile Service Trust</h1>
        <p className="text-lg text-slate-300">
          We are dedicated to helping communities through welfare, charity, and humanitarian support.
        </p>
      </div>

      {/* VIDEO PLAYER */}
      <div id="home-video-player" ref={playerRef} className="max-w-4xl mx-auto my-8 px-4">
        {currentVideoEmbed ? (
          <div className="relative rounded overflow-hidden bg-black" style={{ paddingTop: "56.25%" }}>
            <iframe
              src={currentVideoEmbed}
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ) : (
          <div className="bg-black/40 text-yellow-200 rounded-xl p-4 text-center">
            No video selected
          </div>
        )}
      </div>

      {/* VIDEOS GRID */}
      <section className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">Our Videos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {youtubeFolders.slice(0, 4).map(([folder, items], idx) => {
            const url = items?.[0]?.url;
            const thumb = youtubeThumbUrl(url);
            const title = items?.[0]?.title || folder.replace(/_/g, " ");

            return (
              <div key={idx} className="bg-black/40 rounded-xl shadow-lg p-2 hover:-translate-y-2 transition">
                <button
                  onClick={() => {
                    const embed = youTubeEmbedSrc(url);
                    setCurrentVideoEmbed(embed + "&autoplay=1");
                    playerRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="relative w-full h-40"
                >
                  {thumb ? <img src={thumb} className="w-full h-full object-cover rounded" /> : "No thumbnail"}
                </button>
                <div className="text-center mt-2">{title}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <a href="/gallery" className="px-6 py-3 rounded-full bg-white text-black font-semibold">
            WATCH MORE
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article className="p-6 bg-black/40 rounded-xl shadow-lg hover:-translate-y-2 transition">
            <h4 className="font-semibold mb-2">Education</h4>
            <p>Programs to support children's education in rural areas.</p>
          </article>

          <article className="p-6 bg-black/40 rounded-xl shadow-lg hover:-translate-y-2 transition">
            <h4 className="font-semibold mb-2">Health & Hygiene</h4>
            <p>Healthcare camps, hygiene awareness and support.</p>
          </article>

          <article className="p-6 bg-black/40 rounded-xl shadow-lg hover:-translate-y-2 transition">
            <h4 className="font-semibold mb-2">Community Support</h4>
            <p>Empowering marginalized groups through targeted services.</p>
          </article>
        </div>
      </section>
    </>
  );
}

