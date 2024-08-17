import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormLogin, formLoginSchema } from "./schemas";
import { FormInput, Title } from "..";
import { Button } from "../../ui";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
  onClose?: VoidFunction; // при успішній авторизації закриваємо модальне вікно
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLogin>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLogin) => {
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!response?.ok) {
        return toast.error("Cant enter to your account", {
          duration: 4000,
          icon: "❌",
        });
      }

      toast.success("Login success", { duration: 4000, icon: "👍" });

      onClose?.();
    } catch (error) {
      console.error("[Error Login]", error);
      toast.error("Cant enter to your account", { duration: 4000, icon: "❌" });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Enter to your account" className="font-bold" />
            <p className="text-gray-400">Enter your email and password</p>
          </div>
        </div>

        <FormInput name="email" label="Email" required />
        <FormInput name="password" label="Password" required />

        <Button
          type="submit"
          className="h-12 text-base"
          loading={form.formState.isSubmitting}
        >
          Enter
        </Button>
      </form>
    </FormProvider>
  );
};
