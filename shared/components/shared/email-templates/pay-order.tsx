import React from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrder: React.FC<Props> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Order # {orderId}</h1>

    <p>
      Pay for the order {totalAmount} $. Follow{" "}
      <a href={paymentUrl}>this link</a> to pay.
    </p>
  </div>
);
