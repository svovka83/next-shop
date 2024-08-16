import React from "react";
import { Dialog, DialogContent } from "../../ui/dialog";
import { Button } from "../../ui";
import { signIn, useSession } from "next-auth/react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const { data: session } = useSession();

  const handleClosed = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClosed}>
      <DialogContent className="p-0 w-[450px] bg-white">
        FORM
        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            type="button"
            className="gap-2 h-12 p-2 flex-1"
            onClick={() =>
              signIn("github", { callbackUrl: "/", redirect: true })
            }
          >
            <img
              className="w-6 h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
            />
            Github
          </Button>
          <Button
            variant="secondary"
            type="button"
            className="gap-2 h-12 p-2 flex-1"
            onClick={() =>
              signIn("google", { callbackUrl: "/", redirect: true })
            }
          >
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
