import Link from "next/link";
import { notFound } from "next/navigation";

// import GuestConfirmForm from "@/components/Invitation/GuestConfirmForm";

export const revalidate = 0;

export default async function InvitationPage({ params }) {
  const resolvedParams = await params;

  const type = resolvedParams.type;

  const weddingConfig = {
    nha_trai: {
      type: "nha_trai",

      title: "NHÀ TRAI",

      ceremonyName: "LỄ THÀNH HÔN",

      dayOfWeek: "THỨ SÁU",
      day: "10",
      monthYear: "THÁNG 07, 2026",

      fullDate: "10.07.2026",

      hour: "10:30",

      locationName: "Nhà hàng Công Đoàn",

      city: "ĐẮK LẮK",

      address: "Tầng trệt 53 Độc Lập, Phường Tuy Hòa",

      mapLink: "https://maps.app.goo.gl/iyvqDWoJPtByyHRg9",
    },

    nha_gai: {
      type: "nha_gai",

      title: "NHÀ GÁI",

      ceremonyName: "LỄ VU QUY",

      dayOfWeek: "THỨ SÁU",
      day: "03",
      monthYear: "THÁNG 07, 2026",

      fullDate: "03.07.2026",

      hour: "11:00",

      locationName: "Tư Gia Nhà Gái",

      city: "ĐÀ NẴNG",

      address: "Đường 28 - Khối Hà My Tây, Phường Điện Bàn Đông",

      mapLink: "https://maps.app.goo.gl/aUNRR6Hw8y9t7Hdx5",
    },
  };

  const currentInfo = weddingConfig[type];

  if (!currentInfo) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] flex flex-col items-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-[#a8bba2] blur-[120px] opacity-40" />
      <div className="absolute bottom-[-10%] left-[-20%] w-[500px] h-[500px] rounded-full bg-[#a8bba2] blur-[100px] opacity-20" />

      <Link
        href="/"
        className="mb-8 mt-2 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#2d3748]/50 hover:text-[#66785f]"
      >
        ← Sảnh đón tiếp
      </Link>

      <div className="relative w-full max-w-md mx-auto">
        <div
          className="relative bg-[#b33a4a] border-2 border-[#c9a227] shadow-2xl  p- md:p-8 flex flex-col items-center text-center"
          style={{
            borderRadius: "240px 240px 32px 32px",
          }}
        >
          <img
            src="/images/hoa_baby.png"
            alt=""
            className="
                absolute
                top-[440px]
                left-[250px]

                w-[100px]
                md:w-[280px]

                rotate-[30deg]

                opacity-90
                pointer-events-none
                z-20
            "
          />
          <div
            className="absolute inset-2 border border-[#e6d6a8]/30"
            style={{
              borderRadius: "232px 232px 24px 24px",
            }}
          />

          <div
            className="absolute inset-3 border border-[#c9a227]/40"
            style={{
              borderRadius: "228px 228px 20px 20px",
            }}
          />

          <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#e6d6a8]/15 to-transparent" />

          <div className="flex flex-col items-center mt-12 mb-6 z-10">
            <span className="text-5xl text-[#c9a227]">囍</span>

            <div className="w-12 h-[1px] bg-[#c9a227]/50 mt-3" />
          </div>

          <p className="text-[9px] uppercase tracking-[0.35em] text-[#e6d6a8]/80 mb-6">
            Trân trọng báo tin
          </p>

          <h3 className="text-3xl text-[#c9a227] font-playfair mb-2">
            {currentInfo.ceremonyName}
          </h3>

          <p className="text-[#e6d6a8] mb-8"></p>

          <div className="space-y-2 mb-10 w-full">
            <h1 className="text-5xl text-[#c9a227] font-great-vibes">
              Trọng Nghĩa
            </h1>

            <div className="flex flex-col items-center">
              <span className="text-[#c9a227] "> ღ</span>
            </div>

            <h1 className="text-5xl text-[#c9a227] font-great-vibes">
              Thu Thảo
            </h1>
          </div>

          <div className="w-full bg-black/15 rounded-2xl border border-[#c9a227]/30 p-5 mb-4 text-white">
            <p
              className="text-xl md:text-2xl uppercase tracking-[0.15em] font-bold text-white"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              <span className="text-xl md:text-xl uppercase">
                {currentInfo.dayOfWeek}
              </span>

              <span className="mx-2 text-xl md:text-2xl">|</span>

              <span className="text-xl md:text-xl uppercase">
                {currentInfo.hour}
              </span>

              <span className="block mt-2 text-3xl md:text-3xl">
                {currentInfo.fullDate}
              </span>
            </p>
          </div>

          {/* <GuestConfirmForm
            guestType={currentInfo.type}
            ceremonyName={currentInfo.ceremonyName}
          /> */}

          <div className="w-full mt-6">
            <Link
              href={`/our-story/${currentInfo.type}`}
              className="
    relative z-50
    flex items-center justify-center gap-2
    w-full py-4
    rounded-full
    bg-[#c9a227]
    text-[#b33a4a]
    uppercase tracking-[0.3em]
    text-[11px] font-semibold
    shadow-lg
    hover:bg-[#e6d6a8]
    transition-all duration-300
  "
            >
              <span></span>
              <span>Mở Thiệp Cưới</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
