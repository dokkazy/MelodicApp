"use client" 
import React from 'react';
import { useRouter } from 'next/navigation'; // Correct import for router
import speakerApiRequest from '@/api/speaker'; // Ensure this API can fetch product details by ID
import { ProductDetailResType } from '@/schemaValidations/product.schema';
import ProductUpdateForm from '../../../_component/product-update-form';

const UpdateProductPage = ({ params }: { params: { id: string } }) => { // Accessing params directly
  const [product, setProduct] = React.useState<ProductDetailResType | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProduct = async () => {
      if (params.id) { // Use params.id directly
        try {
          const response = await speakerApiRequest.getSpeakerDetails(params.id); // Implement this API call
          setProduct(response.payload);
        } catch (error) {
          console.error('Failed to fetch product:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>No product found.</div>;

  return(
    <div className="container max-w-2xl mx-auto p-4">
      <h1 className="text-center font-bold">Update Speaker</h1>
      <ProductUpdateForm product={product} />;
    </div>
  ) 
};

export default UpdateProductPage;
