import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Title } from ".";

import { Plus } from "lucide-react";
import { Button } from "../ui";

interface Props {
  id: number;
  name: string;
  price: number;
  imageURL: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageURL,
  className,
}) => {
  return (
    <div className={cn("", className)}>
      <Link href={`/product/${id}`}>
        <div className="flex flex-col p-6 bg-secondary">
          <img className="w-[215px] h-[215px]" src={imageURL} alt={name} />

          <Title text={name} size="sm" className="mb-1 mt-1 font-bold" />

          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-[20px]">Price: {price} $</span>
            <Button variant="outline" className="text-base font-bold">
              <Plus size={20} className="mr-1" />
              Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};
