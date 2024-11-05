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
import { useRef, useState } from 'react'
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

type Product = ProductResType['data']

const ProductAddForm = ({ product }: { product?: Product }) => {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2 max-w-[600px] flex-shrink-0 w-full'
        noValidate
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input placeholder='Tên sản phẩm' type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='brandId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thương hiệu</FormLabel>
              <FormControl>
                <Input placeholder='ID thương hiệu' type='text' {...field} />
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
              <FormLabel>Giá</FormLabel>
              <FormControl>
                <Input placeholder='Giá' type='number' {...field} />
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
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea placeholder='Mô tả sản phẩm' {...field} />
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
              <FormLabel>Số lượng trong kho</FormLabel>
              <FormControl>
                <Input placeholder='Số lượng' type='number' {...field} />
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
              <FormLabel>URL Hình ảnh chính</FormLabel>
              <FormControl>
                <Input placeholder='URL hình ảnh' type='url' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='!mt-8 w-full'>
          Thêm sản phẩm
        </Button>
      </form>
    </Form>
  )
}

export default ProductAddForm
