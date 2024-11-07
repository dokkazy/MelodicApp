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
import { UsersListResType } from "@/schemaValidations/users.schema";
import userApiRequest from "@/api/users";

export default function UserPage() {

  const { toast } = useToast();
  const [userList, setUserList] = useState<UsersListResType[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await userApiRequest.getListUsers();
      console.log(response)
      setUserList(response.payload || []);
    } catch (error) {
      console.error("Failed to fetch brand:", error);
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-2xl font-bold mb-4">Users List</h1>
        
        {userList.length > 0 ? (
          <Table>
            <TableCaption>A list of User.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-lg font-bold">Users Id</TableHead>
                <TableHead className="font-bold">Email</TableHead>
                <TableHead className="max-w-lg font-bold">Firstname</TableHead>
                <TableHead className="font-bold">Lastname</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList.map((users) => (
                <TableRow key={users.id}>
                  <TableCell>{users.id}</TableCell>
                  <TableCell>{users.email}</TableCell>
                  <TableCell>{users.firstname}</TableCell>
                  <TableCell>{users.lastname}</TableCell>
                  <TableCell>
                    delete
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No users available.</p>
        )}
      </>
    )}
  </div>
  )
}
