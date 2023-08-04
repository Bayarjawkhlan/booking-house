"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  const { push } = useRouter();

  return (
    <Image
      alt="logo"
      className="hidden md:block cursor-pointer"
      height={100}
      width={100}
      src={"/images/logo.png"}
      onClick={() => push("/")}
    />
  );
};

export default Logo;
