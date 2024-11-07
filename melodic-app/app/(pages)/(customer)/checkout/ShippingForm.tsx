import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  shippingInfoSchema,
  ShippingInfoType,
} from "@/schemaValidations/cart.schema";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ShippingFormProps {
  onSubmit: (values: ShippingInfoType) => void;
  onBack: () => void;
}

const ShippingForm = ({ onSubmit, onBack }: ShippingFormProps) => {
  const [loading, setLoading] = React.useState(false);
  const form = useForm<ShippingInfoType>({
    resolver: zodResolver(shippingInfoSchema),
    defaultValues: {
      street: "",
      country: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const [street, country, city, state, zipCode] = useWatch({
    control: form.control,
    name: ["street", "country", "city", "state", "zipCode"],
  });

  const handleSubmit = (values: ShippingInfoType) => {
   onSubmit(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Shipping information</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Payment method</h2>
          <RadioGroup defaultValue="bank" className="space-y-2">
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="bank" id="bank" />
              <Label htmlFor="bank">Chuyển khoản</Label>
            </div>
          </RadioGroup>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Cart
          </Button>
          <Link href={"/"}>
            <Button
              type="submit"
              disabled={loading|| !street || !country || !city || !state || !zipCode}
              className="bg-cart-primary hover:bg-cart-primary/90"
            >
              {loading ? (
                <svg
                  className="mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Order"
              )}
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default ShippingForm;
