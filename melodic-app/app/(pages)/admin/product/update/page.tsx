// // /admin/product/update/[id].tsx
// import React from 'react';
// import { useRouter } from 'next/router';
// import speakerApiRequest from '@/api/speaker'; // Ensure this API can fetch product details by ID
// import { ProductDetailResType, ProductResType } from '@/schemaValidations/product.schema';
// import ProductUpdateForm from '../../_component/product-update-form';

// const UpdateProductPage = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [product, setProduct] = React.useState<ProductDetailResType| null>(null);
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     const fetchProduct = async () => {
//       if (typeof id === 'string') { // Ensure 'id' is a string
//         try {
//           const response = await speakerApiRequest.getSpeakerDetails(id); // Implement this API call
//           setProduct(response.payload);
//         } catch (error) {
//           console.error('Failed to fetch product:', error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (!product) return <div>No product found.</div>;

//   return <ProductUpdateForm product={product} />;
// };

// export default UpdateProductPage;
