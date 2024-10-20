import ProductDetail from "./ProductDetail";

export default function ProductPage({ params }: { params: { Id: string } }) {
  return <ProductDetail Id={params.Id} />;
}
