import React from 'react';
import { useRouter } from 'next/router';
import { ProductResType } from "@/schemaValidations/product.schema";

type Product = ProductResType['data'];

interface UpdateSpeakerFormProps {
  product?: Product;
}

export default function UpdateSpeakerForm({ product }: UpdateSpeakerFormProps, ) {
  // Fetch product details using the ID if necessary, or use the passed `product` prop
  return (
    <form>
      <h2>Update Product Information</h2>
      {product ? (
        <>
          <div>
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" value={product.Id} readOnly />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={product.Name} readOnly />
          </div>
          <div>
            <label htmlFor="createAt">Created At:</label>
            <input type="text" id="createAt" value={product.CreateAt?.toString()} readOnly />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" value={product.Price} readOnly />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" value={product.Decription} readOnly />
          </div>
          <div>
            <label htmlFor="unitInStock">Units in Stock:</label>
            <input type="number" id="unitInStock" value={product.UnitInStock} readOnly />
          </div>
          <div>
            <label htmlFor="img">Image URL:</label>
            <input type="text" id="img" value={product.Img} readOnly />
          </div>
          <div>
            <label htmlFor="brand">Brand:</label>
            <input type="text" id="brand" value={product.Brand?.Name} readOnly />
          </div>
        </>
      ) : (
        <p>No product information available.</p>
      )}
    </form>
  );
}
