"use client";

import Image from "next/image";
import { FC, useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";

import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onchange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      options={{ maxFiles: 1 }}
      uploadPreset="wnbiil8j"
    >
      {({ open }) => {
        return (
          <div
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
            onClick={() => open?.()}
          >
            <TbPhotoPlus size={50} />
            <p className="font-semibold text-lg">Click to upload</p>

            <div className="absolute inset-0 w-full h-full">
              <Image
                alt="upload"
                fill
                className="object-cover"
                src={value || ""}
              />
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
