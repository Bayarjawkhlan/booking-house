"use client";

import { FC, useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useUserMenu } from "@/app/hooks/useUserMenu";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../input/Input";
import toast from "react-hot-toast";
import Button from "../Button";

import { FcGoogle } from "react-icons/fc";

interface LoginModalProps {}

const LoginModal: FC<LoginModalProps> = () => {
  const { refresh } = useRouter();
  const { onOpen: onOpenRegisterModal } = useRegisterModal();
  const { onClose, isOpen } = useLoginModal();
  const { onClose: onCloseMenu } = useUserMenu();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((res) => {
      setIsLoading(false);
      if (res?.ok && !res?.error) {
        toast.success("Logged in");
        refresh();
        onClose();
        onCloseMenu();
      }

      if (res?.error) {
        toast.error(res.error);
      }
    });
  };

  const toggle = useCallback(() => {
    onClose();
    onOpenRegisterModal();
  }, [onClose, onOpenRegisterModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subTitle="Log in to your account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex items-center justify-center gap-2">
          <div className="">First time using Airbnb?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 text-[18px] font-normal cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      actionLabel="Continue"
      title="Log in"
      isOpen={isOpen}
      disabled={isLoading}
      onClose={() => {
        onClose();
        onCloseMenu();
      }}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
