"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseForm } from "..";
import { ProductWithRelations } from "@/@types/prisma";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      {/* відображається коли присутній product, router.back() - повернення на попередню сторінку */}
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <DialogTitle className="absolute invisible"></DialogTitle>
        <ChooseForm product={product} closeModal={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
