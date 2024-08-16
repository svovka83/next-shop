import React from "react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Button } from "../../ui";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";

interface Props {
  onClickSingIn?: () => void;
}

export const ProfileButton: React.FC<Props> = ({ onClickSingIn }) => {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <Button
          onClick={onClickSingIn}
          variant="outline"
          className="flex items-center gap-1"
        >
          <User size="16px" /> Enter
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size="16px" /> Profile
          </Button>
        </Link>
      )}
    </div>
  );
};
