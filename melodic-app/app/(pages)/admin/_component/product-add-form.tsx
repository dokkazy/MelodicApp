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
import { useEffect, useRef, useState } from 'react'
import {
  CreateProductBody,
  CreateProductBodyType,
  ProductResType,
  UpdateProductBodyType,

} from '@/schemaValidations/product.schema'
import speakerApiRequest from '@/api/speaker'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'
import { BrandListResType } from '@/schemaValidations/brand.schema'
import brandApiRequest from '@/api/brand'

type Product = ProductResType['data']

const ProductAddForm = ({ product }: { product?: Product }) => {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const [brandList, setBrandList] = useState<BrandListResType[]>([])
  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: product?.Name ?? '',
      brandId: product?.Brand.BrandId ?? '',
      price: product?.Price ?? 0,
      decription: product?.Decription ?? '',
      unitInStock: product?.UnitInStock ?? 0,
      mainImg: product?.Img ?? ''
    }
  })
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await brandApiRequest.getListBrand()
        setBrandList(response.payload)
      } catch (error) {
        console.error('Failed to fetch brands', error)
      }
    }
    fetchBrands()
  }, [])

  const createProduct = async (values: CreateProductBodyType) => {
    setLoading(true)
    try {
      // Create the product with updated values
      const result = await speakerApiRequest.createSpeaker(values)

      toast({
        description: result.payload.message
      })
      router.push('/admin/product')
      router.refresh()
    } catch (error: any) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }



  async function onSubmit(values: CreateProductBodyType) {
    if (loading) return
    await createProduct(values)
  }

  return (
    <div className="">
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
                    value={field.value || ""}
                  >
                    <option value="" disabled>
                      Select Brand
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
            name='mainImg'
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

          <Button type='submit' className='!mt-8 w-full'>
           Create
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ProductAddForm
