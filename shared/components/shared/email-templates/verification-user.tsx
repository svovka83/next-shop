import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import React from "react";

interface Props {
  code: string;
}
{
  /* лист клієнту з кодом для підтвердження реєстрації */
}
export const VerificationUser: React.FC<Props> = ({ code }) => (
  <div>
    <p>
      Confirmation code: <b>{code}</b>
    </p>

    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
        Confirm registration
      </a>
    </p>
  </div>
);
