'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
    CreateProductBodyType,
    ProductDetailResType,
    UpdateProductBodyType,
    UpdateProductBody,
} from '@/schemaValidations/product.schema'
import speakerApiRequest from '@/api/speaker'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { BrandListResType } from '@/schemaValidations/brand.schema'
import brandApiRequest from '@/api/brand'

type Product = ProductDetailResType

const ProductUpdateForm = ({ product }: { product?: Product }) => {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const [brandList, setBrandList] = useState<BrandListResType[]>([])
    const form = useForm<UpdateProductBodyType>({
        resolver: zodResolver(UpdateProductBody),
        defaultValues: {
            id: product?.id || '',
            name: product?.name || '',
            brandId: product?.brand?.BrandId || "",
            price: product?.price || 0,
            decription: product?.decription || '',
            unitInStock: product?.unitInStock || 0,
            img: product?.img || '',
        },
    });

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await brandApiRequest.getListBrand();
                setBrandList(response.payload);
            } catch (error) {
                console.error('Failed to fetch brands', error);
            }
        };
        fetchBrands();
    }, []);

    const updateProduct = async (id: string, values: UpdateProductBodyType) => {
        setLoading(true);
        try {
            const result = await speakerApiRequest.updateSpeaker(id, values);
            console.log(result)
            console.log(values)
            toast({
                description: result.payload.message,
            });
            router.push('/admin/product');
            router.refresh();
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data: UpdateProductBodyType) => {
        if (loading) return;
        await updateProduct(data.id, data);
    };

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-2 flex-shrink-0 w-full'
                    noValidate
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Speaker Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Speaker Name' type='text' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="brandId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Brand</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        className="form-select w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                                        value={field.value || ""}  // Use the value from the form state
                                    >
                                        <option value="" disabled>
                                            Select a brand...
                                        </option>                                    
                                        {brandList.map((brand) => (
                                            <option key={brand.brandId} value={brand.brandId}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name='price'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input placeholder='Price' type='number' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='decription'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder='Description' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='unitInStock'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Unit in Stock</FormLabel>
                                <FormControl>
                                    <Input placeholder='Unit in Stock' type='number' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='img'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                    <Input placeholder='URL' type='url' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type='submit' className='!mt-8 w-full' disabled={loading}>
                        Update
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ProductUpdateForm;
