"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

import Heading from "./Heading";
import Button from "./Button";

interface EmtpyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  label?: string;
}

const EmtpyState: FC<EmtpyStateProps> = ({
  title = "No exact mathes",
  subtitle = "Try changing removing some of your filter",
  showReset,
  label,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subTitle={subtitle} center />
      <div className="w-48 mt-4 ">
        {showReset && (
          <Button
            outline
            label={label || "Remove all filters"}
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmtpyState;
