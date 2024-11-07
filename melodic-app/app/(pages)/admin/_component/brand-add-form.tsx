"use client"
import brandApiRequest from "@/api/brand"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import { toast } from "@/hooks/use-toast"
import { CreateBrandBody, CreateBrandBodyType } from "@/schemaValidations/brand.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Router } from "next/router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function BrandAddForm() {
    const router = useRouter()

    const form = useForm<CreateBrandBodyType>(
        {
            resolver: zodResolver(CreateBrandBody),
            defaultValues: {
                name: ''
            }
        }
    )

    const createBrand = async (values: CreateBrandBodyType) => {
        try {
            const result = await brandApiRequest.createBrand(values)

            toast({
                description: result.payload.message
            })
            router.push('/admin/brand')
            router.refresh()
        } catch (error: any) {
            console.log(error)
        } finally {
        }
    }

    async function onSubmit(values: CreateBrandBodyType) {

        await createBrand(values)
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
                                <FormLabel>Brand Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Brand Name' type='text' {...field} />
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