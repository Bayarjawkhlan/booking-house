"use client";

import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback } from "react";
import qs from "query-string";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  label: string;
  description: string;
  icon: IconType;
  active?: boolean;
}

const CategoryBox: FC<CategoryBoxProps> = ({
  label,
  description,
  icon: Icon,
  active,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) currentQuery = qs.parse(params.toString());

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [router, params, label]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "flex flex-col items-center justify-center gap-2 p-3 border-2 hover:text-neutral-800 transition cursor-pointer",
        active
          ? "border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      )}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
