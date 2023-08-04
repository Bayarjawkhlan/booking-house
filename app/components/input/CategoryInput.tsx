"use client";

import clsx from "clsx";
import { FC } from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected: boolean;
  label: string;
  description: string;
  icon: IconType;
}

const CategoryInput: FC<CategoryInputProps> = ({
  onClick,
  selected,
  label,
  description,
  icon: Icon,
}) => {
  return (
    <div
      className={clsx(
        "rounded-2xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer",
        selected ? "border-black" : "border-neutral-200"
      )}
      onClick={() => onClick(label)}
    >
      <Icon size={30} />
      <p className="font-semibold">{label}</p>
    </div>
  );
};

export default CategoryInput;
