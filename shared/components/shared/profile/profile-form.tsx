"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { TFormRegister, formRegisterSchema } from "../auth-modal/schemas";
import { Container, FormInput, Title } from "..";
import { Button } from "../../ui";
import { updateUserInfo } from "@/app/actions";

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegister) => {
    try {
      await updateUserInfo({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      toast.success("Profile updated 📝", {
        icon: "✅",
      });
    } catch (error) {
      return toast.error("Missing updated data", {
        icon: "❌",
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="pl-20 mt-10 mb-20">
      <Title
        text={`Personal data | #${data.id}`}
        size="md"
        className="font-bold"
      />

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="FullName" required />

          <FormInput
            type="password"
            name="password"
            label="New password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Confirm password"
            required
          />

          <Button
            type="submit"
            className="text-base mt-10"
            disabled={form.formState.isSubmitting}
          >
            Save
          </Button>

          <Button
            type="button"
            className="text-base"
            variant="secondary"
            onClick={onClickSignOut}
            disabled={form.formState.isSubmitting}
          >
            Exit
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
