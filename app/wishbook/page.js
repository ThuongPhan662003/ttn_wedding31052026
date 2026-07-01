"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

export default function WishbookPage() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const layouts = [
    {
      bride: "top-10 left-0",
      groom: "bottom-10 right-0",
    },

    {
      bride: "top-0 left-10",
      groom: "top-0 right-10",
    },

    {
      bride: "bottom-0 left-10",
      groom: "bottom-0 right-10",
    },

    {
      bride: "top-1/2 left-0 -translate-y-1/2",
      groom: "top-1/2 right-0 -translate-y-1/2",
    },

    {
      bride: "top-20 left-4",
      groom: "bottom-20 right-4",
    },

    {
      bride: "bottom-20 left-4",
      groom: "top-20 right-4",
    },

    {
      bride: "top-6 left-8",
      groom: "bottom-6 right-8",
    },

    {
      bride: "bottom-6 left-8",
      groom: "top-6 right-8",
    },

    {
      bride: "top-1/4 left-4",
      groom: "top-3/4 right-4 -translate-y-1/2",
    },

    {
      bride: "top-3/4 left-4 -translate-y-1/2",
      groom: "top-1/4 right-4",
    },
  ];
  // Danh sách ảnh cô dâu chú rể
  const weddingDecor = [
    {
      brideImage: "/decorations/bride1.jpg",
      bridePosition: "top-left",

      groomImage: "/decorations/groom1.jpg",
      groomPosition: "bottom-right",
    },

    {
      brideImage: "/decorations/bride2.jpg",
      bridePosition: "center-left",

      groomImage: "/decorations/groom2.jpg",
      groomPosition: "top-right",
    },

    {
      brideImage: "/decorations/bride3.jpg",
      bridePosition: "bottom-left",

      groomImage: "/decorations/groom3.jpg",
      groomPosition: "center-right",
    },

    {
      brideImage: "/decorations/bride4.jpg",
      bridePosition: "top-center",

      groomImage: "/decorations/groom4.jpg",
      groomPosition: "bottom-center",
    },
  ];
  const splitWishIntoSlides = (wish, maxChars = 350) => {
    const text = wish.loi_chuc || "";

    if (text.length <= maxChars) {
      return [{ ...wish, part: 1, totalParts: 1 }];
    }

    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];

    const pages = [];
    let current = "";

    sentences.forEach((sentence) => {
      if ((current + sentence).length > maxChars) {
        pages.push(current.trim());
        current = sentence;
      } else {
        current += " " + sentence;
      }
    });

    if (current.trim()) {
      pages.push(current.trim());
    }

    return pages.map((content, index) => ({
      ...wish,
      loi_chuc: content,
      part: index + 1,
      totalParts: pages.length,
    }));
  };
  // Vị trí hiển thị ảnh

  // Lấy dữ liệu từ API
  const fetchWishes = async () => {
    try {
      const response = await fetch("/api/wishes");

      if (!response.ok) {
        throw new Error("Không thể tải lời chúc");
      }

      const data = await response.json();

      setWishes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Polling realtime mỗi 5 giây
  useEffect(() => {
    fetchWishes();

    const interval = setInterval(fetchWishes, 5000);

    return () => clearInterval(interval);
  }, []);
  const slides = wishes.flatMap((wish) => splitWishIntoSlides(wish, 350));
  return (
    <main className="min-h-screen bg-white flex flex-col items-center p-4 md:p-8 relative overflow-hidden">
      {/* Background blur */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C9A227]/10 rounded-full blur-3xl" />

      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#5F7161]/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-12 relative z-10 border-b border-[#C9A227]/15 pb-4">
        <Link
          href="/"
          className="group flex items-center gap-2 text-[10px] font-medium text-[#5F7161]/70 hover:text-[#C9A227] tracking-[0.3em] uppercase"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Về Trang Chủ
        </Link>

        <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A227] font-semibold">
          ✦ Live Wedding Wishbook ✦
        </p>
      </div>

      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-14 z-10">
        <h1
          className="text-4xl md:text-6xl text-[#5F7161] mb-3"
          style={{
            fontFamily: "var(--font-playfair), serif",
          }}
        >
          Sảnh Lời Chúc Mừng
        </h1>

        <div className="flex justify-center items-center gap-3 mb-6">
          <span className="w-12 h-px bg-[#C9A227]/40"></span>

          <span className="text-[#C9A227]">✦</span>

          <span className="w-12 h-px bg-[#C9A227]/40"></span>
        </div>

        <p className="text-sm text-[#5F7161]/70">
          Nơi lưu giữ những thông điệp yêu thương từ quý quan khách.
        </p>
      </div>

      <div className="w-full max-w-7xl relative z-10 flex-1">
        {loading ? (
          <div className="text-center py-20">
            <p className="animate-pulse text-[#C9A227]">
              Đang đồng bộ sảnh lời chúc...
            </p>
          </div>
        ) : wishes.length === 0 ? (
          <div className="text-center py-20">Chưa có lời chúc nào.</div>
        ) : (
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            effect="fade"
            navigation
            loop
            className="rounded-[40px]"
          >
            {slides.map((item, index) => {
              const decor = weddingDecor[index % weddingDecor.length];
              const layout = layouts[index % layouts.length];

              return (
                <SwiperSlide key={`${item.id}-${item.part}`}>
                  <div className="relative min-h-[700px] flex items-center">
                    {/* Card lời chúc */}
                    {/* Card lời chúc */}
                    <div
                      className="
    w-[85%]
    max-w-6xl
    mx-auto
    bg-white
    rounded-[40px]
    border border-[#C9A227]/15
    shadow-[0_30px_60px_-20px_rgba(95,113,97,0.15)]
    overflow-hidden
    z-10
  "
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
                        {/* ===== BÊN TRÁI - ẢNH ===== */}
                        <div className="relative bg-[#F8F6F2] flex items-center justify-center p-10">
                          <div className="space-y-6">
                            <img
                              src={decor.brideImage}
                              alt="Bride"
                              className="w-72 h-72 object-cover rounded-3xl shadow-xl rotate-[-4deg]"
                            />

                            <img
                              src={decor.groomImage}
                              alt="Groom"
                              className="w-72 h-72 object-cover rounded-3xl shadow-xl ml-auto rotate-[4deg]"
                            />
                          </div>
                        </div>

                        {/* ===== BÊN PHẢI - LỜI CHÚC ===== */}
                        <div className="flex flex-col justify-between p-12">
                          <div>
                            <h2
                              className="text-4xl text-[#5F7161] mb-3"
                              style={{
                                fontFamily: "var(--font-playfair), serif",
                              }}
                            >
                              {item.ten_khach}
                            </h2>

                            <p className="uppercase tracking-[0.3em] text-xs text-[#C9A227] mb-8">
                              Guest • Khách Quý
                            </p>

                            {item.totalParts > 1 && (
                              <span className="inline-block mb-6 px-4 py-1 rounded-full bg-[#C9A227]/10 text-[#C9A227] text-xs">
                                Trang {item.part}/{item.totalParts}
                              </span>
                            )}

                            <p className="text-xl italic leading-loose text-[#5F7161]/90">
                              ❝ {item.loi_chuc} ❞
                            </p>

                            {item.hinh_anh_url && (
                              <img
                                src={item.hinh_anh_url}
                                alt=""
                                className="mt-8 rounded-3xl w-full max-h-64 object-cover shadow-lg"
                              />
                            )}
                          </div>

                          <div className="border-t border-[#C9A227]/10 pt-6 mt-10 text-sm text-[#5F7161]/40">
                            {item.thoi_gian}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>

      <footer className="w-full text-center text-[9px] text-[#5F7161]/40 uppercase tracking-[0.4em] mt-20 border-t border-[#C9A227]/10 pt-4">
        Trọng Nghĩa & Thu Thảo Wedding • 2026
      </footer>
    </main>
  );
}
