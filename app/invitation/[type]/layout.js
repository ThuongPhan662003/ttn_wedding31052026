export async function generateMetadata({ params }) {
  const { type } = await params;

  return {
    title:
      type === "nha_trai"
        ? "LỄ THÀNH HÔN"
        : "LỄ VU QUY",
  };
}

export default function Layout({ children }) {
  return children;
}