import React from "react";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

import { CartButton, Container, SearchInput } from "..";
import { Button } from "../../ui";
import { User } from "lucide-react";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8 px-4">
        {/* Left size */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <img
              src="https://s7d1.scene7.com/is/image/mcdonalds/Best_McChicken-1:nutrition-calculator-tile"
              alt="Logo"
              width={50}
              height={50}
            />
            <div>
              <h1 className="text-2xl uppercase font-black">Food shop</h1>
              <p className="text-base text-gray-400 leading-3">
              the most delicious
              </p>
            </div>
          </div>
        </Link>

        {/* Search input area */}
        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        {/* Right size */}
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-1">
            <User size="16px" /> Enter
          </Button>
          <CartButton />
        </div>
      </Container>
    </header>
  );
};
