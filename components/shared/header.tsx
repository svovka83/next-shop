import React from "react";
import { cn } from "@/lib/utils";

import { Container } from ".";

import { Button } from "../ui";
import { ArrowRight, ShoppingCart, User } from "lucide-react";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8 px-4">
        {/* Left size */}
        <div className="flex items-center gap-4">
          <img
            src="https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp"
            alt="Logo"
            width={35}
            height={35}
          />
          <div>
            <h1 className="text-2xl uppercase font-black">coffeshop</h1>
            <p className="text-sm text-gray-400 leading-3">
              the best strategy game
            </p>
          </div>
        </div>

        {/* Right size */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size="16px" /> Enter
          </Button>
          <div>
            <Button variant="default" className="group relative">
              <b>0 $</b>
              <span className="h-full w-[1px] bg-white/30 mx-3" />
              <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart
                  size="16px"
                  className="relative"
                  strokeWidth={2}
                />
                <b>0</b>
              </div>
              <ArrowRight
                size="20px"
                className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
