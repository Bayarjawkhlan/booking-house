"use client";

import Avatar from "@/app/components/Avatar";
import useCountries from "@/app/hooks/useContries";
import { User } from "@prisma/client";
import { FC } from "react";
import { IconType } from "react-icons";
import dynamic from "next/dynamic";

import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import("../../../components/Map"), { ssr: false });

interface ListingInfoProps {
  user: User;
  category?: {
    label: string;
    icon: IconType;
    description: string;
    active: boolean;
  };
  description: string;
  roomCount: number;
  guestCount: number;
  bathRoomCount: number;
  locationValue: string;
}

const ListingInfo: FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  locationValue,
  bathRoomCount,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <p>Hosted by {user.name}</p>
          <Avatar src={user.image as string} />
        </div>

        <div className="flex items-center gap-4 font-light text-neutral-500">
          <p>{guestCount} guests</p>
          <p>{roomCount} rooms</p>
          <p>{bathRoomCount} bathrooms</p>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <p className="text-lg font-light text-neutral-500">{description}</p>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
