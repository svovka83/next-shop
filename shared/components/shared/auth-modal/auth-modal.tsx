import React from "react";
import { Dialog, DialogContent } from "../../ui/dialog";
import { Button } from "../../ui";
import { signIn, useSession } from "next-auth/react";
import { LoginForm } from "./login-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<"login" | "register">("login"); // відображаємо форму входу чи реєстрації

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const { data: session } = useSession();

  const handleClosed = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClosed}>
      <DialogContent className="w-[450px] bg-white">
        {type === "login" ? (
          <LoginForm onClose={handleClosed} />
        ) : (
          <h1 className="text-2xl">REGISTER</h1>
        )}

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
        <Button
          variant="outline"
          type="button"
          className="h-12"
          onClick={onSwitchType}
        >
          {type === "login" ? "REGISTER" : "login"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
