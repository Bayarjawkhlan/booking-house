import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const useCategories = () => {
  const params = useSearchParams();

  const categories = useMemo(
    () => [
      {
        label: "Beach",
        icon: TbBeach,
        description: "This property close to the beack!",
        active: params.get("category") === "Beach",
      },
      {
        label: "Windmills",
        icon: GiWindmill,
        description: "This property has windmills!",
        active: params.get("category") === "Windmills",
      },
      {
        label: "Modern",
        icon: TbBeach,
        description: "This property is modern!",
        active: params.get("category") === "Modern",
      },
      {
        label: "Countryside",
        icon: TbMountain,
        description: "This property is in countryside!",
        active: params.get("category") === "Countryside",
      },
      {
        label: "Pools",
        icon: TbPool,
        description: "This property has a pool!",
        active: params.get("category") === "pools",
      },
      {
        label: "Islands",
        icon: GiIsland,
        description: "This property is on an island!",
        active: params.get("category") === "Islands",
      },
      {
        label: "Lake",
        icon: GiBoatFishing,
        description: "This property is close to lake!",
        active: params.get("category") === "Lake",
      },
      {
        label: "Sking",
        icon: FaSkiing,
        description: "This property has skiing activies!",
        active: params.get("category") === "Sking",
      },
      {
        label: "Casteles",
        icon: GiCastle,
        description: "This property is in castle!",
        active: params.get("category") === "Casteles",
      },
      {
        label: "Camping",
        icon: GiCastle,
        description: "This property has camping activities!",
        active: params.get("category") === "Camping",
      },
      {
        label: "Arctic",
        icon: BsSnow,
        description: "This property has camping activities!",
        active: params.get("category") === "Arctic",
      },
      {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "This property is in a cave!",
        active: params.get("category") === "Cave",
      },
      {
        label: "Desert",
        icon: GiCactus,
        description: "This property is in the desert!",
        active: params.get("category") === "Desert",
      },
      {
        label: "Barns",
        icon: GiBarn,
        description: "This property is in the barn!",
        active: params.get("category") === "Barns",
      },
      {
        label: "Lux",
        icon: IoDiamond,
        description: "This property is a luxrios!",
        active: params.get("category") === "Lux",
      },
    ],
    [params]
  );

  return categories;
};
