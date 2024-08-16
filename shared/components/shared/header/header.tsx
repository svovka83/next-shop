"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  AuthModal,
  CartButton,
  Container,
  ProfileButton,
  SearchInput,
} from "..";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  const [open, setOpen] = React.useState(false);

  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (searchParams.has("paid")) {
      toast.success(
        "The order is paid! The information has been sent to the mail",
        {
          duration: 5000,
        }
      );
    }
  }, []); // прибрати з посилання "http://localhost:3000/?paid" - /?paid після відпрацювання toast.success

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8 px-4">
        {/* Left size */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <img
              src="https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A"
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
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Right size */}
        <div className="flex items-center gap-4">
          <AuthModal open={open} onClose={() => setOpen(false)} />

          <ProfileButton onClickSingIn={() => setOpen(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
