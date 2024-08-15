import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { PaymentCallbackData } from "@/@types/payment-service";
import { OrderStatus } from "@prisma/client";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { sendEmail } from "@/shared/functions";
import { OrderSuccess } from "@/shared/components/shared/email-templates/order-success";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData; // реалізувати відповідь платіжної системи

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    const isSuccess = body.object.status === "succeeded";

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSuccess ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED, // працює фейково в create-payment.ts
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[]; // конвертує з рядка в CartItemDTO

    if (isSuccess) {
      await sendEmail(
        order.email,
        "Order successfully completed",
        OrderSuccess({ orderId: order.id, items })
      );
    }
  } catch (error) {
    console.log("[Checkout Callback] Error:", error);

    return new NextResponse("Error", { status: 500 });
  }
}
