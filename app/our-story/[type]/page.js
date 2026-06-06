import WeddingPageClient from "./WeddingPageClient";

export default async function Page({ params }) {
  const { type } = await params;

  return <WeddingPageClient type={type} />;
}
