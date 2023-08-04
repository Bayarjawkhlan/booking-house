"use client";

import { User } from "@prisma/client";
import clsx from "clsx";
import { FC } from "react";
import useFavorite from "../hooks/useFavorite";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

const HeartButton: FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const { toggleFavorite, hasFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={clsx(hasFavorite ? "fill-rose-500" : "fill-neutral-500/70")}
      />
    </div>
  );
};

export default HeartButton;
