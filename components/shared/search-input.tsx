"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client"; // автоматично згенерований тип за допомогою prisma
import Link from "next/link";

import { Api } from "@/services/api-client";

import { useClickAway, useDebounce } from "react-use";

import { Search } from "lucide-react";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const ref = React.useRef<HTMLInputElement>(null);

  useClickAway(ref, () => {
    setFocused(false); // закриття пошукового вікна, якщо ми натиснули за межами вікна ref - посилання на вікно
  });

  useDebounce(
    () => {
      Api.products.search(searchQuery).then((data) => setProducts(data));
    },
    500,
    [searchQuery]
  );

  return (
    <>
      {focused && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-30" />
      )}

      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className
        )}
      >
        {/* іконка в полі пошуку */}
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          onFocus={() => setFocused(true)}
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* вспливаюче вікно знайдених продуктів */}
        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-4 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12"
            )}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="flex items-center gap-3 px-4 py-2 hover:bg-primary/10"
              >
                <img
                  className="w-10 h-10"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
