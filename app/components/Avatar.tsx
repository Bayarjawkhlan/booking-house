"use client";

import Image from "next/image";
import { FC } from "react";

interface AvatarProps {
  src: string;
}

const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      src={src || "/images/placeholder.jpg"}
      width={30}
      height={30}
      alt="avatar"
      className="rounded-full"
    />
  );
};

export default Avatar;
