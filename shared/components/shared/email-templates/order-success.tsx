import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import React from "react";

interface Props {
  orderId: number;
  items: CartItemDTO[];
}
{
  /* лист клієнту про успішну оплату */  // реалізувати !!!!!
}
export const OrderSuccess: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Thank you for your order!</h1>

    <p>
      Your order number is: <strong>{orderId}</strong> was placed successfully.
      List products:
    </p>

    <hr />

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productItem.product.name} | {item.productItem.price} x{" "}
          {item.quantity} = {item.productItem.price * item.quantity} USD
        </li>
      ))}
    </ul>
  </div>
);
