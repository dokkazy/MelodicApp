'use client'

import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import brandApiRequest from "@/api/brand"
import { useToast } from "@/hooks/use-toast"
import { BrandListResType } from "@/schemaValidations/brand.schema"
import { useRouter } from "next/navigation"

export default function DeleteBrand({
    brand,
    onDelete,
}: {
    brand: BrandListResType,
    onDelete: (brandId: string) => void
}) {
    const { toast } = useToast();
    const router = useRouter();
    const deleteBrand = async () => {
        try {
            const result = await brandApiRequest.deleteBrand(brand.brandId);
            toast({
                description: result.payload.message,
            });
            router.push('/admin/product')
            router.refresh();
            onDelete(brand.brandId);  // Update the state in BrandPage
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Do you want to delete this brand?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Brand “{brand.name}” will be deleted!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteBrand}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
