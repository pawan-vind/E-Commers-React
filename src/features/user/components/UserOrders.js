import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserOrders, selectUserInfoStatus } from "../userSlice";
import { Grid } from "react-loader-spinner";
import { discountPrice } from "../../../app/constant";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserInfoStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Your Orders</h1>
      {status === "loading" && (
        <div className="flex justify-center my-10">
          <Grid visible={true} height="80" width="80" color="#4fa94d" ariaLabel="grid-loading" radius="12.5" />
        </div>
      )}
      <div className="space-y-8">
        {orders?.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900">Order # {order.id}</h2>
            <p className="text-sm text-gray-600">Status: {order.status}</p>
            <div className="mt-4 border-t pt-4">
              <ul className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="flex py-4 gap-4">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.product.title}</h3>
                      <p className="text-sm text-gray-500">{item.product.brand}</p>
                      <p className="text-sm text-gray-900 font-semibold">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">${discountPrice(item.product)}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 border-t pt-4 flex justify-between text-gray-900 font-medium">
              <p>Subtotal:</p>
              <p>${order.totalAmount}</p>
            </div>
            <div className="flex justify-between text-gray-900 font-medium">
              <p>Total Items:</p>
              <p>{order.totalItems}</p>
            </div>
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h4 className="font-semibold text-gray-900">Shipping Address</h4>
              <p className="text-sm text-gray-600">{order.selectedAddress.name}</p>
              <p className="text-sm text-gray-600">{order.selectedAddress.street}, {order.selectedAddress.city}, {order.selectedAddress.state} - {order.selectedAddress.pinCode}</p>
              <p className="text-sm text-gray-600">Phone: {order.selectedAddress.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
