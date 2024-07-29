"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { Api } from "@/services/api-client";

import { useClickAway } from "react-use";

import { Search } from "lucide-react";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);

  useClickAway(ref, () => {
    setFocused(false);
    {
      /* закриття пошукового вікна, якщо ми натиснули за межами вікна ref - посилання на вікно */
    }
  });

  React.useEffect(() => {
    Api.products.search(searchQuery);
  }, [searchQuery]);

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
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setFocused(true)}
        />
        
        {/* вспливаюче вікно знайдених продуктів */}
        <div
          className={cn(
            "absolute w-full bg-white rounded-xl py-4 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focused && "visible opacity-100 top-12"
          )}
        >
          <Link
            href="/product/1"
            className="flex items-center gap-3 px-4 py-2 hover:bg-primary/10"
          >
            <img
              src="https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67"
              width={40}
              height={40}
              alt="product"
            />
            <span>product1</span>
          </Link>
        </div>
      </div>
    </>
  );
};
