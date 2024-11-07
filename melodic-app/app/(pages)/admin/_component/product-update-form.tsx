"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductDetailResType } from '@/schemaValidations/product.schema';
import speakerApiRequest from '@/api/speaker';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';



interface UpdateProductFormProps {
    product: ProductDetailResType;
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ product }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        id: product.id,
        name: product.name || '',
        brandId: product.brand.BrandId || '',
        price: product.price || 0,
        decription: product.decription || '',
        unitInStock: product.unitInStock || 0,
        img: product.img || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'price' || name === 'unitInStock' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await speakerApiRequest.updateSpeaker(formData.id, formData); 
            router.push('/admin/product'); 
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label htmlFor="brandId">Brand ID</Label>
                <Input
                    type="text"
                    id="brandId"
                    name="brandId"
                    value={formData.brandId}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label htmlFor="price">Price</Label>
                <Input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label htmlFor="decription">Description</Label>
                <textarea
                    id="decription"
                    name="decription"
                    value={formData.decription}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div>
                <Label htmlFor="unitInStock">Unit In Stock</Label>
                <Input
                    type="number"
                    id="unitInStock"
                    name="unitInStock"
                    value={formData.unitInStock}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label htmlFor="img">Image URL</Label>
                <Input
                    type="text"
                    id="img"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                />
            </div>

            <Button type="submit" className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                Update Product
            </Button>
        </form>
    );
};

export default UpdateProductForm;
