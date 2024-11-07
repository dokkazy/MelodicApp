"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Brand {
  brandId: string;
  name: string;
}

interface ProductDetail {
  id: string;
  name: string;
  brand: Brand;
  price: number;
  decription: string;
  unitInStock: number;
  img: string;
}

interface ProductUpdateBody {
  id: string;
  name: string;
  brandId: string;
  price: number;
  decription: string;
  unitInStock: number;
  img: string;
}

const UpdateProductPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ProductUpdateBody>({
    id: params.id,
    name: "",
    brandId: "",
    price: 0,
    decription: "",
    unitInStock: 0,
    img: ""
  });

  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://localhost:7149/api/speakers/${params.id}`);
        const data = await response.json();
        console.log("Full API response:", data);
  
        const productData: ProductDetail = data.payload || data;
  
        if (productData) {
          setProduct(productData);
          setFormData({
            id: productData.id,
            name: productData.name,
            brandId: productData.brand?.brandId || "",
            price: productData.price,
            decription: productData.decription,
            unitInStock: productData.unitInStock,
            img: productData.img
          });
        } else {
          console.error("Product data is missing in the API response.");
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await fetch("https://localhost:7149/api/brand");
        const brandsData = await response.json();
        setBrands(brandsData); // Assuming the API response is an array of brands
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    fetchProduct();
    fetchBrands();
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "unitInStock" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7149/api/speakers/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      alert("Product updated successfully!");
      router.push("/admin/product");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Error updating product.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <h1 className="text-center font-bold">Update Speaker</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span>Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full border rounded p-2"
          />
        </label>

        <label className="block">
          <span>Brand:</span>
          <select
            name="brandId"
            value={formData.brandId}
            onChange={handleInputChange}
            required
            className="w-full border rounded p-2"
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.brandId} value={brand.brandId}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span>Price:</span>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="w-full border rounded p-2"
          />
        </label>

        <label className="block">
          <span>Description:</span>
          <textarea
            name="decription"
            value={formData.decription}
            onChange={handleInputChange}
            required
            className="w-full border rounded p-2"
          />
        </label>

        <label className="block">
          <span>Units in Stock:</span>
          <input
            type="number"
            name="unitInStock"
            value={formData.unitInStock}
            onChange={handleInputChange}
            required
            className="w-full border rounded p-2"
          />
        </label>

        <label className="block">
          <span>Image URL:</span>
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleInputChange}
            required
            className="w-full border rounded p-2"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProductPage;
