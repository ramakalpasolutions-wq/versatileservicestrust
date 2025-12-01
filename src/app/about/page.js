"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function About() {
  const [count, setCount] = useState(0);
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#0a0a0a] via-[#285289] to-[#0a0a0a] text-slate-100">

 <header className="w-full h-72 md:h-96 lg:h-[28rem] relative overflow-hidden flex px-0 items-center gap-0">

  {/* Left image */}
  <div className="flex-shrink-0 w-110  rounded-lg overflow-hidden shadow-lg opacity-24">
    <img
      src="/logo.webp"
      alt="Left Image"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Right side with background image and text */}
  <div className="relative flex-grow h-full rounded-lg overflow-hidden">

    {/* Background image */}
    <div
      className="opacity-50 absolute inset-0 bg-center bg-cover"
      style={{ backgroundImage: "url('/vst-2.webp'"}}
    />

    {/* Overlay for opacity */}
    <div className="absolute inset-0 bg-black/40" />

    {/* Text content */}
    <div className="relative z-10 flex items-center h-full px-140 py-70">
      <h2 className="text-9xl md:text-9xl font-extrabold text-center drop-shadow-lg">
       ABOUT US
      </h2>
    </div>
  </div>
</header>




      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-16">


        {/* WHO WE ARE */}
        <div className="border-10 border-transparent">
          <h2 className="text-4xl font-bold mb-4">Who we are</h2>
          <p className="text-lg font-semibold mb-6">
            We are a team of change-makers who believe that every helping hand can raise a child and create a better future for them.
          </p>

          {/* Founders images */}
      <div className="grid md:grid-cols-2 gap-8 my-9">

  {/* Founder 1 */}
  <div className="text-center">
    <img
      src="/Screenshot 2025-11-20 191640.webp"
      alt="Founder 1"
      className="rounded-lg shadow-lg w-50 h-50 object-cover mx-auto"
    />
    <h3 className="mt-4 text-lg font-semibold text-yellow-300">
      Sardar Pasam Venkateswara Rao Yadav
    </h3>
  </div>

  {/* Founder 2 */}
  <div className="text-center">
    <img
      src="/Screenshot 2025-11-20 191611.webp"
      alt="Founder 2"
      className="rounded-lg shadow-lg w-50 h-auto object-cover mx-auto"
    />
    <h3 className="mt-4 text-lg font-semibold text-yellow-300">
      Pasam Ravindra Yadav
    </h3>
  </div>

</div>

 

          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              My Grand Father Sardar Pasam Venkateswara Rao yadav (Late) and my father Pasam Ravindra Yadav (Late) rendered a great service to the society. My brother Pasam Sri Krishna Devaraya yadav and my sister Rani Rudrama Devi and I myself are inspired and like to follow their ideas. So we are starting a social welfare society…..
            </p>

            <p>
              A team of socially motivated individuals came together and decided to promote the voluntary organisation with the aim of reaching the unreached people in rural and urban areas of Andhra. This team very intensively involved in order to reaching the dreams of the society since its establishment. All members of the society came from marginalised section and they had tasted the poverty conditions during their childhood and education period.
            </p>

            <p>
              Since they had practical experience that forced to came into existence and form voluntary organisation with a great, strong passion to serve the society. Keeping the above conditions, Versatile Services Trust was established in the year 2017. It was registered under Andhra Pradesh societies registration act and also further registered under 12A of the Income Tax Act of 1961.
            </p>

            <p>
              We are very proud to conduct several programs to uplift the conditions of poor and needy children. We put a bioscopic concentration on the development of poor and needy children’s education, health and hygiene who belong to backward classes, downtrodden communities, Dalit community, and neglected children. And orphan children around Andhra Pradesh State. Initially we concentrate rural areas of Guntur District Andhra Pradesh, South India.
            </p>
          </div>
        </div>

        {/* OUR VISION */}
<div className="bg-transparent-700 p-6 rounded-lg shadow-lg border border-black transition-all duration-1000 transform hover:-translate-y-5 hover:shadow-[0_0_15px_rgba(0,0,255,0.5)]">
          <h2 className="text-3xl font-bold text-center mb-4">Our Vision</h2>
          <p className="text-center text-lg leading-relaxed">
            We are engaged in promotion of education to the unprivileged students. Committed for community health by conducting medical camps in rural areas, providing necessary medicines. To develop an innovative system of micro-credit as an effective instrument for poverty and youth welfare alleviation.
          </p>
        </div>

        {/* OUR MISSION */}
<div className="bg-transparent-700 p-6 rounded-lg shadow-lg border border-black transition-all duration-300 transform hover:-translate-y-5 hover:shadow-[0_0_15px_rgba(0,0,255,0.5)]">
          <h2 className="text-3xl font-bold text-center mb-4">Our Mission</h2>
          <p className="text-center text-lg leading-relaxed">
            For achieving in backward people literacy, social awareness community, health & wealth liberation, self support, self realization and leadership.
          </p>
        </div>

           {/* Button to Biodata page */}
      <div className="mt-12 flex justify-center transition-all duration-1000 transform hover:-translate-y-5 hover:shadow-[0_0_15px_rgba(0,0,255,0.5)]">
        <button
          className="px-8 py-4 bg-transparent-700 text-white rounded shadow-md hover:bg-black-200 transition text-lg font-semibold"
          onClick={() => router.push("/biodata")}
        >
          View More
        </button>
      </div>

        {/* BUTTON EXAMPLE (from your earlier code) 
        <div className="mt-12 text-center">
          <button
            className="px-6 py-3 bg-white text-black rounded shadow-md hover:bg-gray-200 transition"
            onClick={() => setCount(count + 1)}
          >
            Click {count}
          </button>
        </div>*/}
         

      </section>
    </main>
  );
}
