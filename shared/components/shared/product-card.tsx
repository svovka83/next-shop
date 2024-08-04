import React from "react";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { Title } from ".";

import { Plus } from "lucide-react";
import { Button } from "../ui";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
}) => {
  return (
    <div className={cn("rounded-2xl shadow bg-secondary hover:shadow-2xl hover:-translate-y-2 duration-300", className)}>
      <Link href={`/product/${id}`}>
        <div className="flex flex-col p-6" >
          <img
            className="w-[230px] h-[210px] bg-white rounded-2xl p-8"
            src={imageUrl}
            alt={name}
          />

          <Title text={name} size="sm" className="mb-1 mt-2 font-bold" />

          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-[16px] font-bold">price from: {price} $</span>
            <Button variant="outline" className="text-base font-bold">
              <Plus size={20} />
              Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};
