type Props = {
  params: Promise<{
    type: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { type } = await params;

  const titleMap: Record<string, string> = {
    nha_trai: "Lễ Tân Hôn: Trọng Nghĩa & Thu Thảo",
    nha_gai: "Lễ Vu Quy: Thu Thảo & Trọng Nghĩa",
  };

  return {
    title: titleMap[type] || "Trang mặc định",
  };
}

export default async function Page({ params }: Props) {
  const { type } = await params;

  return <div>{type}</div>;
};