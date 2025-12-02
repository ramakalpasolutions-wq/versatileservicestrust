// app/about/page.jsx
export const metadata = {
  title: "About — Versatile Charitable Trust",
  description: "Biodata and major activities — Pasam Ravindra Yadav",
};

export default function BiodataPage() {
  return (
    <main className="bg-gradient-to-r from-[#0a0a0a] via-[#285289] to-[#0a0a0a] min-h-screen text-slate-900">

      {/* Top banner */}
      <div className="w-full flex justify-center md:justify-start">
        <img
          src="Screenshot 2025-11-20 191611.webp"
          alt="about banner"
          className="
            w-full max-w-xs sm:max-w-sm md:w-50 md:h-50 
            object-cover mt-6
            md:ml-200
          "
        />
      </div>

      <section className="max-w-6xl mx-auto w-full px-3 sm:px-6 py-3">

        {/* Biodata Card */}
        <div className="bg-transparent rounded-lg shadow-md overflow-hidden border transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_15px_rgba(0,0,255,0.5)]">
          
          <h1 className="bg-gradient-to-r from-[#0a0a0a] via-[#285289] to-[#0a0a0a] text-white text-center font-semibold py-3">
            SRI PASAM RAVINDRA YADAV
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3">

            {/* Labels - Hidden on mobile */}
            <div className="hidden md:block px-6 py-6 space-y-7 text-red-600">
              <h3 className="text-sm font-semibold">FULL NAME</h3>
              <h3 className="text-sm font-semibold">FATHERS NAME</h3>
              <h3 className="text-sm font-semibold">ADDRESS</h3>
              <h3 className="text-sm font-semibold">PHONE NUMBER</h3>
              <h3 className="text-sm font-semibold">DATE OF BIRTH</h3>
              <h3 className="text-sm font-semibold">DATE OF DEATH</h3>
              <h3 className="text-sm font-semibold">QUALIFICATION</h3>
              <h3 className="text-sm font-semibold">NATIONALITY</h3>
              <h3 className="text-sm font-semibold">CASTE</h3>
              <h3 className="text-sm font-semibold">OCCUPATION</h3>
            </div>

            {/* Values */}
            <div className="col-span-2 px-4 sm:px-6 py-6 space-y-6">

              {[
                { label: "FULL NAME", value: "PASAM RAVINDRA YADAV" },
                { label: "FATHERS NAME", value: "PASAM VENKATESWARA RAO YADAV GARU" },
                { label: "ADDRESS", value: "BHUVANA VIJAYAM, D.NO: 4-12-22..." },
                { label: "PHONE NUMBER", value: "9000443466, 9390666650" },
                { label: "DATE OF BIRTH", value: "10-06-1951" },
                { label: "DATE OF DEATH", value: "09-07-2016" },
                { label: "QUALIFICATION", value: "P.U.C." },
                { label: "NATIONALITY", value: "INDIAN" },
                { label: "CASTE", value: "YADAVA (BC-D)" },
                { label: "OCCUPATION", value: "BUSINESS & DISTRICT CONGRESS ORGANIZING SECRETARY" }
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="md:hidden text-sm font-semibold text-red-600">{item.label}</h3>
                  <p className="text-sm md:text-base text-slate-700">{item.value}</p>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Major Activities */}
        <div className="mt-12 mb-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Major Activities</h2>
        </div>

        {/* Activities Section */}
        <div className="max-w-5xl mx-auto px-1 sm:px-2">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Column 1 */}
            <ul className="space-y-5 text-white">
              {[
                "HE SERVED FOR 35 YEARS AS A VOLUNTEER OF CONGRESS PARTY.",
                "HE WORKED AND JUSTIFIED FOR HIS POST AS SECRETARY OF DISTRICT CONGRESS COMMITTEE FOR 15 YEARS.",
                "HE WORKED AS A SECRETARY GENERAL OF S.C, S.T, B.C AND MINORITY COMMUNITY.",
                "HE WORKED IN MANY POSTS IN BACK-WARD CLASSES COMMUNITY FOR 50 YEARS.",
                "HE WORKED DURING 1970’S AS A SECRETARY AND CORRESPONDENT OF YADAV HOSPITALS.",
                "HE WORKED AS A HONORABLE PRESIDENT FOR WELFARE OF DISTRICT MONDI BANDA COMMUNITY.",
                "HE WORKED AS A JUDICIAL ADVISER FOR CONSUMERS COMMITTEE.",
                "HE WORKED AS A DIRECTOR FOR “SAMAGIKA CHETANA” FOUNDATION.",
                "HE WORKED AS A SECRETARY FOR WELFARE OF A.P HOUSING BOARD COLONY, NALLAPADU, GUNTUR.",
                "HE WORKE2D AS A SECRETARY OF JOINT ACTION COUNCIL FOR S.C, S.T, B.C AND MINORITY COMMITTEE.",
                "HE SERVED AS A PRESIDENT FOR WELFARE OF “ SRI RAGHUVEEERA SHEPHERDS ”.",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 mt-1" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="5" />
                  </svg>
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>

            {/* Column 2 */}
            <ul className="space-y-5 text-white">
              {[
                "HE SERVED AS A PRESIDENT FOR 20 YEARS FOR GUNTUR SHEPHERDS CO-OPERATIVE UNION.",
                "HE WAS THE CHIEF SECRETARY FOR “A.P YADAVA MAHASABHA ” IN 1972.",
                "HE WAS THE SECRETARY OF YOUTH CONGRESS IN 1975. HELPED MANY PEOPLE IN 1977 CYCLONE.",
                "WORKED AS A SECRETARY FOR DISTRICT YADAVA YOUTH COMMITTEE IN 1983.",
                "WORKED AS A MEMBER OF GOVERNMENT SOCIAL WELFARE HOSTELS IN 1985.",
                "HAS WORKED AS A MEMBER OF THE GOVERNMENT GUNTUR VETERINARY HOSPITAL ADVISORY COMMITTEE UNTIL HIS DEATH.",
                "HE WORKED AS A LEADER FOR DISTRICT BACK-WARD CLASSES RESERVATION FIGHTERS COMMITTEE.",
                "HE WAS AN HONOURABLE PRESIDENT FOR “ VEERAGANI SURYANARAYANA EDUCATIONAL SOCIETY ”.",
                "HE WAS PRESIDENT FOR “ POTTI SRI RAMULU NAGAR SEVASAMITHI “ AND “ SARADA COLONY SEVASAMITHI “.",
                "CONDUCTED MANY PEOPLE WELFARE PROGRAMMES IN A.P WELFARE ASSOCIATION AS A HONORABLE PRESIDENT.",
                "HE WORKED AS A CHIEF SECRETARY FOR GUNTUR URBAN CONGRESS COMMITTEE.",
                "HE WORKED AS CO-CONVENER FOR GUNTUR DISTRICT B.C UNION FROM 2001 TO HIS DEMISE.",
                "HE WORKED AS VICE-PRESIDENT OF GUNTUR URBAN CONGRESS COMMITTEE COLLECTING GRANTS-IN-AID FOR TSUNAMI VICTIMS.",
                "HE WAS A VICE-PRESIDENT AND PUT EFFORTS TO STRENGTHEN THE GUNTUR URBAN CONGRESS COMMITTEE.",
                "HE WORKED AS A FOOD COMMITTEE MEMBER FOR GUNTUR URBAN CONGRESS COMMITTEE.",
                "PLAYED THE MAIN ROLE IN “ SAMIKYA-ANDHRA ” MOVEMENT.",
                "HE PARTICIPATED IN MANY PEOPLE MOVEMENTS TO SOLVE THEIR PROBLEMS.",
                "HE WAS WORKED AS A PRESIDENT FOR “ GURRAM JASHUVA UTSAVA COMMITTEE ” AS A LONG TIME.",
                "HE WAS A MEMBER FOR “ ALLURI SITARAMARAJU UTSAVA COMMITTEE ” AND LED EFFORTS TO PLACE THE STATUE IN NAAZ CENTER IN GUNTUR TOWN.",
                "HE WAS AN ACTIVE MEMBER FOR “ AVAGAHANA OFFICE ” (SENIOR CITIZENS OFFICE).",
                "HE WAS AN ACTIVE MEMBER FOR “ SRI RADHA KRISHNA TEMPLE ” AND PLAYED A KEY ROLE IN DEVELOPING THE TEMPLE."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 mt-1" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="5" />
                  </svg>
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gallery */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              "/biodata3.webp",
              "biodata.webp",
              "biodata2.webp"
            ].map((src, i) => (
              <div key={i} className="transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_0_15px_rgba(0,0,255,0.5)]">
                <img
                  src={src}
                  alt={`biodata ${i}`}
                  className="w-full h-52 sm:h-64 rounded-lg object-cover shadow"
                />
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
