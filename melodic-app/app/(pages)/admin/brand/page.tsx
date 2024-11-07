'use client'

import React, { useEffect, useState } from "react";
import brandApiRequest from "@/api/brand";
import { BrandListResType } from "@/schemaValidations/brand.schema";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import BrandAddButton from "../_component/brand-add-button";
import DeleteBrand from "../_component/brand-delete";
import { useRouter } from "next/navigation";

export default function BrandPage() {
  const { toast } = useToast();
  const [brandList, setBrandList] = useState<BrandListResType[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await brandApiRequest.getListBrand();
      setBrandList(response.payload || []);
    } catch (error) {
      console.error("Failed to fetch brand:", error);
    } finally {
      setLoading(false);
    }
  };

  // New function to remove a deleted brand from the state
  const handleDeleteBrand = (brandId: string) => {
    setBrandList((prevList) => prevList.filter((brand) => brand.brandId !== brandId));
    router.push('/admin/product')
    router.refresh();
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Brand List</h1>
          <div className="mb-4">
            <BrandAddButton />
          </div>
          {brandList.length > 0 ? (
            <Table>
              <TableCaption>A list of brands.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="max-w-lg font-bold">BrandId</TableHead>
                  <TableHead className="font-bold">Brand Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brandList.map((brand) => (
                  <TableRow key={brand.brandId}>
                    <TableCell>{brand.brandId}</TableCell>
                    <TableCell>{brand.name}</TableCell>
                    <TableCell>
                      <DeleteBrand brand={brand} onDelete={handleDeleteBrand} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No brands available.</p>
          )}
        </>
      )}
    </div>
  );
}
