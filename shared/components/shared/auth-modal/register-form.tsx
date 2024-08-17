import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormRegister, formRegisterSchema } from "./schemas";
import { FormInput } from "..";
import { Button } from "../../ui";
import toast from "react-hot-toast";
import { registerUser } from "@/app/actions";

interface Props {
  onClose?: VoidFunction; // при успішній авторизації закриваємо модальне вікно
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormRegister>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegister) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success("Register success", { duration: 4000, icon: "👍" });

      onClose?.();
    } catch (error) {
      console.error("[Error Register]", error);
      toast.error("Cant enter to your account", { duration: 4000, icon: "❌" });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput name="email" label="Email" required />
        <FormInput name="fullName" label="Full Name" required />
        <FormInput name="password" label="Password" required />
        <FormInput name="confirmPassword" label="Confirm Password" required />

        <Button
          type="submit"
          className="h-12 text-base"
          loading={form.formState.isSubmitting}
        >
          Register
        </Button>
      </form>
    </FormProvider>
  );
};
