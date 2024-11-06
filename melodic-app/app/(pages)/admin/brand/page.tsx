"use client"
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
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
export default function BrandPage() {
  const { toast } = useToast();
  const [brandList, setBrandList] = useState<BrandListResType[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const response = await brandApiRequest.getListBrand();
        setBrandList(response.payload || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch brand:", error);
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : (
        <>

          <h1 className="text-2xl font-bold mb-4">Brand List</h1>
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
                    <TableCell className="">{brand.brandId}</TableCell>
                    <TableCell className="">{brand.name}</TableCell>
                    <TableCell className="">Delete</TableCell>
                    <TableCell className=""> </TableCell>
                    <TableCell className=""> </TableCell>
                  </TableRow>
                ))};

              </TableBody>
            </Table>

          ) : (
            <p>No brands available.</p>
          )}
        </>
      )
      }
    </div>
  );
};
