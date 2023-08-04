"use client";

import { FC } from "react";
import { PuffLoader } from "react-spinners";

interface LoadingClientProps {}

const LoadingClient: FC<LoadingClientProps> = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <PuffLoader size={100} color="red" />
    </div>
  );
};

export default LoadingClient;
