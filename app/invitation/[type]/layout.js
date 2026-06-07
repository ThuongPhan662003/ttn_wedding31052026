export async function generateMetadata({ params }) {
  const { type } = await params;

  const isNhaTrai = type === "nha_trai";

  return {
    title: isNhaTrai
      ? "Lễ Tân Hôn: Trọng Nghĩa & Thu Thảo"
      : "Lễ Vu Quy: Thu Thảo & Trọng Nghĩa",

    description:
      "Trân trọng kính mời bạn tham dự ngày vui của chúng tôi.",

    openGraph: {
      title: isNhaTrai
        ? "Lễ Tân Hôn: Trọng Nghĩa & Thu Thảo"
        : "Lễ Vu Quy: Thu Thảo & Trọng Nghĩa",

      description:
        "Trân trọng kính mời bạn tham dự ngày vui của chúng tôi.",

      images: [
        {
          url: "https://thaonghiawedding.vercel.app/images/open-graph.jpg",
          width: 1200,
          height: 630,
          alt: "Thiệp cưới Trọng Nghĩa & Thu Thảo",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      images: [
        "https://thaonghiawedding.vercel.app/images/open-graph.jpg",
      ],
    },
  };
}

export default function Layout({ children }) {
  return children;
}