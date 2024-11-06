'use-client'

import { Button } from "@/components/ui/button"
import { ProductDetailResType, ProductResType } from "@/schemaValidations/product.schema"
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
import speakerApiRequest from "@/api/speaker"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
  
export default function DeleteProduct({product} : {product: ProductResType['data']}){
const {toast} = useToast();
const router = useRouter();
const deleteProduct =  async () =>{
    try{
    const result = await  speakerApiRequest.deleteSpeakers(product.Id);
    toast({
        description: result.payload.message,
    })
    router.refresh();
    }catch(error){
        console.log(error)
    }
}

    return(
        <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={'destructive'}>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có muốn xóa sản phẩm không?</AlertDialogTitle>
            <AlertDialogDescription>
              Sản phẩm &rdquo;{product.Name}&rdquo; sẽ bị xóa vĩnh viễn!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProduct}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}