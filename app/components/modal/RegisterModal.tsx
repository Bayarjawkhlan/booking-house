"use client";

import { FC, useCallback, useState } from "react";
import axios from "axios";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useUserMenu } from "@/app/hooks/useUserMenu";
import { useLoginModal } from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../input/Input";
import toast from "react-hot-toast";
import Button from "../Button";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RegisterModalProps {}

const RegisterModal: FC<RegisterModalProps> = () => {
  const { refresh } = useRouter();
  const { onClose, isOpen } = useRegisterModal();
  const { onOpen: onOpenLoginModal } = useLoginModal();
  const { onClose: onCloseMenu } = useUserMenu();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await axios.post("/api/register", data);
      signIn("credentials", data);
      refresh();
      toast.success("Successfully registered");
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggle = useCallback(() => {
    onClose();
    onOpenLoginModal();
  }, [onClose, onOpenLoginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to the Airbnb" subTitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        type="password"
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
          <div className="">Already have an account</div>
          <div
            onClick={toggle}
            className="text-neutral-800 text-[18px] font-normal cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      actionLabel="Continue"
      title="Register"
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

export default RegisterModal;
