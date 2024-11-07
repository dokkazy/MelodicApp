"use client";
import { useAppContext } from "@/providers/AppProvider";
import React, { useState, useEffect } from "react";

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

interface Brand {
  id: string;
  name: string;
}

interface Speaker {
  id: string;
  name: string;
  brand: Brand;
  price: number;
  decription: string;
  unitInStock: number;
  mainImg: string;
}

interface OrderItem {
  speakerName: string;
  units: number;
  unitPrice: number;
  discount: number;
  speaker: Speaker;
}

interface Order {
  id: string;
  orderCode: number;
  userId: string;
  orderDate: string;
  address: Address;
  phoneNumber: string;
  tax: number;
  description: string;
  orderStatus: number;
  paymentId: string;
  orderItems: OrderItem[];
}

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { sessionToken } = useAppContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://localhost:7149/api/order", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${sessionToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [sessionToken]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 mb-4 rounded-md shadow">
            <h2 className="text-lg font-semibold">
              Order Code: {order.orderCode}
            </h2>
            <p>
              <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p>
              <strong>User ID:</strong> {order.userId}
            </p>
            <p>
              <strong>Phone Number:</strong> {order.phoneNumber}
            </p>
            <p>
              <strong>Address:</strong> {`${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country} - ${order.address.zipCode}`}
            </p>
            <p>
              <strong>Tax:</strong> ${order.tax}
            </p>
            <p>
              <strong>Description:</strong> {order.description}
            </p>
            <p>
              <strong>Status:</strong> {order.orderStatus}
            </p>
            <p>
              <strong>Payment ID:</strong> {order.paymentId}
            </p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Order Items</h3>
              {order.orderItems.map((item, index) => (
                <div key={index} className="border-b pb-2 mb-2">
                  <p>
                    <strong>Speaker Name:</strong> {item.speakerName}
                  </p>
                  <p>
                    <strong>Units:</strong> {item.units}
                  </p>
                  <p>
                    <strong>Unit Price:</strong> ${item.unitPrice}
                  </p>
                  <p>
                    <strong>Discount:</strong> {item.discount}%
                  </p>
                  <p>
                    <strong>Total Price:</strong> ${item.units * item.unitPrice * (1 - item.discount / 100)}
                  </p>
                  <div className="mt-2">
                    <p>
                      <strong>Speaker Brand:</strong> {item.speaker.brand.name}
                    </p>
                    <p>
                      <strong>Description:</strong> {item.speaker.decription}
                    </p>
                    <p>
                      <strong>Unit in Stock:</strong> {item.speaker.unitInStock}
                    </p>
                    <img
                      src={item.speaker.mainImg}
                      alt={item.speaker.name}
                      className="w-32 h-32 mt-2 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;
