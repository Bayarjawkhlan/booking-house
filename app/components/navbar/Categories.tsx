"use client";

import { FC } from "react";
import { useCategories } from "@/app/hooks/useCategories";
import { usePathname } from "next/navigation";

import Container from "../Container";
import CategoryBox from "./CategoryBox";

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = () => {
  const categories = useCategories();
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-x-auto ">
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            description={category.description}
            icon={category.icon}
            active={category.active}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
