"use client";

import { FC } from "react";
import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

const ListingCategory: FC<ListingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Icon size={40} className="text-neutral-600" />

        <p className="text-lg font-semibold">{label}</p>
        <p className="text-neutral-500 font-light">{description}</p>
      </div>
    </div>
  );
};

export default ListingCategory;
